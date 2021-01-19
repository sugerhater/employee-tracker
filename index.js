const mysql = require('mysql');
const inquirer = require('inquirer')
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
  toDo();

})
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
  let {whatToDo} = await inquirer.prompt([
    {
      type: 'list',
      name: 'whatToDo',
      message: 'What wyould you like to do?',
      choices: ['View All Employees', 'View All employees By Department',
        'View All employess By Manager', 'Add Employee', 'Remove Employee',
        'Update Employee Role', 'Update Employee Manager', 'View All Roles', 'End']
    }
  ]);

  switch (whatToDo) {
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
  console.log("choose view all employees")
  var query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    // if (err) console.log(err);
    console.table(res);
    toDo();
  })

};
function viewAllEmployeesByDepartment() {
  var query = "select first_name, last_name, department_id from employee inner JOIN  role on employee.role_id = role.id"
  connection.query(query, function (err,res){
    console.log(res)
    console.table(res)
    for (let i = 0; i < res.length; i++){
      console.log(res[i].first_name + " | " + res[i].last_name + " | " + res[i].department_id);
    }
  toDo();
  });

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

};
