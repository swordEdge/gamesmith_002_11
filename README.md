# Gamesmith

> Frontend code base for Gamesmith, an invite-only worldwide network of influential game professionals, supported by top-flight game studios.

## Documentation

- [Intro](docs/general): What's included, why, and some tips to get started
- [Commands](docs/general/commands.md): CLI commands for setup, deployment and code and generation
- [Testing](docs/testing): How to work with the built-in test harness
- [Styling](docs/css): How to work with the CSS tooling
- [Structure](docs/js): An overview of Routing, Redux, simple asynchronicity helpers, etc.

## Overview

### Quickstart

Run `npm install` to install both run-time project dependencies and developer tools listed
in [package.json](./package.json) file.

### Development

Run `npm start` to see your app at [localhost:3000](http://localhost:3000).

### Building

Run `npm run build` to compile all the necessary files to the `build` folder.

### ENV Variables Required
- BACKEND_URL, FRONTEND_URI

### Architecture

The [`app/`](app) directory contains the entire application code, including CSS,
JavaScript, HTML and tests.

The rest of the folders and files only exist to make your life easier, and
should not need to be touched.

### CSS

Each component `import`s its styling dependencies from a co-located `styles.css`
module.

A production build transpiles these modules into page-specific CSS files (based
on which components are actually used), while any shared styles are automatically
extracted into a "common" stylesheet.

This means the leanest, fastest payload for your users.

See the [CSS documentation](./css/README.md) for more information about PostCSS
and CSS modules.

### JS

We bundle all clientside scripts and chunk them into several files using
code splitting where possible. We then automatically optimize the code when
building for production.

See the [JS documentation](./js/README.md) for more information about the
JavaScript side of things.

### SEO

We use [react-helmet](https://github.com/nfl/react-helmet) for managing document head tags. Examples on how to
write head tags can be found [here](https://github.com/nfl/react-helmet#examples).

### Testing

For a thorough explanation of the testing procedure, see the
[testing documentation](./testing/README.md)!

#### Performance testing

With the production server running (i.e. while `npm run start:production` is running in
another tab), enter `npm run pagespeed` to run Google PageSpeed Insights and
get a performance check right in your terminal!

#### Browser testing

`npm run start:tunnel` makes your locally-running app globally available on the web
via a temporary URL: great for testing on different devices, client demos, etc!

#### Unit testing

Unit tests live in `test/` directories right next to the components being tested
and are run with `npm run test`.
