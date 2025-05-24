# toolbox-qa-test

This repo contains the results of a technichal interview for a QA position. It consists of actual tests run as well as technical questions. The questions have been answered in English in their presented order. There is another folder called "Results" where you can find the answers to the technical questions.

#### Revision de una Request en formato cURL:

[cURL Request](./Results/curl-request.md)

#### Bug Reporting:

[Bug Reporting](./Results/bugreport.md)

#### Cypress Tests:

The tests contained in this repo are executed with Cypress, a tool that requires Node.js to run. Therefore, the first thing to do is to go the the official Node.js website, download it and install it through the wizard installator. Here's the link: <https://nodejs.org/en/download>.

Then, we need to install cypress using npm. To do so, we open a new terminal window and run the following command:

```npm install cypress --save-dev```

Now that cypress is installed, we clone the github repo into our local machine. Then we navigate with the terminal using ```cd``` commands to the repo. Once we're there, we should see that we're in the directory ```*/toolbox-qa-test```. Then, we run the following command to open cypress:

```npx cypress open```

This should open a new window with the cypress app, where we can click on E2E testing, then chose a browser to run the application, and finally we should see the tests to be performed on the screen. These are called "Specs" in cypress. Click on any test to run it. Once it's running, the UI is pretty intuitive, but on the left hand side you will be able to find a log with all the tests that are being run and their status.

If you need further information on how to use cypress, please refer to their official docs: <https://docs.cypress.io/app/get-started/why-cypress>

#### Additional notes

[Results](Results\results.md)
