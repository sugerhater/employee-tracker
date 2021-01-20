const mysql = require('mysql');
const inquirer = require('inquirer');
const util = require('util');
const { connect } = require('http2');
const { title } = require('process');
// const { writeFile } = require('fs');

// const Employee = require('../../homework10/employee-summary/lib/Employee');
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
// let roles = {
//   "Sales Lead": 1,
//   "Salesperson": 2,
//   "Lead Engineer": 3,
//   "Software Engineer": 4,
//   "Accountant": 5,
//   "Legal Team Lead": 6,
//   "Lawyer": 7
// }

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
        'View All employess By Manager', 'Add Employee', 'Remove Employee', "Add Department",
        'Add A Role',
        'Update Employee Role', 'Update Employee Manager', 'View All Roles', 'End']
    }
  ]);

  switch (whatToDo) {
    case 'View All Employees':
      viewAllEmployees();//done
      // renderEmployeeList();
      break;

    case 'View All employees By Department'://done
      viewAllEmployeesByDepartment();
      break;

    case 'View All employess By Manager':
      viewAllEmployeesByManager();

      break;

    case 'Add Employee':
      addEmployee();//done
      break;

    case "Add Department":
      addDepartment();
      break;

    case "Add A Role"://done
      addRole();
      break;


    case 'Remove Employee'://done
      removeEmployee();
      break;

    case 'Update Employee Role':
      updateEmployeeRole(); //need to get done
      break;

    case 'Update Employee Manager':
      updateEmployeeManager();
      break;

    case 'View All Roles':
      viewAllRoles();
      break;

    case 'End':
      end();
      break;
  }
}

function viewAllEmployees() {
  console.log("choose view all employees")
  let query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    // if (err) console.log(err);
    console.table(res);
    toDo();
  })

};
function viewAllEmployeesByDepartment() {
  let query = "SELECT first_name, last_name, department_id FROM employee INNER JOIN role ON employee.role_id = role.id"
  connection.query(query, function (err, res) {
    console.log(res)
    console.table(res)
    for (let i = 0; i < res.length; i++) {
      console.log(res[i].first_name + " | " + res[i].last_name + " | " + res[i].department_id);
    }
    toDo();
  });

}
function viewAllEmployeesByManager() {

}
async function addEmployee() {

  let query = "INSERT INTO employee SET ?"
  let { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    {
      type: 'input',
      name: "first_name",
      message: 'what is the first_name of the new employee?'
    },

    {
      type: 'input',
      name: 'last_name',
      message: 'What is the last name of the employee?'

    },

    {
      type: 'list',
      name: 'role_id',
      message: 'What is the role of the new employee?',
      choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer",
        "Accountant", "Legal Team Lead", "Lawyer"
      ]
    },

    {
      type: 'list',
      name: 'manager_id',
      message: 'Who is the manager of the new employee?',
      choices: ["John Doe", "Ashley Rodriguez", "Malia Brown", "Sarah Lourd", "Tom Allen", "none of above"]
    }
  ]);
  connection.query(
    query, {
    first_name: first_name,
    last_name: last_name,
    role_id: roles[role_id],
    manager_id: manager[manager_id]
  },
    function (err) {
      if (err) console.log(err);
      console.log("New employee added!");
      toDo();
    }
  )
}

async function addDepartment() {
  let query = 'INSERT INTO department SET ?'
  let { name } = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'What department do you want to add?'
  });
  connection.query(query, {
    name: name
  });
  toDo();
};

async function addRole() {
  let departments = await connection.query('SELECT id, name FROM department');
  let departmentList = [];
  let departmentMap = {};
  let query = "INSERT INTO role SET ?";
  // console.log(departments);
  departments.forEach(department => {
    departmentList.push(`${department.name}`)
    // departmentList.push({`${department.name}`:`${department.id}`})
    departmentMap[department.name] = department.id;
  });
  console.log(departments);
  console.log(departmentMap);

  let { department } = await inquirer.prompt({
    type: 'list',
    name: 'department',
    message: 'Which deparment does this role belong?',
    choices: departmentList
  })
  let { title, salary } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the name of the role?'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary of the role?'
    }
  ]);
  connection.query(query, {
    title: title,
    salary: salary,
    department_id: departmentMap[department]
  });
  toDo();
};

async function removeEmployee() {
  let employees = await connection.query('SELECT id, first_name, last_name FROM employee')
  
  const employeeList = employees.map(employee => {
    return `${employee.id}: ${employee.first_name} ${employee.last_name}`;
  });

  let { name } = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Choose which employee you want to delete:",
    choices: employeeList
  });

  const id = name.split(":")[0];

  await connection.query('DELETE FROM employee WHERE id = ?', id);
  toDo();
}

async function updateEmployeeRole() {
  // let employeeMap = {};
  let employees = await connection.query('SELECT id, first_name, last_name FROM employee')
  
  let employeeList = employees.map(employee =>{
    return `${employee.id}:${employee.first_name} ${employee.last_name}`;
  });
  let roles = await connection.query('SELECT * FROM role')
  
  let rolesList = roles.map(role =>{
    return `${role.id}: ${role.title}, ${role.salary}, department ID ${role.department_id}`
  } );

  let {name, role } = await inquirer.prompt([{
    type:'list',
    name:'name',
    message:'Chooese employee you want to update',
    choices: employeeList
  },
  {
    type:'list',
    name:'role',
    message:'Choose the new role of the employee:',
    choices:rolesList
  }
])
  let nameId = name.split(":")[0];
  let roleId = role.split(":")[0];
  console.log(nameId);
  console.log(roleId);
  let query = 'UPDATE employee SET ? WHERE ? ';
  await connection.query(query,[{role_id:roleId},{id:nameId}]);
  toDo();
}
function updateEmployeeManager() {

}
function viewAllRoles() {
  connection.query(
    'SELECT * FROM role', function (err, res) {
      if (err) throw err;
      console.table(res);
      toDo();
    }
  )
}

function end() {
  connection.end();
};
//---------------addition functions which work for function above-----------------//
async function renderEmployeeList() {
  let employeeList = [];
  connection.query(
    'SELECT id, first_name, last_name FROM employee',
    function (err, res) {
      if (err) throw err;
      console.log(res);
      res.forEach(employee => {
        employeeList.push(`${employee.first_name} ${employee.last_name}`);
        console.log(`${employee.first_name} ${employee.last_name}`);
      });
      console.log(employeeList);
      return employeeList;
    }
  );
}

// let list = renderEmployeeList().then;
// console.log(list);