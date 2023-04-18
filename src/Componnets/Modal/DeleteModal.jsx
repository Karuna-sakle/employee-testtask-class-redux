import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material'
import React, { Component } from 'react'

export default class DeleteModal extends Component {
    constructor(props){
      super(props);
    }
  render() {
    return (
      <Dialog
            fullWidth={true}
            open={ this.props?.openDltModal}>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure want to delete?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.props?.closeDeleteModal?.bind(this)}>Cancel</Button> 
                <Button onClick={this.props?.handleDelete.bind(this)} autoFocus> 
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
  }
}
