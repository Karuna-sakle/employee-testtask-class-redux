import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { TextField, Button, MenuItem, FormControl, InputLabel, Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
import Select from '@mui/material/Select';
import * as Yup from 'yup';
import { addEmployee, resetEmployee, updateEmployee } from '../../Redux/Slices/EmployeeSlice';
import PageLoading from '../PageLoading/PageLoading';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const SignupSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('FirstName is Required'),
  email: Yup.string().email('Invalid Email Address').required('Email is Required'),
  phone: Yup.number().required('Number is Required')
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point"),
  password: Yup.string().required('Password is Required')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(passwordRules, { message: "Please create a stronger password" }),
  city: Yup.string().required('City is Required'),
  gender: Yup.string().required("Gender is Required")
});

class EmployeeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }
  
  componentDidUpdate(){
    if(this.props?.message && this.props.message.length> 0){
      toast.success(this.props?.message)
      this.props.resetEmployee()
    }
  }

  handleOnSubmit(val) {
    if (this.props?.editid) {
      const values = {
        "id": this.props?.editid,
        "firstname": val.firstname,
        "email": val.email,
        "password": val.password,
        "city": val.city,
        "gender": val.gender,
        "phone": val.phone
      }
      this.setState({ loading: true })
      setTimeout(() => {
        this.props.updateEmployee(values)
        this.setState({ loading: false })
        this.props.handleCloseModal()
      }, 2000)
    }
    else {
      this.setState({ loading: true })
      setTimeout(() => {
        this.props.addEmployee(val)
        this.setState({ loading: false })
        this.props.handleCloseModal()
      }, 2000)
    }

  }
  render() {

    return (
      <Modal show={this.props?.show} onHide={this.props?.handleCloseModal?.bind(this)} >
        <div className='modal-popup-wrapper'>
          <Formik
            initialValues={{
              firstname: this.props?.data ? this.props?.data?.firstname : '',
              email: this.props?.data ? this.props?.data?.email : '',
              phone: this.props?.data ? this.props?.data?.phone : '',
              password: this.props?.data ? this.props?.data?.password : '',
              city: this.props?.data ? this.props?.data?.city : '',
              gender: this.props?.data ? this.props?.data?.gender : '',
            }}
            validationSchema={SignupSchema}
            onSubmit={this.handleOnSubmit}
          >
            {({ errors,
              touched,
              values,
              handleSubmit,
              setFieldValue,
            }) => (

              <Form onSubmit={handleSubmit}>
                <h1>{this.props.isEdit ? 'Update Employeee' : 'Add Employee'}</h1>
                <TextField
                  type='text'
                  name='firstname'
                  label="FirstName"
                  variant="outlined"
                  value={values?.firstname}
                  onChange={(e) => setFieldValue('firstname', e.target.value)}
                  onBlur={(e) => setFieldValue('firstname', e.target.value)}
                  error={errors.firstname && touched.firstname ? <div>{errors.firstname}</div> : null}
                  helperText={errors.firstname && touched.firstname ? <div>{errors.firstname}</div> : null}
                />
                <TextField
                  type='text'
                  name='email'
                  label="email"
                  variant="outlined"
                  value={values?.email}
                  onChange={(e) => setFieldValue('email', e.target.value)}
                  onBlur={(e) => setFieldValue('email', e.target.value)}
                  error={errors.email}
                  helperText={errors.email && touched.email ? <div>{errors.email}</div> : null}
                />
                <TextField
                  type='number'
                  name='phone'
                  id="outlined-basic"
                  label="Phone No"
                  variant="outlined"
                  value={values.phone}
                  onChange={(e) => setFieldValue('phone', e.target.value)}
                  onBlur={(e) => setFieldValue('phone', e.target.value)}
                  error={errors.phone}
                  helperText={errors.phone && touched.phone ? <div>{errors.phone}</div> : null}
                />
                <TextField
                  type='password'
                  name='password'
                  label="Password"
                  variant="outlined"
                  value={values.password}
                  onChange={(e) => setFieldValue('password', e.target.value)}
                  onBlur={(e) => setFieldValue('password', e.target.value)}
                  error={errors.password}
                  helperText={errors.password && touched.password ? <div>{errors.password}</div> : null}
                />
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small"
                  >City</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={values.city}
                    label="City"
                    name='city'
                    onChange={(e) => setFieldValue('city', e.target.value)}
                    onBlur={(e) => setFieldValue('city', e.target.value)}
                    error={errors.city}
                    helperText={errors.city && touched.city ? <div>{errors.city}</div> : null}>
                    <MenuItem value="python">Indore</MenuItem>
                    <MenuItem value="react">Bhopal</MenuItem>
                    <MenuItem value="ror">Khandwa</MenuItem>
                    <MenuItem value="php">Khargone</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="gender"
                    label="Gender"
                    value={values.gender}
                    onChange={(e) => setFieldValue('gender', e.target.value)}
                    onBlur={(e) => setFieldValue('gender', e.target.value)}
                    error={errors.gender}
                    helperText={errors.gender && touched.gender ? <div>{errors.gender}</div> : null}
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </FormControl>
                {this.props?.isEdit ?
                  <Button type='submit' variant="contained">
                    {!this.state?.loading ? "Update"
                      :
                      <PageLoading />
                    }
                  </Button> :

                  <Button type='submit' variant="contained">
                    {!this.state?.loading ? "Submit" :
                      <PageLoading />
                    }
                  </Button>}
              </Form>)}
          </Formik>
        </div>
      </Modal>
    )
  }
}
export default connect(null, { addEmployee, updateEmployee, resetEmployee })(EmployeeModal)