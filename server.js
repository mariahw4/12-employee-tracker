const connection = require("./config/connection");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

console.log("\n \n Employee Tracker by Mariah Wear \n \n");

const promptUser = () => {
  inquirer
    .prompt([
      {
        name: "choices",
        type: "list",
        message: "Please select an option:",
        choices: [
          "View All Departments",
          "Add Department",
          "View Department Budgets",
          "Remove Department",
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "Update Employee Manager",
          "View All Employees By Department",
          "View All Employees By Manager",
          "Remove Employee",
          "View All Roles",
          "Add Role",
          "Remove Role",
          "---Exit---",
        ],
      },
    ])
    .then((answers) => {
      const { choices } = answers;

      if (choices === "View All Departments") {
        viewAllDepartments();
      }
      if (choices === "View All Roles") {
        viewAllRoles();
      }
      if (choices === "View All Employees") {
        viewAllEmployees();
      }
      if (choices === "View All Employees By Department") {
        viewAllEmployeesbyDepartment();
      }
      if (choices === "View All Employees By Manager") {
        viewAllEmployeesbyManager();
      }
      if (choices === "View Department Budgets") {
        viewDepartmentBudget();
      }
      if (choices === "Add Department") {
        addDepartment();
      }
      if (choices === "Add Role") {
        addRole();
      }
      if (choices === "Add Employee") {
        addEmployee();
      }
      if (choices === "Update Employee Role") {
        updateEmployeeRole();
      }
      if (choices === "Update Employee Manager") {
        updateEmployeeManager();
      }
      if (choices === "Remove Department") {
        removeDepartment();
      }
      if (choices === "Remove Role") {
        removeRole();
      }
      if (choices === "Remove Employee") {
        removeEmployee();
      }
      if (choices === "---Exit---") {
        connection.end();
      }
    });
};
// --------------------VIEWING COMPONENTS--------------
// view all departments
const viewAllDepartments = async () => {
  const sql = `SELECT department.id AS ID, 
                    department.name AS Department FROM department`;
  await connection.execute(sql, (error, response) => {
    if (error) throw error;
    console.log("\n \nAll Departments:\n \n");
    console.table(response);
    promptUser();
  });
};

// view all roles
const viewAllRoles = async () => {
  const sql = `SELECT role.id, 
                        role.title, 
                        role.salary,
                        department.name AS department FROM role
                        INNER JOIN department ON role.department_id = department.id`;
  await connection.execute(sql, (error, response) => {
    if (error) throw error;
    console.log("\n \n Current Employee Roles: \n \n");
    console.table(response);
    promptUser();
  });
};

// view all employees
const viewAllEmployees = async () => {
  const sql = `SELECT employee.id AS ID, 
                        CONCAT(employee.first_name, " ", employee.last_name) AS Employee,
                        role.title AS Title,
                        department.name AS Department,
                        role.salary AS Salary,
                        CONCAT(boss.first_name, " ", boss.last_name) AS Manager 
                        FROM employee JOIN role ON employee.role_id = role.id
                        JOIN department ON role.department_id = department.id
                        LEFT JOIN employee AS boss ON boss.id = employee.manager_id`;
  await connection.execute(sql, (error, response) => {
    if (error) throw error;
    console.log("\n \n Current Employees: \n \n");
    console.table(response);
    promptUser();
  });
};

// 'View All Employees By Department',
const viewAllEmployeesbyDepartment = async () => {
  const sql = `SELECT department.name AS Department,
                    CONCAT(employee.first_name, " ", employee.last_name) AS Employee
                    FROM employee JOIN role ON employee.role_id = role.id 
                    JOIN department ON role.department_id = department.id`;
  await connection.execute(sql, (error, response) => {
    if (error) throw error;
    console.log("\n \n Current Employees by Department: \n \n");
    console.table(response);
    promptUser();
  });
};

// 'View All Employees By Manager',
const viewAllEmployeesbyManager = async () => {
  const sql = `SELECT CONCAT(boss.first_name, " ", boss.last_name) AS Manager,
                    CONCAT(employee.first_name, " ", employee.last_name) AS Employee
                    FROM employee  
                    LEFT JOIN employee AS boss ON boss.id = employee.manager_id
                    ORDER BY employee.manager_id = employee.id`;
  await connection.execute(sql, (error, response) => {
    if (error) throw error;
    console.log("\n \n Current Employees By Manager: \n \n");
    console.table(response);
    promptUser();
  });
};

// 'View Department Budgets',
const viewDepartmentBudget = async () => {
  const sql = `SELECT department.name AS Department,
                    SUM(salary) AS Budget
                    FROM role JOIN department ON role.department_id = department.id
                    GROUP BY role.department_id`;
  await connection.execute(sql, (error, response) => {
    if (error) throw error;
    console.log("\n \n Current Department Budgets: \n \n");
    console.table(response);
    promptUser();
  });
};
// --------------------------ADDING COMPONENTS-----------------------
// 'Add Department',
const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "What is the name of your new Department?",
        validate: function (answer) {
          if (answer.length < 1) {
            return console.log("A valid Department Name is required");
          }
          return true;
        },
      },
    ])
    .then((answer) => {
      let sql = `INSERT INTO department (name) VALUES (?)`;
      connection.query(sql, answer.newDepartment, (error, reponse) => {
        if (error) throw error;
        console.log("Department Successfully Created!");
        viewAllDepartments();
      });
    });
};

