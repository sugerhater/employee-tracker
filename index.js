const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'AdalynnTatiannaKehong',
  database: ''
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);


})

async function toDo() {
  const { chosenOption } = await inquirer.prompt([
    {
      type: 'list',
      name: 'whatToDo',
      message: 'What wyould you like to do?',
      choices: ['View All Employees', 'View All employees By Department',
        'View All employess By Manager', 'Add Employee', 'Remove Employee',
        'Update Employee Role', 'Update Employee Manager', 'View All Roles', 'End']
    }
  ])

  switch (chosenOption) {
    case 'View All Employees':
      viewAllEmployees();
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
}

function viewAllEmployees() {

}
function viewAllEmployeesByDepartment() {

}
function viewAllEmployeesByManager() {

}
function addEmployee() {

}
function removeEmployee() {

}
function updateEmployeeRole() {

}
function updateEmployeeManager() {

}
function viewAllRoles() {

}

function end() {

}