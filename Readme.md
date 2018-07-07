# Plugin for karma to connect jshint

1. `npm install karma-hint --save-dev`
2. Сonnect plugin in `karma.conf.js` 
    ```
    ...
    preprocessors: {
      './**/*.js': ['karmahint']
    }
    ...
    ```
3. Add setting for `jshint` in `karma.conf.js`
    ```
    ...
    karmahint: {
      jshintrc: {}, // object with enumeration of properties
      jshintignore: [] // array with a list of patterns to exclude files
    }
    ...
    ```
    or ,standard for jshint, in `.jshintrc` and `.jshintignore`. Encoding must be `utf8`. The settings from the `karma.conf.js` are taken into account first.
