1. Project Title - Automate https://automationexercise.com/

2. Description - This framework is an assignment provided by Livelike for QA Automation Engineer role. Framework is built on Playwright and JS.

3. Automation flows covered - Positive and Negative Scenarios
   ~ Login functionality with valid and invalid credentials
   ~ Sign up with new user and existing user and ensure valid assertions.
   ~ Signup with new user followed by filling the registration form
   ~ Search for a product on products page and add third last product to the cart page.

4. Key features -
   ~ Configured the CI/CD tool to run automation tests on workflow
   ~ Supports multiple browsers and ES module
   ~ Framework follows the page object design pattern
   ~ Supports Eslint and Prettier checks
   ~ Supports dot env for login credentials
   ~ Supports HTML reporting

5. Table for Contents -
   ~ Automation tests can be found - tests
   ~ Pageobjects can be found - pages
   ~ yml file can be found - .github/workflows/playwright.yml

6. Installation -
   ~ git clone https://github.com/jain-sumit-tft/Automation-exercise-Livelike.git
   ~ cd /Automation-exercise-Livelike
   ~ yarn

7. How to run tests and check -
   ~ yarn run:test // will run all automation tests
   ~ yarn run:test {path_of_the_test} // will run specific test

8. Reporters -
   ~ Configured HTML reports in playwright.config.js and output of the reports can be found - test-results/report
