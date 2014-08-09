# [Erealm Info & Tech Sdn Bhd](http://www.erealm.cn)[![Build Status](https://travis-ci.org/Erealm-Tech/HomeSite.svg?branch=master)](http://travis-ci.org/Erealm-Tech/HomeSite)

## Notes and information
### Public Modules We used.
* Setup the web site base on **Node.js** and **Express**
* Using **Bower** to manage front-end library.
* Using **Grunt** to integrate the web site: compress and merge code, compress image, check code quality using jsLint.
* Using **AngularJS** to control front-end code structure.
* Using **Bootstrap** to setup UI.
* Using [**winston**](https://github.com/flatiron/winston) as Logger
* Using [**Nodemailer**](https://github.com/andris9/Nodemailer) to send the mail.

### Setting up the application
 1. Install all modules
```bash
npm install
```
 2. Before Checkin code: manage front-end library and compress images.
```bash
grunt prepare
```
 3. Debug and run application: check code quality.
```bash
grunt
```
 4. Publish the application: merge and compress **JavaScript** and **CSS**, Clean unused code.
```bash
grunt build
``` 
```bash
sudo GMAIL_USER='name@yourdomain.com' GMAIL_PASS='your mail password' forever app.js
``` 

## TODO List
* Responsive Design.
* Integrate with **MongoDB**.
* Add blog module using [**poet**](https://github.com/jsantell/poet)
* Logger.
* Unit test.
