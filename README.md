# HYFER-DATA-MODEL

Unit test app for the Hyfer data MODEL

After cloning type `npm install` to install dependencies.

To run the unit tests, type `npm test`. This will start `nodemon` which monitors for any file changes and re-runs the tests upon detecting a change.

The database access module is in `src/database.js`, the unit tests in `test/database_test`.

The database module exposes an API with function that return an ES6 promise with the requested data or without a return value in case no return data is expected. If there is an error the promise is rejected.

The unit tests allow us to test the API without requiring a node server.