(function() {
  'use strict';

  var reporter = function(hintConfig) {
    var jshint = require('jshint').JSHINT,
      fs = require('fs'),
      path = require('path'),
      mainPath = path.resolve('./'),
      jshintrc, jshintignore, color, isIgnoredPatterns;
      color = {
        red: function(string) {
          return '\x1b[31m' + string + '\x1b[0m';
        },
        yellow: function(string) {
          return '\x1b[33m' + string + '\x1b[0m';
        },
        green: function(string) {
          return '\x1b[32m' + string + '\x1b[0m';
        }
      };

    if (hintConfig.jshintrc) {
      jshintrc = hintConfig.jshintrc;
    } else {
      try {
        jshintrc = JSON.parse(fs.readFileSync(mainPath + '/.jshintrc', {encoding: 'utf8'}));
      } catch (e) {
        console.log(color.red('Es gibt weder props in karma.conf.js noch .jshintrc!!!'));
      }
    }

    if (hintConfig.jshintignore) {
      jshintignore = hintConfig.jshintignore;
    } else {
      try {
        jshintignore = fs.readFileSync(mainPath + '/.jshintignore', {encoding: 'utf8'});
        jshintignore = jshintignore.match(/(.*\S)/g);
      } catch (e) {}
    }
    isIgnoredPatterns = jshintignore.length > 0;

    return function( content, file, done ) {
      var tmpPath, i, isFileIgnorred = false, logMsg;
      if (isIgnoredPatterns) {
        tmpPath = file.path.slice(mainPath.length);
        for (i = 0; i < jshintignore.length; i++) {
          isFileIgnorred = tmpPath.match(jshintignore[i]);
          if (isFileIgnorred) {
            break;
          }
        }
      }
      if (!isFileIgnorred) {
        content = content.replace(/^\uFEFF/, ''); // Remove potential Unicode BOM
        if (!jshint(content, jshintrc)) {
          logMsg = '===============================\n';
          logMsg += color.yellow('File: ' + file.path + '\n');
          for (i = 0; i < jshint.errors.length; i++) {
            logMsg += 'Reason: ' + jshint.errors[i].reason + '\n';
            logMsg += color.red('Linie: ' + jshint.errors[i].line + ' Character: ' + jshint.errors[i].character) + '\n\n';
          }
          logMsg += '===============================';
          console.log(logMsg);
        }
      }
      return done(content);
    };
  };

  reporter.$inject = ['config.karmahint'];

  module.exports = {
    'preprocessor:karmahint': ['factory', reporter]
  };
}).call(this);
