# RAWLBOX
This application authenticates the user so that they can upload the files and exectute them.
### Features

  - The application uses one of the best UI framework, AngularJS v1.6.6
  - NodeJS for API
  - MySQL as database management system
  
### Technology

Rawlbox uses a number of open source projects to work properly:
* [AngularJS](https://angularjs.org/) - HTML enhanced for web apps
* [node.js](https://nodejs.org/en/) - evented I/O for the backend
* [Express](https://expressjs.com/) - fast node.js network app framework 

### Installation

Rawlbox requires [Node.js](https://nodejs.org/) v4+ to run.

Before installing Rawlbox you need to make sure you have NodeJS, npm and Bower installed as global in your system. You also need to have MySQL in your local system (you can even use XAMPP on windows for MySQL). If you do not have bower installed then install it globally using:
```sh
$ npm install bower -g
```

Now, you need to install the server side dependencies by navigating to the root folder of the project:
```sh
$ cd <path-to-project-folder>
$ npm install
```
This will install the `node_modules` for the server side packages.
Now, install the client side dependencies by navigating to the root folder of the project:
```sh
$ cd <path-to-project-folder>
$ bower install
```
This will install the `bower_components` for the client side packages.
To run the code in your local environment you also need to create a database in Mysql and provide necessary credentials for your MySQL database in `server/settings.js` file. Overwrite the properties of `database` field in `settings.js` with your local configurations for MySQL.

Now run the following command to start the node server:
```sh
$ cd <path-to-project-folder>
$ node server
```
