1. Project Title - Automate https://automationexercise.com/

2. Description
   This framework is an assignment provided by Livelike for QA Automation Engineer role. Framework is built on Playwright and JS.

3. Automation flows covered - Positive and Negative Scenarios

   - Login functionality with valid and invalid credentials
   - Sign up with new user and existing user and ensure valid assertions.
   - Signup with new user followed by filling the registration form
   - Search for a product on products page and add third last product to the cart page.

4. Installation
   To clone the repo go to the desired location where you want to clone the repo and run the below following commands:-

   - git clone https://github.com/jain-sumit-tft/Automation-exercise-Livelike.git
   - cd /Automation-exercise-Livelike
   - yarn

5. How to run tests

   - yarn run:test

6. Reporters

   - Reports can be visible by running yarn playwright show-report
   - Configured HTML reporters in playwright.config.js and output of the reports can be found - test-results/report
   - Playwright reports will be uploaded on CI/CD and available to download through pipeline

7. Synchronize CI/CD integration between automation framework and dev framework.
   The automation tests to trigger as soon as new commits are merged with master branch of https://github.com/jain-sumit-tft/react-redux-realworld-example-app.git.

   - Added "workflow_dispatch" event in the yml file of automation framework, which triggers the tests by public repo https://github.com/jain-sumit-tft/react-redux-realworld-example-app.git as soon as the new commits are merged.
   - Hitting the curl request from https://github.com/jain-sumit-tft/react-redux-realworld-example-app.git which will hit the request on automation framework and trigger the tests as soon as new commit is merged in master branch.

8. Key features

   - Configured the CI/CD tool to run automation tests on workflow
   - Supports ES module
   - Framework follows the page object design pattern
   - Supports Eslint and Prettier checks
   - Supports dot env for login credentials
   - Supports HTML reporting