// 'Add Role',
const addRole = () => {
  const sql = "SELECT * FROM department";
  connection.query(sql, (error, response) => {
    if (error) throw error;
    let departmentNames = [];
    response.forEach((department) => {
      departmentNames.push(department.name);
    });
    departmentNames.push("Create New Department");
    inquirer
      .prompt([
        {
          name: "departmentName",
          type: "list",
          message: "Which Department is this new Role in?",
          choices: departmentNames,
        },
      ])
      .then((answer) => {
        if (answer.departmentName === "Create New Department") {
          this.addDepartment();
        } else {
          addNewRole(answer);
        }
      });
    const addNewRole = (departmentData) => {
      inquirer
        .prompt([
          {
            name: "newRole",
            type: "input",
            message: "What is the title of your new role?",
            validate: function (answer) {
              if (answer.length < 1) {
                return console.log("A valid Role title is required");
              }
              return true;
            },
          },
          {
            name: "salary",
            type: "input",
            message: "What is the Salary of this Role?",
            validate: function (answer) {
              if (answer.length < 1) {
                return console.log("A valid salary is required");
              }
              return true;
            },
          },
        ])
        .then((answer) => {
          let createdRole = answer.newRole;
          let departmentId;

          response.forEach((department) => {
            if (departmentData.departmentName === department.name) {
              departmentId = department.id;
            }
          });
          let sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
          let crit = [createdRole, answer.salary, departmentId];

          connection.query(sql, crit, (error) => {
            if (error) throw error;
            console.log("Role Successfully Created");
            viewAllRoles();
          });
        });
    };
  });
};

// 'Add Employee',
const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?",
        validate: function (answer) {
          if (answer.length < 1) {
            return console.log("A valid first name is required");
          }
          return true;
        },
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?",
        validate: function (answer) {
          if (answer.length < 1) {
            return console.log("A valid last name is required");
          }
          return true;
        },
      },
    ])
    .then((answer) => {
      const crit = [answer.firstName, answer.lastName];
      const roleSelect = `SELECT role.id, role.title FROM role`;
      connection.query(roleSelect, (error, response) => {
        if (error) throw error;
        const roles = response.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
        inquirer
          .prompt([
            {
              name: "role",
              type: "list",
              message: "What is the employee's Role?",
              choices: roles,
            },
          ])
          .then((roleSelection) => {
            const role = roleSelection.role;
            crit.push(role);
            const managerSelection = `SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id FROM employee`;
            connection.query(managerSelection, (error, response) => {
              if (error) throw error;
              let managers = [];
              response.forEach((employee) => {
                managers.push(`${employee.first_name} ${employee.last_name}`);
              });
              console.log("managers = ", managers);

              inquirer
                .prompt([
                  {
                    name: "manager",
                    type: "list",
                    message: "Who is the employee's manager?",
                    choices: managers,
                  },
                ])
                .then((answer) => {
                  let managerId, employeeId;
                  response.forEach((employee) => {
                    if (
                      answer.manager ===
                      `${employee.first_name} ${employee.last_name}`
                    ) {
                      employeeId = employee.id;
                    }

                    if (answer.manager === `No Manager`) {
                      managerId = null;
                    } else if (
                      answer.manager ===
                      `${employee.first_name} ${employee.last_name}`
                    ) {
                      managerId = employee.id;
                    }
                  });
                  crit.push(managerId);
                  console.log("Crit ==", crit);
                  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
                  connection.query(sql, crit, (error) => {
                    if (error) throw error;
                    console.log("Employee successfully added!!");
                    viewAllEmployees();
                  });
                });
            });
          });
      });
    });
};
// -----------------------------UPDATING COMPONENTS-------------------
// 'Update Employee Role',
const updateEmployeeRole = async () => {
  let sql = `SELECT employee.id, employee.first_name, employee.last_name, role.id AS "role_id"
        FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id`;
  await connection.execute(sql, (error, response) => {
    if (error) throw error;
    let employeeNames = [];
    response.forEach((employee) => {
      employeeNames.push(`${employee.first_name} ${employee.last_name}`);
    });
    let sql = `SELECT role.id, role.title FROM role`;
    connection.query(sql, (error, response) => {
      if (error) throw error;
      let allRoles = [];
      response.forEach((role) => {
        allRoles.push(role.title);
      });

      inquirer
        .prompt([
          {
            name: "selectedEmployee",
            type: "list",
            message: "Which employee has a new role",
            choices: employeeNames,
          },
          {
            name: "selectedRole",
            type: "list",
            message: "What is the employees new role?",
            choices: allRoles,
          },
        ])
        .then((answer) => {
          let newRoleId, employeeId;
          response.forEach((role) => {
            if (answer.selectedRole === role.title) {
              newRoleId = role.id;
            }
          });
          response.forEach((employee) => {
            if (
              answer.selectedEmployee ===
              `${employee.first_name} ${employee.last_name}`
            ) {
              employeeId = employee.id;
            }
          });
          let roleUpdates = `UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`;
          connection.query(roleUpdates, [newRoleId, employeeId], (error) => {
            if (error) throw error;
            console.log("Employee Role Updated!");
            promptUser();
          });
        });
    });
  });
};

