# Employee Summary
Object Oriented Programming and Test Driven Development

## Description
![GitHub repo size](https://img.shields.io/github/repo-size/cazb67/employee-summary)  


![GitHub issues](https://img.shields.io/github/issues/cazb67/employee-summary)  


The task was to build a software engineering team generator command line application. The application prompts the user for information about the team manager and then information about the team members. The user can input any number of team members, and they may be a mix of engineers and interns. This application also needed to pass all unit tests. When the user has completed building the team, the application will create an HTML file that displays a nicely formatted team roster based on the information provided by the user. 

## Table of Contents
1. [Installation](#Installation)
2. [Usage](#Usage)
3. [Technologies](#Technologies)
4. [Credits](#Credits)
5. [Licence](#License)
6. [Contributing](#Contributing)
7. [Tests](#Tests)
8. [Questions](#Questions)

## Installation
1. Write code to build out Engineer, Intern and Manager classes 
2. Write code to use inquirer to gather information about team members and to create objects for each team member.
3. Call the `render` function and pass in employees array.
4. Create `output` folder.
5. Using the HTML returned, write it to a file named `team.html` in the `output` folder. 
6. Run tests
7. Add CSS

## Usage
To use this application run the following in the command line:

```
node app.js
```
The user is then prompted with a series of questions like so.  

![Command Line](./assets/cli.png)


When the user has finished answering the questions a `team.html` file is generated with all the information. It looks like so.  




## Technologies
NPM, Node js, fs, inquirer, Javascript, Jest(for testing)

## Credits
- Team at UWA Coding Bootcamp

## Contributing
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md)

## Tests 
![Coveralls github](https://img.shields.io/coveralls/github/cazb67/employee-summary)  


![Tests](./assets/tests.PNG)

To run tests, run the following command:
​
```
npm run test
```

## License
![License](https://img.shields.io/github/license/cazb67/employee-summary)