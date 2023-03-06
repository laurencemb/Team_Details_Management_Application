
const Employee = require("./lib/Employee")
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const e = new Employee("Alice", 100, "test@test.com" )


// TODO: Write Code to gather information about the development team members, and render the HTML file.

inquirer.prompt ([
    {
        type: 'input',
        name: 'name',
        message: 'Please Enter the Team Managers Full Name'
    },
    {
        type: 'number',
        name: 'Id',
        message: 'Please Enter the Team Managers 4 digit numeric employee ID'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please Enter the Team Managers work email address'
    },
    {
        type: 'input',
        name: 'office',
        message: 'Please Enter the Team Managers office name'
    },
    {
        type: 'choice',
        name: 'employee type',
        message: 'Would you like to add a new team member?:',
        choices: [ 'Engineer', 'Intern', 'Finish building team' ]
    }



])
