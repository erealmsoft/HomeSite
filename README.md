# [eRealm Info & Tech Sdn Bhd](http://www.erealm.cn)[![Build Status](https://travis-ci.org/eRealm-Tech/HomeSite.svg?branch=master)](http://travis-ci.org/eRealm-Tech/HomeSite)

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
sudo GMAIL_USER='name@yourdomain.com' GMAIL_PASS='your mail password' forever start app.js
``` 

## TODO List
* Add blog module using [**poet**](https://github.com/jsantell/poet)
* Unit test.
