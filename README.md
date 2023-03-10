# 12 SQL: Employee Tracker

Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are called **content management systems (CMS)**. The task is to build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

## User Story (given)

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria (given)

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

### Screenshot

![](./assets/images/Screenshot-terminal.png)

Database structure - ![](./assets/images/12-sql-homework-demo-01.png)

### Links

- Solution URL: [Github Repository Link](https://github.com/mariahw4/12-employee-tracker)
- Brief gif of functionality: ![](./assets/images/gif%20-%20employee%20tracker.gif)
- Walk through Video: [Click to view full video](https://drive.google.com/file/d/1HOQxQldA1FVbHPTqfpyGFcdn-UJ2sTP5/view)

## My process

### Built with

- JavaScript
- Inquirer
- Mysql/Mysql2
- Console.table
- Database
- 

### What I learned

I learned a ton about how to use database data, manipulate the data, call certain data -- this was a really big challenge for me and I feel very accomplished with what I learned!! 


### Continued development

In order to continue development of this project it would be fun to build a front end where all the information could be displayed on a browser and manipulated from there rather than just from the terminal.

## Author

- Github Profile - [Mariah Wear](https://github.com/mariahw4)
- LinkedIn - [profile](https://www.linkedin.com/in/mariah-wear-7b1630255/)


## Acknowledgments

Many thanks to UC Berkely Extension. EdX, and my wonderful teaching staff there!! Learning lots!
