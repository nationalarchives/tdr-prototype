#!/usr/bin/env node

import puppeteer from "puppeteer";
import fullPageScreenshot from "puppeteer-full-page-screenshot";
import * as path from "path";
import * as fs from "fs";
import appConfig from "../../app/config.json" assert { type: "json" };

const config = {
  outputRoot: "app/views/static-prototypes/",
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

const args = parseArgs(process.argv.slice(2));
if (!args.outputDirName) {
  throw new Error(
    "Provide a folder name for this static site with no spaces, e.g. sprint-82"
  );
}

for (const s of appConfig.servicePages) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1080 });
  await page.goto(config.baseUrl + s.url);

  await fullPageScreenshot.default(page, {
    path: path.resolve(
      config.outputRoot,
      args.outputDirName,
      "screenshots",
      `${s.pageID}.png`
    ),
  });

  await browser.close();
}

fs.writeFileSync(
  path.resolve(config.outputRoot, args.outputDirName, "service-structure.json"),
  JSON.stringify(appConfig.servicePages, null, 4)
);
