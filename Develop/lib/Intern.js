// Imports Employee class so files are linked
const Employee = require("./Employee")

//Create an Intern class that inherits Employee class and adds github property and over rides getRole method.
class Intern extends Employee
{
    constructor(name, id, email, school)
    {
        
        super(name, id, email);
        this.school = school;
    }
    getSchool() 
    {
        return this.school;
    }
    getRole() 
    {
        return "Intern";
    }
}

//Exports the Intern class
module.exports = Intern;