#!/usr/bin/env node

import puppeteer from "puppeteer";
import fullPageScreenshot from "puppeteer-full-page-screenshot";
import * as fs from "fs";
import * as path from "path";
import scrape from "website-scraper"; // only as ESM, no CommonJS

const pages = [
  { pageID: "AM0.0", url: "index.html" },
  { pageID: "AM0.1", url: "faq.html" },
  { pageID: "AM0.2", url: "contact.html" },
];

const config = {
  outputRoot: "app/views/static-prototypes/",
  sourceDir: "app/views/",
};

// function* walkSync(dir, ignoreDirs) {
//   const files = fs.readdirSync(dir, { withFileTypes: true });
//   for (const file of files) {
//     // console.log(dir, ignoreDir);

//     if (
//       file.isDirectory() &&
//       ignoreDirs.some((ignoreDir) => dir.startsWith(ignoreDir)) == false
//     ) {
//       yield* walkSync(path.join(dir, file.name), ignoreDirs);
//     } else {
//       yield path.join(dir, file.name);
//     }
//   }
// }

const parseArgs = (args) => {
  const parsedArgs = {};

  args.forEach((arg) => {
    const parts = arg.split("=");
    parsedArgs[parts[0]] = parts[1];
  });

  return parsedArgs;
};

const args = parseArgs(process.argv.slice(2));
if (!args.outputDirName) {
  throw new Error(
    "Provide a folder name for this static site with no spaces, e.g. sprint-82"
  );
}

let urls = [];
for (const filePath of walkSync(config.sourceDir, [
  "static-prototypes",
  "layouts",
])) {
  urls.push(filePath);
  // console.log(filePath);
}

urls = urls.filter((path) => {
  const parts = path.split(".");
  return parts[parts.length - 1] == "html";
});

urls = urls.map((path) => {
  const parts = path.split("/");
  // console.log(path.replace(config.sourceDir, ""));
  return {
    url: path.replace(config.sourceDir, "http://localhost:3000/"),
    filename: path.replace(config.sourceDir, ""),
  };
});

// console.log(urls);

const options = {
  urls: urls,
  directory: path.resolve(config.outputRoot, args.outputDirName),
  subdirectories: [
    { directory: "img", extensions: [".jpg", ".png", ".svg"] },
    { directory: "js", extensions: [".js"] },
    { directory: "css", extensions: [".css"] },
  ],
};

// with async/await
const result = await scrape(options);
