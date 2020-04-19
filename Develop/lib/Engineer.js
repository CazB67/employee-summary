// Imports Employee class so files are linked
const Employee = require("./Employee")

//Create an Engineer class that inherits Employee class and adds github property and over rides getRole method.
class Engineer extends Employee
{
    constructor(name, id, email, github)
    {
        super(name, id, email);
        this.github = github;
    }
    getRole() 
    {
        return "Engineer";
    }
}

    //Exports the Engineer class
    module.exports = Engineer;
