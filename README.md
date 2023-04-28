# TDR Prototype

High fidelity front-end prototypes for Transfer Digital Records. Uses the [GDS Prototyping Kit v13](https://prototype-kit.service.gov.uk/docs/). Read more on how we use prototypes on [TDR confluence page](https://national-archives.atlassian.net/wiki/spaces/DA/pages/9338903/How+we+use+prototypes).

## Scripts in `package.json`

- `webpack` - Additional npm packages for use of Typescript in this project.
- `export-screenshots` - Using `puppeteer-full-page-screenshot` package to export all relevant pages to a directory.

### Exporting screenshots

Configuration for pages in `servicePages` property of `config.json`. Requires that you specify a directory to create, e.g. '2022-09' or 'Sprint 82' when running onthe CLI:

```
npm run export-static -- outputDirName=2022-09
```
