/* globals require, module, exports */

// Because, in this case, I'm going to grab the CSS from a file. On CodePen we'll probably have a string.
var fs = require("fs");

// The main requiremment...
var postcss = require("postcss");

// This is the plugin we want to use so that plugins can be referenced from code.
var use = require("postcss-use");

// use the use plugin
function processor() {
  return postcss([ use({ modules: [
    "postcss-discard-comments",
    "autoprefixer",
    "cssnano",
    "cssnext"]})
  ]);
}

// Warnings collector
function warnings(result) {
  var warningArr = [];

  if (!result.warnings()) { return warningArr; }

  result.warnings().forEach(function (message) {
    warningArr.push(message.text);
  });

  return warningArr;
}

function log(name, result) {
  console.log("#######################################");
  console.log("### " + name);
  console.log("#######################################");
  console.log("warnings:");
  console.log(warnings(result));
  console.log("result:");
  // when chained in a promise, this does not return the
  // processed css, only the unprocessed stuff
  console.log(result.css);
}

// abstract the console.log calls for each plugin
function async(path, name) {
  var css = fs.readFileSync(path, "utf8");
  processor()
    .process(css)
    .then(function(result) {
      log("async: " + name, result);
    })
    .catch(function(error) {
      console.log("errror " + error.message());
    });
}

function sync(path, name) {
  var css = fs.readFileSync(path, "utf8");
  var result = processor().process(css);
  log("sync: " + name, result);
}


// this calls the processor, but without the promise chain.
// it also returns the correct css
sync("in/discard-comments.css", "postcss-discard-comments");

// this calls the processor, but with a promise.
// it does not return the correct value.
async("in/discard-comments.css", "postcss-discard-comments");
async("in/autoprefixer.css", "autoprefixer");
async("in/cssnext.css", "cssnext");
