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
        if(answers.role === "Manager") {
            let employeeDetails = await promptEmployee();
            let managerDetails = await promptManager();
            //Initialise a new manager using details provided through inquirer
            let myManager = new Manager(`${employeeDetails.name}`,`${employeeDetails.id}`, `${employeeDetails.email}`, `${managerDetails.officenumber}`);
            //Add new manager to employees array
            employees.push(myManager);
        }else if(answers.role === "Intern") {
            let employeeDetails = await promptEmployee();
            let internDetails = await promptIntern();
            let myIntern = new Intern(`${employeeDetails.name}`,`${employeeDetails.id}`, `${employeeDetails.email}`, `${internDetails.school}`);
            employees.push(myIntern);
        }else if(answers.role === "Engineer") {
            let employeeDetails = await promptEmployee();
            let engineerDetails = await promptEngineer();
            let myEngineer = new Engineer(`${employeeDetails.name}`,`${employeeDetails.id}`, `${employeeDetails.email}`, `${engineerDetails.github}`)
            employees.push(myEngineer);
        }else{
            //To stop the while loop so no more questions are asked
            loadingEmployeeDetails = false;  
        }
   }

   //Call the render function passing in the employees array
   const renderEmployees = render(employees);
   //After the render function has been run write to team.html file
   await writeFileAsync(outputPath, renderEmployees);
}

// Use inquirer to work out what type of employee to add and gather common information to all classes.
async function promptMainUI() {
    return inquirer.prompt([
      {
        type: "list",
        name: "role",
        message: "What type of employee do you want to add?",
        choices: [ "Manager", "Engineer", "Intern", "No more employees to add" ]
      }
    ]);
}

//Inquirer prompts to get info on employees
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
      validate: validateName
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

//Functions to validate info received from inquirer so that it is in the correct form.
function validateName(name){
  let letters = /^[A-Z a-z]+$/;
    if(name.match(letters)) {
      return true;
    }
      return "Name must be a word! Re-enter name.";
}

function validateNumber(officenumber){
  let isValid = !isNaN(officenumber)  && officenumber >= 0;
    return isValid || "Office number should be a positive number!";
}

function validateEmail(email) {
  let isValid = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
    return isValid || "You have entered an invalid email address!";
}

let idArray = [];
function validateId(id){
  let isValid = !isNaN(id) && id >= 0 ;
    if(isValid === true){
      for(let i=0; i< idArray.length; i++){
        if(id === idArray[i]){
          return "ID must be unique! Re-enter id.";
        }
      }
          idArray.push(id);
    }
          return isValid || "ID is a number! Re-enter id.";
}

//Application is stalling after github username has been retreived (on the next employee's name)
async function validateGithub(github) {
  try {
    const queryUrl = `https://api.github.com/users/${github.toLowerCase()}`;
    await axios.get(queryUrl); 
    return true;
  }
  catch (err) {
      return "Github profile does not exist! Try again";
  }
}


  