# MyCrypto Download Page

Static page for downloading the MyCrypto Electron app.

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
