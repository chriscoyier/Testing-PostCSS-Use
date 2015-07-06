## Problem

I'm just trying to get [postcss-use](https://github.com/postcss/postcss-use)
working, but somethings going wrong.  I can get them running synchronously,
but when you add a promise, the `result.css` does not get processed.

Take a look at the `run.js` file.  In it, there are two functions: `async` and
`sync`.  The `sync` calls work, returning the processed css from `result.css`.
That would be that, if all the plugins worked synchronously, but cssnext does
not, so we're trying to get `async` to work.

In the `asyc` function we're using a promise and things are not working out.
The `result.css` property is returning _unprocessed_ css.  What gives?

## List of plugins we'd like to support on CodePen at launch of PostCSS

- http://cssnext.io/
- https://github.com/MadLittleMods/postcss-css-variables
- https://github.com/postcss/postcss-custom-media
- https://github.com/postcss/postcss-media-minmax
- https://github.com/andyjansson/postcss-conditionals
- https://github.com/outpunk/postcss-each
- https://github.com/antyakushev/postcss-for

(We already support autoprefixer.)
