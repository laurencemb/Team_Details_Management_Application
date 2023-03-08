
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

//const e = new Employee("Alice", 100, "test@test.com" )
let teamMembers = []

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const TeamManagerQs =
    
    [
    {
        type: 'input',
        name: 'TMname',
        message: 'Please Enter the Team Managers Full Name',
        validate: (input) => {
        if (input = "") {
        return 'Please prodivde answer'
        }
        else
        { return true}
    }

    },
    {
        type: 'number',
        name: 'TMId',
        message: 'Please Enter the Team Managers 4 digit numeric employee ID'
    },
    {
        type: 'input',
        name: 'TMemail',
        message: 'Please Enter the Team Managers work email address'
    },
    {
        type: 'input',
        name: 'TMoffice',
        message: 'Please Enter the Team Managers office name'
    },
     
]

const buildTeamOptions= [
    {

        type: 'list',
        name: 'AddEmployee',
        message: 'Would you like to add a new team member?:',
        choices: [ 'Engineer', 'Intern', 'Finish building team' ],
        default:'Finish building team'
    },
]


//questions for Engineers specifically
const EngineerQs = [

    {
        type: 'input',
        message: 'Please enter the Engineers name',
        name: 'Engname',
        default: 'Engineer',
    },

    {
        type: 'input',
        message: 'Please enter the engineers ID',
        name: 'EngId',
      
    },

    {
        type: 'input',
        message: 'Please enter the Engineers email',
        name: 'Engemail',
       
    },

    {
        type: 'input',
        message: 'Please enter the Engineers GitHub Username',
        name: 'EngGithub',
       
    },
]

//questions for Internsspecifically
const InternQs = [

    {
        type: 'input',
        message: 'Please enter the Interns name',
        name: 'Inname',
        default: 'Engineer',
    },

    {
        type: 'input',
        message: 'Please enter the Interns ID',
        name: 'InId',
      
    },

    {
        type: 'input',
        message: 'Please enter the Interns email',
        name: 'Inemail',
       
    },

    {
        type: 'input',
        message: 'Please enter the Interns school',
        name: 'InSchool',
       
    },
]


inquirer.prompt (TeamManagerQs)
.then(answers => {
        const TMname = answers.TMname;
        const TMId = answers.TMId;
        const TMemail = answers.TMemail;
        const TMoffice = answers.TMoffice;

        const manager = new Manager (TMname, TMId, TMemail, TMoffice);

        teamMembers.push(manager)

        assembleTeam()

    }
    )


  const assembleTeam = function(){

    inquirer.prompt(buildTeamOptions)
    .then(answers => {

        let buildTeamOptions = answers.AddEmployee
console.log(answers)
        switch(buildTeamOptions){

        case 'Engineer':
console.log('hello')
        inquirer.prompt (EngineerQs)
        .then(answers => {
                const Engname = answers.Engname;
                const EngId = answers.EngId;
                const Engemail = answers.Engemail;
                const Engoffice = answers.Engoffice;
                const EngGithub = answers.EngGithub;
        
                const engineer = new Engineer (Engname, EngId, Engemail, EngGithub);
        
                teamMembers.push(engineer)
        assembleTeam()
            }
            );

            break

            case 'Intern':

            inquirer.prompt (InternQs)
            .then(answers => {
                    const Inname = answers.Inname;
                    const InId = answers.InId;
                    const Inemail = answers.Inemail;
                    const Inoffice = answers.Inoffice;
                    const InSchool = answers.InSchool;
            
                    const intern = new Intern (Inname, InId, Inemail, InSchool);
            
                    teamMembers.push(intern)
            assembleTeam()
                }
                )

                break

                
            case 'Finish building team':

            const html = endTeamBuild();
            fs.writeFile('./src/index.html', html, function(error) {
                console.log('Team Build Success')
            })
        break

        }
    })
  } 
function endTeamBuild (){
  
    let employeeHtml
teamMembers.forEach(function(employee){
let emp = employee
let special
if (emp.getRole()==='Manager'){
    special = emp.getOfficeNumber()
}
else if (emp.getRole()==='Engineer'){
    special = emp.getGithub()
}
else if (emp.getRole()==='Intern'){
    special = emp.getSchool()
}
employeeHtml += `
<div class="card employee-card">
<div class="card-header">
    <h2 class="card-title">${emp.getName()}</h2>
    <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${emp.getRole()}</h3>
</div>
<div class="card-body">
    <ul class="list-group">
        <li class="list-group-item">ID: ${emp.getId()}</li>
        <li class="list-group-item">Email: <a href="mailto:${emp.getEmail()}">${emp.getEmail()}</a></li>
        <li class="list-group-item">Other: ${special}</li>
    </ul>
</div>
</div>

 `



}

)
return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
  ${employeeHtml}  
</body>
</html>`
}


{/* <div>
<h2>${emp.getName()}</h2>
<h3> ${emp.getRole()} </h3>
    <ul>
    <li> ${emp.getEmail()}</li>
    <li> ${emp.getId()}</li>
    <li> ${special}</li>
    </ul>
</div> */}