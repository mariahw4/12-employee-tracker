const connection = require("./config/connection");
const inquirer = require("inquirer");


const promptUser = () => {
    inquirer.prompt([
        {
          name: 'choices',
          type: 'list',
          message: 'Please select an option:',
          choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'View All Employees By Department',
            'View All Employees By Manager',
            'Update Employee Role',
            'Update Employee Manager',
            'Add Employee',
            'Add Role',
            'Add Department',
            'View Department Budgets',
            'Remove Employee',
            'Remove Role',
            'Remove Department',
            'Exit'
            ]
        }
      ])

    }