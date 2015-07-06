/* globals require, module, exports */

// Because, in this case, I'm going to grab the CSS from a file. On CodePen we'll probably have a string.
var fs = require("fs");

// The main requiremment...
var postcss = require("postcss");

// This is the plugin we want to use so that plugins can be referenced from code.
var use = require("postcss-use");

// Create the processor
var processor = postcss([ use({ modules: [
  "postcss-discard-comments",
  "autoprefixer",
  "cssnano",
  "cssnext"]})
]);

// Warnings collector


function warnings(result) {
  var warningArr = [];

  if (!result.warnings()) { return warningArr; }

  result.warnings().forEach(function (message) {
    warningArr.push(message.text);
  });

  return warningArr;
}

function writeOut(path, name) {
  var css = fs.readFileSync(path, "utf8");
  processor
    .process(css)
    .then(function(result) {
      console.log("#######################################");
      console.log("### " + name);
      console.log("#######################################");
      console.log("warnings:");
      console.log(warnings(result));
      console.log("result:");
      console.log(result.css);
    });
}

/******************************************************
 * postcss-discard-comments
 * NOTE: this works, as the instructions say it would.
********************************************************/

// works
writeOut("in/discard-comments.css", "postcss-discard-comments");
writeOut("in/autoprefixer.css", "autoprefixer");
// broken
writeOut("in/cssnext.css", "cssnext");

