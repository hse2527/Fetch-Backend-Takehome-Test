# Fetch Take Home Assessment - Backend Internship Challenge

A backend REST API web service that will help keep track of points and point transactions.

The API server will be served on port 8000, and will accept and return JSON for required endpoints.

### Environment/Dependencies

Utillized tools/dependencies
- [Node](https://nodejs.org/) (v18.16.0) - JavaScript runtime
- [TypeScript](https://www.typescriptlang.org/) (v4.9.5) - JavaScript superset to add static typing
- [Express](https://expressjs.com) (v4.18.2) - Web framework for Node.js used to develop the API server
- [Jest](https://jestjs.io/) (v29.7.0) - Testing framework

[gts](https://github.com/google/gts) was used to enforce Google's TypeScript style guide.

### Usage

Install the dependencies and devDependencies and start the server.

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

There are 3 endpoints for this API

##### POST /add
Adds points to the user's balance. 
Request body must contain payer, points, and timestamp fields. Payer must be a string, points must be an integer, and timestamp must be a valid date string.
```
$ curl -d '{ "payer": "DANNON", "points": 5000, "timestamp": "2020-11-02T14:00:00Z" }' -H "Content-Type: application/json" -X POST http://localhost:8000/add
```
Successful and valid request will return 200 status code .

##### POST /spend
Spends points from the user's balance.
Request body must contain points field. Points must be an integer.
```
$ curl -d '{ "points": 5000 }' -H "Content-Type: application/json" -X POST http://localhost:8000/spend
```
Successful and valid request will return 200 status code and a list of point transactions that were spent in a following format.
```
[
    { "payer": "DANNON", "points": -100 },
    { "payer": "UNILEVER", "points": -200 },
    { "payer": "MILLER COORS", "points": -4,700 }
]
```

##### GET /balance
Returns a list of payer point balances.
```
$ curl http://localhost:8000/balance
```
Successful request will always return 200 status code and give response body similar to the following.
```
{
    "DANNON": 1000,
    ”UNILEVER” : 0,
    "MILLER COORS": 5300
}
```

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