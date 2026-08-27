import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {

  // Store employees
  const [employees, setEmployees] = useState([]);

  // Form values
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");

  // Employee being edited
  const [editEmployee, setEditEmployee] = useState(null);


  // GET EMPLOYEES
  useEffect(() => {

    const getEmployees = async () => {

      try {

        const response = await axios.get(
          "http://127.0.0.1:8000/employee"
        );

        console.log(response.data);

        setEmployees(response.data);

      } catch (error) {

        console.log(error);

        alert("Error while fetching employees");

      }

    };

    getEmployees();

  }, []);


  // ADD EMPLOYEE
  const addEmployee = async () => {

    try {

      const newEmployee = {

        id: employees.length + 1,

        name: name,

        designation: designation,

        salary: Number(salary)

      };


      // POST request
      const response = await axios.post(
        "http://127.0.0.1:8000/employee",
        newEmployee
      );


      console.log("New employee:", response.data);


      // Add new employee to table
      setEmployees([
        ...employees,
        response.data
      ]);


      // Clear form
      setName("");
      setDesignation("");
      setSalary("");


      alert("Employee added successfully");

    } catch (error) {

      console.log(error);

      alert("Error while adding employee");

    }

  };


  // EDIT BUTTON
  const edit_employee = (employee) => {

    setEditEmployee(employee);

    setName(employee.name);
    setDesignation(employee.designation);
    setSalary(employee.salary);

  };


  // UPDATE EMPLOYEE
  const update_employee = async () => {

    try {

      const updatedEmployee = {

        id: editEmployee.id,

        name: name,

        designation: designation,

        salary: Number(salary)

      };


      const response = await axios.put(
        `http://127.0.0.1:8000/employee/${editEmployee.id}`,
        updatedEmployee
      );


      console.log("Updated employee:", response.data);


      const newEmployees = employees.map((employee) => {

        if (employee.id === editEmployee.id) {

          return updatedEmployee;

        }

        return employee;

      });


      setEmployees(newEmployees);


      // Clear edit mode
      setEditEmployee(null);

      setName("");
      setDesignation("");
      setSalary("");


      alert("Employee updated successfully");

    } catch (error) {

      console.log(error);

      alert("Error while updating employee");

    }

  };


  // DELETE EMPLOYEE
  const delete_employee = async (employee) => {

    try {

      const response = await axios.delete(
        `http://127.0.0.1:8000/employee/${employee.id}`
      );


      const newEmployees = employees.filter(
        (item) => item.id !== employee.id
      );


      setEmployees(newEmployees);


      alert("Employee deleted successfully");

    } catch (error) {

      console.log(error);

      alert("Error while deleting employee");

    }

  };


  // CLEAR FORM
  const clearForm = () => {

    setEditEmployee(null);

    setName("");
    setDesignation("");
    setSalary("");

  };


  return (

    <div>

      <h1>Employee Management System</h1>


      {/* EMPLOYEE FORM */}

      <h2>
        {editEmployee
          ? "Edit Employee"
          : "Add Employee"}
      </h2>


      <input
        type="text"
        placeholder="Employee name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />


      <input
        type="text"
        placeholder="Designation"
        value={designation}
        onChange={(e) => setDesignation(e.target.value)}
      />


      <input
        type="number"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />


      {editEmployee ? (

        <button onClick={update_employee}>
          Update Employee
        </button>

      ) : (

        <button onClick={addEmployee}>
          Add Employee
        </button>

      )}


      <button onClick={clearForm}>
        Clear
      </button>


      <br />
      <br />


      {/* EMPLOYEE TABLE */}

      <table border="1">

        <thead>

          <tr>

            <th>Employee Name</th>

            <th>Designation</th>

            <th>Salary</th>

            <th>Edit</th>

            <th>Delete</th>

          </tr>

        </thead>


        <tbody>

          {employees.map((employee) => (

            <tr key={employee.id}>

              <td>
                {employee.name}
              </td>

              <td>
                {employee.designation}
              </td>

              <td>
                {employee.salary}
              </td>

              <td>

                <button
                  onClick={() => edit_employee(employee)}
                >
                  Edit
                </button>

              </td>

              <td>

                <button
                  onClick={() => delete_employee(employee)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

};

export default App;

