/* globals process, require, module, exports */

var fs = require("fs"),
    postcss = require(process.cwd() + "/postcss.js");

var context = {
  succeed: function(result) {
    console.log(result);
  }
};


function event(markup) {
  return { markup: markup };
}

function call(file) {
  var css = fs.readFileSync("in/" + file, "utf8");
  postcss.handler(event(css), context);
}

//call("discard-comments.css");
//call("broken-css.css");
//call("autoprefixer.css");
//call("postcss-css-variables.css");
//call("postcss-custom-media.css");
//call("postcss-media-minmax.css");
//call("postcss-conditionals.css");
//call("postcss-each.css");
//call("postcss-for.css");

call("cssnext.css");
