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
const axios = require("axios");

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
        type: "list",
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
          validate: validateName
        },
  
        {
          type: "input",
          name: "id",
          message: "Add ID:",
          validate: validateId
        },
  
        {
          type: "input",
          name: "email",
          message: "Add email:",
          validate: validateEmail
        }
    
      ]);
    }

  function promptManager() {
    return inquirer.prompt([

      {
        type: "input",
        name: "officenumber",
        message: "Add office number:",
        validate: validateNumber
      }

    ]);
  }

  function promptIntern() {
    return inquirer.prompt([

      {
        type: "input",
        name: "school",
        message: "Add school name:",
        validate: validateSchool
      }

    ]);
  }

  function promptEngineer() {
    return inquirer.prompt([

      {
        type: "input",
        name: "github",
        message: "Add gitHub username:",
        validate: validateGithub
      }

  
    ]);
  }

  function validateName(name){
    let isValid = isNaN(name);
    return isValid || "Name is a word! Re-enter name.";
}

  function validateNumber(officenumber){
    let isValid = !isNaN(officenumber)  && officenumber >= 0;
    return isValid || "Office number should be a positive number!";
  }

  function validateEmail(email) {
   let isValid = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
    return isValid || "You have entered an invalid email address!";
  
}

function validateId(id){
  let isValid = !isNaN(id) && id >= 0 ;
  return isValid || "ID is a number! Re-enter id.";
}

function validateSchool(school){
  let isValid = isNaN(school);
  return isValid || "School is a word! Re-enter school.";
}

//Application is stalling after github username has been retreived
async function validateGithub(github) {
  let isValid = true;
  try {
  
    const queryUrl = `https://api.github.com/users/${github.toLowerCase()}`;
    await axios.get(queryUrl); 
    return isValid;
  }
  catch (err) {
      isValid = false; 
      return "Github profile does not exist!";
  }
    
  }
  