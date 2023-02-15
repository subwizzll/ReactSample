# Running the Validation tests
This is a set of tests for different validators to be used in a credit card payment form. To run these tests, you need to have Node.js installed in your environment.

To get started, please follow these steps:

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/your-repository.git
```

Navigate to the directory where the tests are located:
```bash
cd your-repository/tests/utils/
```

Install dependencies by running:
```bash
npm install
```

Run the tests:
```bash
npm test
```
The above command will execute all tests in the file `Validation.test.js` and show the results in the console.

If you want to run a specific test, you can do so by using the `describe` or `it` function name as follows:

```bash
npm test -- -t 'NameValidator should return an error message when the input is too long'
```
This command will run only the `NameValidator` test case that checks if an error message is returned when the input is too long.

That's it! You are now ready to run the tests and verify that the validators work as expected.
