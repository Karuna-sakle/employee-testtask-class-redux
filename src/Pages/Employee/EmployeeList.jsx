import { Grid, Button } from '@mui/material'
import React, { Component } from 'react'
import EmployeeCard from '../../Componnets/Card/EmployeeCard'
import DeleteModal from '../../Componnets/Modal/DeleteModal'
import { deleteEmployee, fetchemployees } from '../../Redux/Slices/EmployeeSlice'
import { connect } from 'react-redux'
import EmployeeModal from '../../Componnets/Modal/EmployeeModal'
import { toast } from 'react-toastify'

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isLoading: false,
      show: false,
      openDltModal: false,
      deltid: null,
      editid: null,
      data: null,
      isEdit: false,
    }
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
    this.closeDeleteModal = this.closeDeleteModal.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleOpenModal(data) {
    if (!data?.id) {
      this.setState({ show: true })
    }
    else {
      this.setState({ show: true, isEdit: true, editid: data?.id, data: data })
    }
  }

  handleCloseModal() {
    this.setState({ show: false, isEdit: false, data: null, editid: null })
  }
  openDeleteModal(id) {
    this.setState({ deltid: id })
    this.setState({ openDltModal: true })
  }
  closeDeleteModal() {
    this.setState({ openDltModal: false })
  }

  handleDelete() {
    this.props?.deleteEmployee(this.state?.deltid)
    toast.success(this.props?.messgae)
    this.setState({
      openDltModal: false,
      deltid: null
    })
  }

  componentDidMount() {
    this.props?.fetchEmployees()
    console.log("message", this.props?.message)
  }

  render() {

    return (
      <>
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        <Grid item xs={12} mt={3} ml={3} textAlign='left'>
          <Button
            variant='contained'
            onClick={() => this.handleOpenModal()}
          >
            Add Employee
          </Button>
          <EmployeeModal isEdit={this.state?.isEdit} show={this.state?.show} handleCloseModal={this.handleCloseModal} data={this.state?.data} editid={this.state?.editid} message={this.props?.message} />
        </Grid>
        <Grid container spacing={4} maxWidth="xl" sx={{ margin: '0 auto' }} className="container-wrapper">
          {this.props?.users && this.props?.users?.map((user, index) => {
            return (
              <Grid item lg={3} md={6} xs={12} >
                <EmployeeCard user={user} index={index} openDeleteModal={this.openDeleteModal} OpenEditModal={this.handleOpenModal} />
              </Grid>
            )
          })}
          <DeleteModal
            openDltModal={this.state.openDltModal}
            closeDeleteModal={this.closeDeleteModal}
            handleDelete={this.handleDelete}
          />.
        </Grid>
      </Grid>
      </>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchEmployees: () => dispatch(fetchemployees()),
    deleteEmployee: (id) => dispatch(deleteEmployee(id)),
  }
};

const mapStateToProps = (state) => (
  {
    users: state.user?.employees,
    message: state.user?.message,

  }
);

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);

