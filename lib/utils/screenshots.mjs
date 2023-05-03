#!/usr/bin/env node

/*
  Setup:
  In `/app/config.json` provide an object for every page/screenshot as below.

  servicePages: [
   {
      "pageID":"AM0.0",
      "url":"index.html",
      "name":"Home"
   },{
      "pageID":"AM0.1",
      "url":"faq.html",
      "name":"FAQs"
   },{
      "pageID":"AM5.1.1",
      "url":"metadata/closure-metadata/closure-status",
      "name":"Confirm closure status"
   }
  ]

  Config:
  Default config is below. Each property can be overriden by passing equivalent property as argument on CLI. See below.
  const config = {
    publicPath: "app/assets/prototype-history/",
    baseUrl: "http://localhost:3000/",
  };

  Run: (An example name-of-batch could be 'sprint-65' or 'public-beta')
  `node lib/utils/screenshot.mjs outputDirName=name-of-batch`
  or
  npm run export-screenshot -- outputDirName=name-of-batch

  Run with config override:
  `node lib/utils/screenshot.mjs outputDirName=name-of-batch publicPath='public-output-directory' baseUrl=https://myprototype.domain.com`
*/

import puppeteer from "puppeteer";
import fullPageScreenshot from "puppeteer-full-page-screenshot";
import * as path from "path";
import * as fs from "fs";
import appConfig from "../../app/config.json" assert { type: "json" };

let config = {
  publicPath: "app/assets/prototype-history/",
  baseUrl: "http://localhost:3000/",
};

const parseArgs = (args) => {
  const parsedArgs = {};

  args.forEach((arg) => {
    const parts = arg.split("=");
    parsedArgs[parts[0]] = parts[1];
  });

  return parsedArgs;
};

const takeScreenshots = async (pages) => {
  for (const s of appConfig.servicePages) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1080 });
    await page.goto(config.baseUrl + s.url);

    const imagePath = path.resolve(
      config.publicPath,
      args.outputDirName,
      "screenshots",
      `${s.pageID}.png`
    );
    await fullPageScreenshot.default(page, {
      path: imagePath,
    });
    console.log(`Created '${imagePath}' from '${s.url}'`)
    await browser.close();
  }
}

const args = parseArgs(process.argv.slice(2));

if (!args.outputDirName) {
  console.error(`Missing required argument`)
  console.error(
    `Set a directory name for this batch of screenshots: node lib/utils/screenshots.mjs outputDirName=sprint-82`
  );
} else {
  // Override config with cli arguments if present.
  config = Object.fromEntries(Object.entries(config).map(([key, value]) => [key, args[key] || value]))

  // Take all screenshots. This takes a while.
  await takeScreenshots(appConfig.servicePages);

  // Write/copy existing service structure into the same directory as a reference.
  const jsonPath = path.resolve(config.publicPath, args.outputDirName, "service-structure.json");
  fs.writeFileSync(
    jsonPath,
    JSON.stringify(appConfig.servicePages, null, 4)
  );

  console.log(`Created '${jsonPath}'`)
}
