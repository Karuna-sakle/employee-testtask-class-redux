import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import React, { Component } from 'react'

export default class EmployeeCard extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <Card className="article-card">
        <CardContent >
          <Typography variant="h7"><span>FirstName: </span>{this.props?.user?.firstname}</Typography>
          <Typography variant="body1"><span>Email: </span>{this.props?.user?.email}</Typography>
          <Typography variant="body1"><span>Password: </span>{this.props?.user?.password}</Typography>
          <Typography variant="body1"><span>City: </span>{this.props?.user?.city}</Typography>
          <Typography variant="body1"><span>Gender: </span>{this.props?.user?.gender}</Typography>
          <Typography variant='body1' className='blog-content'>
            <span>Mobile: </span>{this.props?.user?.phone}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            aria-label="Edit"
            component="label"
            onClick={() => this.props?.OpenEditModal(this.props?.user)?.bind(this)}
          >
            Edit
            {/* <ModeEditOutlineIcon /> */}
          </Button>
          <Button
            color="error"
            aria-label="Delete"
            component="label"
            onClick={() => this.props?.openDeleteModal(this.props?.user?.id)?.bind(this)}
          >
            {/* <DeleteIcon /> */}
            Delete
          </Button>
        </CardActions>
      </Card>
    )
  }
}
