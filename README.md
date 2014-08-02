commonExpress
=============

1. set up package.json
    https://www.npmjs.org/doc/json.html
2. set up gruntfile.js
    http://gruntjs.com/sample-gruntfile
3. set up bower.js&.bowerrc
    http://bower.io/
    ---.bowerrc
{
  "directory": "bower_components",
  "endpoint": "https://bower.mycompany.com",
  "json": "bower.json",
  "searchpath": [
    "https://bower.herokuapp.com"
  ],
  "shorthand_resolver": "git://example.com/{{{ organization }}}/{{{ package }}}.git"
}
    ---bower.js
{
  "name": "my-project",
  "version": "1.0.0",
  "main": "path/to/main.css",
  "ignore": [
    ".jshintrc",
    "**/*.txt"
  ],
  "dependencies": {
    "<name>": "<version>",
    "<name>": "<folder>",
    "<name>": "<package>"
  },
  "devDependencies": {
    "<test-framework-name>": "<version>"
  }
}
