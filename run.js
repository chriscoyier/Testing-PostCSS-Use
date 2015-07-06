/* globals require, module, exports */

// Because, in this case, I'm going to grab the CSS from a file. On CodePen we'll probably have a string.
var fs = require("fs");

// The main requiremment...
var postcss = require("postcss");

// This is the plugin we want to use so that plugins can be referenced from code.
var use = require("postcss-use");

// use the use plugin
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

// abstract the console.log calls for each plugin
function writeOut(path, name) {
  var css = fs.readFileSync(path, "utf8");
  processor
    .process(css)
    .then(function(result) {
      console.log(result);
      console.log("#######################################");
      console.log("### " + name);
      console.log("#######################################");
      console.log("warnings:");
      console.log(warnings(result));
      console.log("result:");
      // WHY DOES THIS RETURN THE UNPROCESSED CSS?
      console.log(result.css);
    })
    .catch(function(error) {
      console.log("errror " + error.message());
    });
}

// the output
writeOut("in/discard-comments.css", "postcss-discard-comments");
writeOut("in/autoprefixer.css", "autoprefixer");
writeOut("in/cssnext.css", "cssnext");
