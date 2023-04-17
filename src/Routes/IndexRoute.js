import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom'
import EmployeeList from '../Pages/Employee/EmployeeList'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default class IndexRoute extends Component {
  render() {
    return (
      <>
        <Routes>
          <Route path='/' element={<EmployeeList />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </>
    )
  }
}
