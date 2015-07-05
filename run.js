// Because, in this case, I'm going to grab the CSS from a file. On CodePen we'll probably have a string.
var fs = require('fs');

// The main requiremment...
var postcss = require('postcss');

// This is the plugin we want to use so that plugins can be referenced from code.
var use = require("postcss-use");

// These three are required by postcss-use
// as referenced in the docs: https://github.com/postcss/postcss-use
var cssnext = require("cssnext");
var cssnano = require('cssnano');
var autoprefixer = require('autoprefixer');

// This plugin is just "available" to use
var discardcomments = require("postcss-discard-comments");

// Create the processor
var processor = postcss([ use({ modules: ['autoprefixer', 'cssnano', 'cssnext']}) ]);

fs.readFile("in.css", "utf-8", function(err, data) {

  processor
    .process(data, {
      from: 'in.css',
      to: 'out.css'
    })
    .then(function(result) {
      console.log(result.css);
    })
    .catch(function(error) {
      console.error(error);
    });

});


