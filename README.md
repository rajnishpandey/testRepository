# About the App

  The "ToDo" App is a simple application which will do basic CRUD operations. It allows to add and persist ToDos
  that you need to get done. As you complete different  tasks in todo list you can delete or edit them from the list.
  The  tasks in the todo list are stored in a database.

  - UI contains the following components:
    - A text box to get input from the user. The input is sent in a POST request to the  server component, which inserts the text to the database.
    - The list of To-do’s inserted in the database is displayed. This data is retrieved using GET service call to the server component.
    - Edit icon along with each To-do entry to update the input in the text box.
	  - On saving, this data is sent as a PUT request to the server component, which updates the text in the database.
	  - On cancelling, no operation takes place.
    - Delete icon with each To-do entry to delete the entry from database using the DELETE service call.



# KnockoutJS
Knockout is a JavaScript library that helps you to create rich, responsive display and editor user interfaces with a clean underlying data model. Any time you have sections of UI that update dynamically (changing depending on the user’s actions or when an external data source changes), KO helps you implement it more simple and maintainable.

### Client File Structure
```
└── client
│      ├── assets
│      │   └── css
│      │      └── toDo.css
│      │   └── img
│      │      └── logo.png
│      ├── controllers
│      │   └── toDo.js
│      ├── tests
│      │   └── test.js
|      └── index.html
├── karma.conf.json
├── Gulpfile.js
├── manifest.yml
└── package.json

```
### Files related to KnockoutJS 
The application folder structure is modular, so that our controller and all of our $http requests are in separate files. Having all of the functionality in different modules helps to understand the overall layout of the application, hence the re-use and testing of code is easy.

```
index.html  # Includes all the scripts and styles and contains the HTML code to render the To-Do application. Uses (http://ajax.aspnetcdn.com/ajax/knockout/knockout-3.4.0.js) in script tag to use the functions of knockoutJS(version-3.4.0)
```
**assets**
```
css         # Contains the styles used for UI
img         # Contains the static images displayed in the UI
```
**controller**
```
toDo.js     # This is the knockout module containing the button actions and assigning of scope variables. This contains the code and functionalities to perform CRUD operations of the app.
```
### Unit Testing and Code Coverage

The unit tests in this application are written using jasmine and karma tools. In this project, gulp is the task runner used to execute all the test cases and code coverage.

```
karma.conf.js   # Contains the configuration for the karma tool to execute the jasmine test cases.
```
**tests**
```
test.js         # Contains all the test cases to test the CRUD operations present in the controller. It also tests all the actions of buttons and if the data is reflected appropriately in DOM elements.
```

In order to execute the UI Test cases, the following command must be executed in command prompt. This command uses the GulpFile present in the root folder of the project. It takes the configuration from karma.conf.json present in the root folder. This file contains the list of files to be included for testing and other plugin information.

```sh
$ gulp test_UI
```
After executing the above command, the test results will be displayed in the command prompt and the coverage report will be present in the *\client\tests\results\coverage* folder.  
# Node Server
In this project, express module is used to create a server and the basic CRUD operations for a simple To Do application is given as node services. The following sections explain the technologies used and the usage of some of the important files present in the server code.


## Prerequisite Technologies

### Linux
* *Node.js* - <a href="http://nodejs.org/download/">Download</a> and Install Node.js, nodeschool has free <a href=" http://nodeschool.io/#workshoppers">node tutorials</a> to get you started.
* *PostgreSQL* - <a href="https://www.postgresql.org/download/linux/">Download</a> and Install PostgreSQL - <a href="https://www.postgresql.org/docs/">Checkout the manual</a> if you are just starting.

For using ubuntu, this is the preferred repository to use...

```bash
$ curl -sL https://deb.nodesource.com/setup | sudo bash -
$ sudo apt-get update
$ sudo apt-get install nodejs
```


### Windows
* *Node.js* - <a href="http://nodejs.org/download/">Download</a> and Install Node.js, nodeschool has free <a href=" http://nodeschool.io/#workshoppers">node tutorials</a> to get you started.
* *PostgreSQL* - Follow the great tutorial from the postgres site - <a href="https://www.postgresql.org/download/windows/">"Install PostgreSQL On Windows"</a>


### OSX
* *Node.js* -  <a href="http://nodejs.org/download/">Download</a> and Install Node.js or use the packages within brew or macports.
* *PostgreSQL* - Follow the tutorial here - <a href="https://www.postgresql.org/download/macosx/">Install PostgreSQL on OSX</a>

## Prerequisite packages

This application currently uses gulp as a build and test runner tool which needs to be installed globally.
```
$ npm install -g gulp
```
## Server File Structure
  ```
└── server
│       ├── config
│       │  └── node_starter_kit_config.json
│       ├── controllers
│       │  └── DBHandler.js
│       │  └── ToDoHandler.js
│       │  └── LogHandler.js
│       ├── tests
│       │  └── DBTest.js
│       │  └── server_test.js
│       └── vcap_parser
│       │  └── environment_parser.js
│       └── routes.js
├── app.js
├── Gulpfile.js
├── manifest.yml
└── package.json
```
**app.js**