// 'Update Employee Manager',
const updateEmployeeManager = async () => {
  let sql = `SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id FROM employee`;
  await connection.execute(sql, (error, response) => {
    if (error) throw error;
    let employeeNames = [];
    response.forEach((employee) => {
      employeeNames.push(`${employee.first_name} ${employee.last_name}`);
    });
    employeeNames.push("No Manager");

    inquirer
      .prompt([
        {
          name: "selectedEmployee",
          type: "list",
          message: "Which employee has a new manager?",
          choices: employeeNames,
        },
        {
          name: "newManager",
          type: "list",
          message: "Who is the employee's new manager?",
          choices: employeeNames,
        },
      ])
      .then((answer) => {
        let employeeId, managerId;
        response.forEach((employee) => {
          if (
            answer.selectedEmployee ===
            `${employee.first_name} ${employee.last_name}`
          ) {
            employeeId = employee.id;
          }

          if (answer.newManager === `No Manager`) {
            managerId = null;
          } else if (
            answer.newManager === `${employee.first_name} ${employee.last_name}`
          ) {
            managerId = employee.id;
          }
        });
        if (answer.selectedEmployee === answer.newManager) {
          console.log("Invalid Manager Selection");
          updateEmployeeManager();
        } else {
          let sql = `UPDATE employee SET employee.manager_id = ? WHERE employee.id = ?`;
          connection.query(sql, [managerId, employeeId], (error) => {
            if (error) throw error;
            console.log("New manager for employee updated!");
            promptUser();
          });
        }
      });
  });
};

// -------------------------------REMOVING COMPONENTS---------------------
// 'Remove Department',
const removeDepartment = async () => {
  let sql = `SELECT department.id, department.name FROM department`;
  await connection.execute(sql, (error, response) => {
    if (error) throw error;
    const allDepartments = response.map(({ id, name }) => ({
      value: id,
      name: name,
    }));
    inquirer
      .prompt([
        {
          name: "selectedDepartment",
          type: "list",
          message: "Which Department would you like to remove?",
          choices: allDepartments,
        },
      ])
      .then((answer) => {
        let departmentName;
        console.log("Selected department", answer.selectedDepartment);
        response.forEach((department) => {
          if (answer.selectedDepartment === department.id) {
            departmentName = department.name;
          }
        });

        let sql = `DELETE FROM department WHERE department.name = ?`;
        connection.query(sql, [departmentName], (error) => {
          if (error) {
            console.log(
              "\n \n ERROR: Cannot remove Department if an Employee still works it \n \n"
            );
            viewAllEmployees();
          } else {
            console.log("Department successfully Removed!");
            viewAllDepartments();
          }
        });
      });
  });
};
// 'Remove Role',
const removeRole = async () => {
  let sql = `SELECT role.id, role.title FROM role`;
  await connection.execute(sql, (error, response) => {
    if (error) throw error;
    let allRoles = [];
    response.forEach((role) => {
      allRoles.push(role.title);
    });

    inquirer
      .prompt([
        {
          name: "selectedRole",
          type: "list",
          message: "Which role would you like to remove?",
          choices: allRoles,
        },
      ])
      .then((answer) => {
        let roleId;

        response.forEach((role) => {
          if (answer.selectedRole === role.title) {
            roleId = role.id;
          }
        });

        let sql = `DELETE FROM role where role.id = ?`;
        connection.query(sql, [roleId], (error) => {
          if (error) {
            console.log(
              "\n \n ERROR: Cannot remove role if an Employee still works it \n \n"
            );
            viewAllEmployees();
          } else {
            console.log("Role successfully Removed!");
            viewAllRoles();
          }
        });
      });
  });
};

// 'Remove Employee',
const removeEmployee = async () => {
  let sql = `SELECT employee.id, employee.first_name, employee.last_name FROM employee`;
  await connection.execute(sql, (error, response) => {
    if (error) throw error;
    let employeeNames = [];
    response.forEach((employee) => {
      employeeNames.push(`${employee.first_name} ${employee.last_name}`);
    });

    inquirer
      .prompt([
        {
          name: "selectedEmployee",
          type: "list",
          message: "Which employee would you like to remove?",
          choices: employeeNames,
        },
      ])
      .then((answer) => {
        let employeeId;

        response.forEach((employee) => {
          if (
            answer.selectedEmployee ===
            `${employee.first_name} ${employee.last_name}`
          ) {
            employeeId = employee.id;
          }
        });

        let sql = `DELETE FROM employee where employee.id = ?`;
        connection.query(sql, [employeeId], (error) => {
          if (error) throw error;
          console.log("Employee successfully Removed!");
          viewAllEmployees();
        });
      });
  });
};

// ----------------------AND EXIT!!------------------------------
// 'Exit'

promptUser();
