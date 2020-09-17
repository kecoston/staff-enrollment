const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { type } = require("os");


const employees = [];

function employeeQuest() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the employee's name?"
            },
            {
                type: "input",
                name: "email",
                message: "What is the employee's email?"
            },
            {
                type: "input",
                name: "id",
                message: "What is the employee's ID?"
            },
            {
                type: "list",
                name: "role",
                message: "What is the employee's role?",
                choices: ["Engineer", "Manager", "Intern"]
            },

        ])
        .then(answers => {

            if (answers.role === "Engineer") {
                inquirer.prompt(
                    [
                        {
                            type: "input",
                            name: "gitUser",
                            message: "What is employee's GitHub username?"
                        },
                        {
                            type: "list",
                            name: "restart",
                            message: "Would you like to add another employee?",
                            choices: ["Yes", "No"]
                        }
                      
                    ]

                )
                .then(engineerAnswers => {

                    if (engineerAnswers.restart === "Yes") {
                        const engineer = new Engineer(answers.name, answers.id, answers.email, engineerAnswers.gitUser)
                        employees.push(engineer)
                        employeeQuest()

                        
                                           }
                    else {
                        const engineer = new Engineer(answers.name, answers.id, answers.email, engineerAnswers.gitUser)
                        employees.push(engineer)
                        console.log(employees)
                    } 
                   
                })
               
            }

            if (answers.role === "Manager") {
                inquirer.prompt(
                    [
                        {
                            type: "input",
                            name: "officeNumber",
                            message: "What is the employee's office number?"
                        },
                        {
                            type: "list",
                            name: "restart",
                            message: "Would you like to add another employee?",
                            choices: ["Yes", "No"]
                        }
                    ]
                )
                    .then(managerAnswers => {
                        if ("restart" === "Yes") {
                            const manager = new Manager(answers.name, answers.id, answers.email, managerAnswers.officeNumber)
                            employees.push(manager)
                            employeeQuest()
                        }
                        else {
                            const manager = new Manager(answers.name, answers.id, answers.email, managerAnswers.officeNumber)
                            employees.push(manager)
                            console.log(employees)

                        }
                    })
            }
            if (answers.role === "Intern") {
                inquirer.prompt(
                    [
                        {
                            type: "input",
                            name: "internSchool",
                            message: "What school did the employee attend?"
                        },
                        {
                            type: "list",
                            name: "restart",
                            message: "Would you like to add another employee?",
                            choices: ["Yes", "No"]
                        }
                    ]
                )
                    .then(internAnswers => {
                        if ("restart" === "Yes") {
                            const intern = new Intern(answers.name, answers.id, answers.email, internAnswers.internSchool)
                            employees.push(intern)
                            employeeQuest()
                        }
                        else {
                            const intern = new Intern(answers.name, answers.id, answers.email, internAnswers.internSchool)
                            employees.push(intern)
                            console.log(employees)

                        }
                    })
            }


        })

        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });


}


employeeQuest()












// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
