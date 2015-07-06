/* globals require, module, exports */

// Because, in this case, I'm going to grab the CSS from a file. On CodePen we'll probably have a string.
var fs = require("fs");

// The main requiremment...
var postcss = require("postcss");

// This is the plugin we want to use so that plugins can be referenced from code.
var use = require("postcss-use");

// These three are required by postcss-use
// as referenced in the docs: https://github.com/postcss/postcss-use
var cssnext = require("cssnext");
var cssnano = require("cssnano");
var autoprefixer = require("autoprefixer");

// This plugin is just "available" to use
var discardcomments = require("postcss-discard-comments");

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

/******************************************************
 * postcss-discard-comments
 * NOTE: this works, as the instructions say it would.
********************************************************/

var css = fs.readFileSync("in/discard-comments.css", "utf8");
var result = processor.process(css);

console.log("#######################################");
console.log("### testing postcss-discard-comments");
console.log("#######################################");
console.log("warnings:");
console.log(warnings(result));
console.log("result:");
console.log(result.css);


