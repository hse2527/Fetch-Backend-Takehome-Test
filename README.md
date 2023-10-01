# Fetch Take Home Assessment - Backend Internship Challenge

A backend REST API web service that will help keep track of points and point transactions.

The API server will be served on port 8000, and will accept and return JSON for required endpoints.

### Environment/Dependencies

Utillized tools/dependencies
- [Node](https://nodejs.org/) (v18.16.0) - JavaScript runtime
- [Express](https://expressjs.com) (v4.18.2) - Web framework for Node 
- [Jest](https://jestjs.io/) (v29.7.0) - Testing framework

### Usage

Install the dependencies and devDependencies and start the server.

You must have Node installed on your machine. Node.js 0.10 or higher is required.

1. Git clone the repo and cd into the directory
```
$ git clone https://github.com/hse2527/Fetch-Backend-Takehome-Test.git
```

2. Cd into the directory
```
$ cd Fetch-Backend-Takehome-Test
```

3. Install the dependencies
```
$ npm install
```

4. Start the server
```
$ npm start
```
Server will be running on port 8000 (http://localhost:8000)

### REST API

TODO: Add more details about the API

### Testing 

To run the tests, run the following command in the terminal
```
$ npm test
```

Due to lack of database, the tests are limited to checking the response status and response body.
Tests check for the following:
- POST /add
    - 200 status code - request is successful
    - 400 status code - request is unsuccessful due to no request body
    - 400 status code - request is unsuccessful due to missing fields
    - 400 status code - request is unsuccessful due to invalid data types
- POST /spend
    - 200 status code - request is successful
    - 400 status code - request is unsuccessful due to over spending
    - 400 status code - request is unsuccessful due to no request body
- GET /balances
    - 200 status code - request is successful
    - Balance is correct after prechecked /add and /spend requests