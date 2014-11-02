[![alt ereaml](https://raw.github.com/erealm/HomeSite/master/public/images/erealm.png)](http://www.erealm.cn)
# [eRealm Info & Tech](http://www.erealm.cn)  [![Build Status](https://travis-ci.org/erealm/HomeSite.svg?branch=master)](http://travis-ci.org/erealm/HomeSite)
[ ![Codeship Status for erealm/HomeSite](https://www.codeship.io/projects/1f17b940-2f28-0132-d05d-4e682e9b5dbd/status)](https://www.codeship.io/projects/39458)

## Notes and information
### Public Modules We used.
* Setup the web site base on [**Node.js**](http://nodejs.org/) and [**Express**](http://expressjs.com/).
* Using [**Bower**](http://bower.io) to manage front-end library.
* Using [**Grunt**](http://gruntjs.com) to integrate the web site: compress and merge code, compress image, check code quality using jsLint.
* Using [**AngularJS**](https://angularjs.org/) to control front-end code structure.
* Using [**Bootstrap**](http://getbootstrap.com/) to setup UI.
* Using [**winston**](https://github.com/flatiron/winston) as Logger
* Using [**Nodemailer**](https://github.com/andris9/Nodemailer) to send the mail.
* Using [**handlebars**](https://www.npmjs.org/package/handlebars) as the server template engine.
* Integrate with **MongoDB**.
* Integrate with [**tumblr.js**](https://github.com/tumblr/tumblr.js/)
* Responsive Design.

### Setting up the application
 * Install all modules
```bash
npm install
```
* Before Checkin code: manage front-end library and compress images.
```bash
grunt prepare
```
* Debug and run application: check code quality.
```bash
grunt
```
* Publish the application: merge and compress **JavaScript** and **CSS**, Clean unused code, start up the application using [**forever**](https://github.com/nodejitsu/forever).
```bash
grunt build
``` 
```bash
sudo GMAIL_USER='name@yourdomain.com' GMAIL_PASS='your mail password' BLOG_KEY='tumblr key' forever start app.js
``` 
* or publish the application using bash script
```bash
sudo ./build.sh 'name@yourdomain.com' 'your mail password' 'tumblr key'
```

### Document
* [Chinese Version](http://blog.erealm.cn/font-end/home/2014/11/02/erealm-home-opensource-nodejs.html)

## TODO List
* Unit test.
* Dash board.
