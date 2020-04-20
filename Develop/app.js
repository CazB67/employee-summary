const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const render = require("./lib/htmlRenderer");

main();

//Main function to call other functions and develop a flow
async function main() {
    const employees = [];
    let loadingEmployeeDetails = true;
   while(loadingEmployeeDetails) {
    const answers = await promptMainUI();
    
        if(`${answers.role}` === "Manager") {
            let employeeDetails = await promptEmployee();
            let managerDetails = await promptManager();
            let myManager = new Manager(`${employeeDetails.name}`,`${employeeDetails.id}`, `${employeeDetails.email}`, `${managerDetails.officenumber}`);
            employees.push(myManager);
            //console.log(employees);

        }else if(`${answers.role}` === "Intern") {
            let employeeDetails = await promptEmployee();
            let internDetails = await promptIntern();
            let myIntern = new Intern(`${employeeDetails.name}`,`${employeeDetails.id}`, `${employeeDetails.email}`, `${internDetails.school}`);
            employees.push(myIntern);
            
           
        }else if(`${answers.role}` === "Engineer") {
            let employeeDetails = await promptEmployee();
            let engineerDetails = await promptEngineer();
            let myEngineer = new Engineer(`${employeeDetails.name}`,`${employeeDetails.id}`, `${employeeDetails.email}`, `${engineerDetails.github}`)
            employees.push(myEngineer);
            

        }else{
            loadingEmployeeDetails = false;
           
        }
   }
   const renderEmployees = render(employees);
   await writeFileAsync(outputPath, renderEmployees);
   //console.log(employees);
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