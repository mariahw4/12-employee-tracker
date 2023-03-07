SELECT *
FROM role
JOIN department ON role.department = department.id;

SELECT *
FROM employee
JOIN department ON employee.department = department.id;


-- maybe different options on what's best to do

SELECT *
FROM course_names;

SELECT department, COUNT(id) AS number_courses
FROM course_names
GROUP BY department;

SELECT department, SUM(total_enrolled) AS sum_enrolled
FROM course_names
GROUP BY department;



will have to do 3 queries!!!
also 3 inquirer queries 