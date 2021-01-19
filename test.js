const mysql = require('mysql');
const inquirer = require('inquirer');
const util = require('util');

// const Employee = require('../../homework10/employee-summary/lib/Employee');
// let manager = {
//  1:"John Doe",
//  2:"Ashley Rodriguez",
//  3:"Malia Brown",
//  4:"Sarah Lourd",
//  5:"Tom Allen"
// };
let manager = {
  "John Doe": 1,
  "Ashley Rodriguez": 3,
  "Malia Brown": 5,
  "Sarah Lourd": 6,
  "Tom Allen": 7,
  "none of above": "null"
};
let role = [{
  "Sales Lead": 1
},
{
  "Salesperson": 2,
},
{

  "Lead Engineer": 3,
},
{
  "Software Engineer": 4,

},
{
  "Accountant": 5
},
{ "Legal Team Lead": 6 },
{
  "Lawyer": 7
}];
let roles = {
  "Sales Lead": 1,
  "Salesperson": 2,
  "Lead Engineer": 3,
  "Software Engineer": 4,
  "Accountant": 5,
  "Legal Team Lead": 6,
  "Lawyer": 7
}

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'AdalynnTatiannaKehong',
  database: 'employeedb'
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  // renderEmployeeList();
  toDo();
});

 connection.query = util.promisify(connection.query);
//this function is equivalent with the async function. 
// function toDo() {
// inquirer.prompt(
//     {
//       name: 'whatToDo',
//       type: 'list',
//       message: 'What wyould you like to do?',
//       choices: ['View All Employees', 'View All employees By Department',
//         'View All employess By Manager', 'Add Employee', 'Remove Employee',
//         'Update Employee Role', 'Update Employee Manager', 'View All Roles', 'End']
//     }
//   ).then(function(answer){

//     switch (answer.whatToDo) {
//       case 'View All Employees':
//         console.log("1111");
//         viewAllEmployees();
//         break;

//       case 'View All employees By Department':
//         viewAllEmployeesByDepartment();
//         break;

//       case 'View All employess By Manager':
//         viewAllEmployeesByManager();

//         break;

//       case 'Add Employee':
//         addEmployee();
//         break;

//       case 'Remove Employee':
//         removeEmployee();
//         break;

//       case 'Update Employee Role':
//         updateEmployeeRole();
//         break;

//       case 'Update Employee Manager':
//         updateEmployeeManager();
//         break;

//       case 'View All Employees':
//         viewAllRoles();
//         break;

//       case 'End':
//         end();
//         break;
//     }
//   })};


async function toDo() {
  let { whatToDo } = await inquirer.prompt([
    {
      type: 'list',
      name: 'whatToDo',
      message: 'What would you like to do?',
      choices: ['View All Employees', 'View All employees By Department',
        'View All employess By Manager', 'Add Employee', 'Remove Employee',
        'Update Employee Role', 'Update Employee Manager', 'View All Roles', 'End']
    }
  ]);

  switch (whatToDo) {
    case 'View All Employees':
      // viewAllEmployees();
      renderEmployeeList();
      break;

    case 'View All employees By Department':
      viewAllEmployeesByDepartment();
      break;

    case 'View All employess By Manager':
      viewAllEmployeesByManager();

      break;

    case 'Add Employee':
      addEmployee();
      break;

    case 'Remove Employee':
      removeEmployee();
      break;

    case 'Update Employee Role':
      updateEmployeeRole();
      break;

    case 'Update Employee Manager':
      updateEmployeeManager();
      break;

    case 'View All Employees':
      viewAllRoles();
      break;

    case 'End':
      end();
      break;
  }
};

async function removeEmployee(){
  const list = await connection.query('SELECT id, first_name, last_name FROM employee')
  // , function(err,res){
  //   if (err) throw err;
  //   console.log(res);
  //   return res;
  // });
  console.dir(list);
}
