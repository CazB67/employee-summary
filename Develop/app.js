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
let myManager = new Manager("Tom", "5667", "example@gmail.com", "340343434");
console.log(`${myManager.getName()}`);
console.log(`${myManager.getRole()}`);
console.log(`${myManager.officeNumber}`);
console.log(`${myManager.email}`);
console.log(`${myManager.id}`);

main();

let managers = [];
let engineers = [];
let interns = [];

//Main function to call other functions and develop a flow
async function main() {
    let loadingEmployeeDetails = true;
   while(loadingEmployeeDetails) {
    const answers = await promptMainUI();
    
        if(`${answers.role}` === "Manager") {
            let employeeDetails = await promptEmployee();
            let managerDetails = await promptManager();
            let myManager = new Manager(`${employeeDetails.name}`,`${employeeDetails.id}`, `${employeeDetails.email}`, `${managerDetails.officenumber}`);
            managers.push(myManager);
            console.log(managers);

        }else if(`${answers.role}` === "Intern") {
            let employeeDetails = await promptEmployee();
            let internDetails = await promptIntern();
            let myIntern = new Intern(`${employeeDetails.name}`,`${employeeDetails.id}`, `${employeeDetails.email}`, `${internDetails.school}`);
            interns.push(myIntern);
            console.log(interns);
           
        }else if(`${answers.role}` === "Engineer") {
            let employeeDetails = await promptEmployee();
            let engineerDetails = await promptEngineer();
            let myEngineer = new Engineer(`${employeeDetails.name}`,`${employeeDetails.id}`, `${employeeDetails.email}`, `${engineerDetails.github}`)
            engineers.push(myEngineer);
            console.log(engineers);

        }else{
            loadingEmployeeDetails = false;
        }
   }

}

// Use inquirer to work out what type of employee to add and gather common information to all classes.
function promptMainUI() {
    return inquirer.prompt([
  
      {
        type: "checkbox",
        name: "role",
        message: "What type of employee do you want to add?",
        choices: [ "Engineer", "Manager", "Intern", "No more employees to add" ]
      }
  
    ]);
  }

  function promptEmployee(){
    return inquirer.prompt([
  
        {
          type: "input",
          name: "name",
          message: "Add name:",
        },
  
        {
          type: "input",
          name: "id",
          message: "Add ID:",
        },
  
        {
          type: "input",
          name: "email",
          message: "Add email:",
        }
    
      ]);
    }
  

  function promptManager() {
    return inquirer.prompt([

      {
        type: "input",
        name: "officenumber",
        message: "Add office number:",
      }

    ]);
  }

  function promptIntern() {
    return inquirer.prompt([

      {
        type: "input",
        name: "school",
        message: "Add school name:",
      }

    ]);
  }

  function promptEngineer() {
    return inquirer.prompt([

      {
        type: "input",
        name: "github",
        message: "Add gitHub username:",
      }

  
    ]);
  }


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
