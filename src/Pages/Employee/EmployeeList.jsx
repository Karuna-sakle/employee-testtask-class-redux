import { Grid, Button, Pagination } from '@mui/material'
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
      show: false,
      openDltModal: false,
      deltid: null,
      editid: null,
      data: null,
      isEdit: false,
      currentPage: localStorage.getItem("pageno") ? localStorage.getItem("pageno") : 1,
      search: localStorage.getItem("searchval") ? localStorage.getItem("searchval") : "",
      greeting: ""
    }
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
    this.closeDeleteModal = this.closeDeleteModal.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  handlePageChange = (event , value) => {
    console.log("handlePageChange",value)
    localStorage.setItem("pageno",value)
    this.setState({ currentPage: value });
  };

  handleSearch(e){
    const val = e.target.value
    localStorage.setItem("searchval", val)
    this.setState({ search: e.target.value })
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
  }

  // componentDidUpdate() {
  //   const pageval = localStorage.getItem("pageno")
  //   const preSearch = localStorage.getItem("searchval")
  //   console.log("componentDidUpdate",pageval, preSearch)
  //   if (this.state.currentPage !== pageval || this.state.search !== preSearch)  {
  //     this.setState({currentPage:pageval, search:preSearch})
  //   }
  // }
  
  render() {
    const { currentPage, search } = this.state;
    const users = this.props?.users
    const results = !search ? users : users?.filter((item) =>
      item.firstname.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()))
    const itemsPerPage = 4;
    const numPages = Math.ceil(results?.length / itemsPerPage);
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
            <input className='search-input' type="text" onChange={this.handleSearch} placeholder="search by name" />
            <EmployeeModal isEdit={this.state?.isEdit} show={this.state?.show} handleCloseModal={this.handleCloseModal} data={this.state?.data} editid={this.state?.editid} message={this.props?.message} />
          </Grid >
          <Grid container spacing={4} maxWidth="xl" sx={{ margin: '0 auto' }} className="container-wrapper">
            {results && results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((user, index) => {
                return (
                  <Grid item lg={3} md={6} xs={12}  key={index}>
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
        <Pagination
          count={numPages}
          page={currentPage}
          onChange={this.handlePageChange}
        />
        {/* <TextField
          variant="outlined"
          type="text"
          onChange={(e) => this.setState({ greeting: e.target.value })}
        />
        <div>{this.state.greeting}</div> */}
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


