# MyCrypto Static Template

Copyable repo for spinning up a new static page subdomain. Unlike our more code
heavy repos, this template aims to be very simple and easily edited by everyone
on the team. The goal is also to keep these pages as light as possible, so
there are no libraries included by default. There are, however, some
preprocessors at work:

* HTML is compiled with EJS to allow for variables and reusable components
* JS is compiled with Babel to allow for file bundling and language features
* CSS is compiled with SCSS to allow for variables, mixins, and file bundling

Gulp is used for compilation because this template is not meant for JS-first
websites, so Webpack / Rollup didn't seem like the right tool for the job.

## Running the Project

First install dependencies

```
npm install
```

Run in development and watch for file changes

```
npm start
```

Build for production

```
npm run build
```

Running either of those will generate a folder in `dist/`, which you can run by
opening `dist/index.html` in your browser.



## Project Layout

```
├── gulpfile.js  # Gulp configuration
├── src          # Source files
│   ├── data.js  # Provides variables for ejs templates
│   ├── assets   # Static assets (images, fonts etc.)
│   ├── ejs      # EJS templates, compiles to HTML
│   ├── js       # JS scripts, uses babel for compilation
│   └── scss     # SCSS files, starting at index.scss
└── dist         # Template generated from source files
```
