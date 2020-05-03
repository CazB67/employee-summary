// Imports Employee class so files are linked
const Employee = require("./Employee")

//Create a Manager class that inherits Employee class and adds officeNumber property and over rides getRole method.
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getRole() {
        return "Manager";
    }

    getOfficeNumber() {
        return this.officeNumber;
    }
}

//Exports the manager class
module.exports = Manager;