This file contains the server object and is the base of the project. It is the starting point of the application and starts the server.
By default, the server listens at the port which is defined in the environment variable named *PORT*. If this is not defined, *3000* is taken as the default port.
The server port can be set to either the environment variable or some other value of choice.
  ```
    app.set('port', process.env.PORT || 3000);
  ```

  In case of malicious attacks or mistyped URLs, the error is handled and *404 Page Not Found Error* is thrown.

    app.use(function (req, res) {
      res.status(404);
      res.send({error: 'Page Not found'});
      return;
    });
**route.js**

This file contains all the routes and matches them with the appropriate handler function.
The server code implements GET, POST, PUT, and DELETE services. The following sections explain the request and response JSON which is sent in this sample.


##### GET Request - Gets all To-dos

**Request URL:**

    GET /api/todos

**Response:**  JSON object containing Array of all todos
```
{
  "status": "Success",
  "data": [
    {
      "_id": "001fbbe7bd708a34624b47526cd6ac89",
      "task_name": "one"
    },
    {
      "_id": "4d6153cf4bc3bdaf9c6c7eebf42d67a6",
      "task_name": "two"
    },
    {
      "_id": "be3855e004dd5d74c802992c09ea8d28",
      "task_name": "three"
    }
  ]
}
```

##### POST Request - Creates a new To-do

**Request URL:**
```
POST /api/todos/
```
**Request Body:**

    {"task_name":"sample"}

**Response:**
The response is a JSON representation of a To-do with the _id field
populated.
```
{
  "status": "Success",
  "data": {
    "_id": "f76424cc41f1ee8c2682a37069098794",
    "task_name": "sample"
  }
}
```

##### PUT Request - Updates a To-do

  **Request URL:**
  ```
  PUT /api/todos/[_id]
```
**Request Body:**

    {"task_name":"sample"}

**Response:**
The response is a JSON representation of the updated To-do.
```
{
  "status": "Success",
  "data": {
    "_id": "4d6153cf4bc3bdaf9c6c7eebf42d67a6",
    "task_name": "sample"
  }
}
```

##### DELETE Request - Deletes a To-do

  **Request URL:**
  ```
  DELETE /api/todos/[_id]
```
**Response:**

The response is a JSON containing the *Success* message.

    {"status": "Success","data": "Deleted Successfully"}


### PostgreSQL

PostgreSQL, often simply Postgres, is a powerful, open-source, highly-customizable, object-relational database. It is a feature-rich enterprise database with JSON support, giving you the best of both the SQL and NoSQL worlds. It can handle workloads ranging from small single-machine applications to large Internet-facing applications with many concurrent users. The sample app provided performs basic CRUD operations, for managing data in a simple "To Do" app.


#### Files related to PostgreSQL

The crux of the DB operations are present in the DBHandler file, present in the controllers directory. The database connection establishment and the CRUD operations are given in this file. The "pg" node module is used to connect to the database.

**controller**
```
DBHandler       # Database operations are done here.
LogHandler      # Logging operations are done here.
ToDoHandler     # Business logic like response handling and error handling operations are done here.
```
## Deploying the application

The Application can be run locally or deployed in cloud foundry and in both scenarios PostgreSQL service has to be integrated with the application.

### Deploying the application locally

In order to run the app locally, the environment_parser.js file, present in the vcap_parser directory, has to be changed according to the local DB information.

Replace the following line accordingly

`returnObject.url = 'postgres://username:password@localhost/databaseName';`
### Deploying to Cloud Foundry
The following denotes the steps required to deploy the application to PAAS systems like Pivotal and Bluemix.
When deployed in the cloud foundry through starter kit, there are no changes to be done in the code. When deploying to the Cloud foundry manually, the environment_parser.js must be replaced with the appropriate file provided for the PAAS and the node_starter_kit_config.json (present in the root folder) must contain the required “service instance name”  which was created in cloud foundry .

`  "service_name":"ElephantSQL", //The service instance name created in cloud foundry `


##### Logging in to Cloud Foundry
  - For Pivotal Web Services follow the below CLI commands for login :

```sh
$ cf login -a api.run.pivotal.io
```
  - For IBM Bluemix Web Services follow the below CLI commands :
```sh
$ cf login -a api.ng.bluemix.net
```

##### Creating ElephantSQL service

 IBM Bluemix & Pivotal Web Services offer a free ElephantSQL service.
  - If you are using IBM Bluemix, run
```sh
$ cf create-service ElephantSQL Tiny Turtle service_instance_name
$ cf bind-service AppName service_instance_name
```
  - If you are using Pivotal Web Services, run
```sh
$ cf create-service ElephantSQL turtle service_instance_name
$ cf bind-service AppName service_instance_name
```

##### Pushing the application to cloud foundry

The following command has to be executed to push the application to cloud foundry.

```sh
$ cf push <app name>
```
## Unit Testing And Code Coverage

In order to run the test cases and coverage the *gulp* task runner tool is used. The test cases are written in *mocha* and *gulp_mocha* module is used to execute the test cases.

To run the database test cases, the following command is executed in the command prompt/terminal

```
$ gulp test_DB
```
The output of the test cases is displayed in the terminal, displaying the number of cases passed and failed. The test cases are written to test the database for its structure and integrity.

To run the server test cases, the following command is executed.

```
$ gulp test_server
```

The output of the test cases along with code coverage is displayed in the terminal. These test cases test the response for all the requests by hitting the server. The coverage is present in the *server/test/results/coverage* folder. In order to view the coverage , the *index.html* file should be opened in browser.
