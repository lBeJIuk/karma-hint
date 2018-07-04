(function() {
  'use strict';

  var KarmaJshintReporter = function( karmaConfig, loggerFactory ) {
    return function( content, file, done ) {
      // @ TODO Add functionality
      return done(content);
    };
  };

  KarmaJshintReporter.$inject = [ 'config', 'logger' ];

  module.exports = {
    'preprocessor:myjshint': [ 'factory', KarmaJshintReporter ]
  };
}).call(this);