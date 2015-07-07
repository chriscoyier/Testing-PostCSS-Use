/* globals require, module, exports */

var postcss = require("postcss"),
    posix   = require("posix"),
    cssnext = require("cssnext"),
    use     = require("postcss-use");


function getWarnings(result) {
  var warnings = [];

  if (!result.warnings()) {
    return warnings;
  }

  result.warnings().forEach(function (message) {
    warnings.push(message.text);
  });
  return warnings;
}

function engine() {
  return postcss([ use({ modules:
    [
      "autoprefixer",
      "cssnano",
      "cssnext",
      "postcss-discard-comments",
      "postcss-css-variables",
      "postcss-custom-media",
      "postcss-media-minmax",
      "postcss-conditionals",
      "postcss-each",
      "postcss-for"
    ]})
  ]);
}

function handleError(error, context) {
  if (error.line) {
    context.succeed( {
      "error": error.reason,
      "line": error.line,
      "warnings": []
    });
  } else {
    context.succeed( {
      "error": error.message,
      "line": 1,
      "warnings": []
    });
  }
}

exports.handler = function(event, context) {
  engine()
    .process(event.markup)
    .then(function(result) {
      context.succeed({
        "markup": result.css,
        "warnings": getWarnings(result)}
      );
    })
    .catch(function(error) {
      console.log(error.stack);
      handleError(error, context);
    });
};
