const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

//Testing in the console
let myManager = new Manager("Tom", "5667", "example@gmail.com.com", "340343434");
console.log(`${myManager.getName()}`);
console.log(`${myManager.getRole()}`);
console.log(`${myManager.officeNumber}`);
console.log(`${myManager.email}`);
console.log(`${myManager.id}`);

// Use inquirer to work out what type of employee to add and gather common information to all classes.
function promptUser() {
    return inquirer.prompt([
  
      {
        type: "checkbox",
        name: "role",
        message: "What type of employee do you want to add?",
        choices: [ "Engineer", "Manager", "Intern" ]
      },

      {
        type: "input",
        name: "name",
        message: "Add name",
      },

      {
        type: "input",
        name: "id",
        message: "Add ID?",
      },

      {
        type: "input",
        name: "email",
        message: "Add email",
      }
  
    ]);
  }

  function promptManager() {
    return inquirer.prompt([

      {
        type: "input",
        name: "officenumber",
        message: "Add office number",
      }
  
    ]);
  }

  function promptIntern() {
    return inquirer.prompt([

      {
        type: "input",
        name: "school",
        message: "Add school name",
      }
  
    ]);
  }

  function promptEngineer() {
    return inquirer.prompt([

      {
        type: "input",
        name: "github",
        message: "Add gitHub username",
      }
  
    ]);
  }
promptUser();
/*
// and to create objects for each team member (using the correct classes as blueprints!)
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
​
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
​
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
​
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```*/
