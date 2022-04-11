import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import auth from './../auth/auth-helper'
import {update,listadmin} from './api-user.js'
import {Redirect} from 'react-router-dom'

export default function DeleteUser(props) {
  const [open, setOpen] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [values, setValues] = useState({
    comments : []
  })

  const jwt = auth.isAuthenticated()
  const clickButton = () => {
    setOpen(true)
  }

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    return function cleanup(){
      abortController.abort()
    }
  }, [props.userId])
 
  const deleteComments = () => { 
    
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      about: values.about || undefined,
      comments: values.comments|| undefined
    }
    update({
      userId: props.userId
    }, {
      t: jwt.token
    }, user).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
        setRedirect(true)
      } else {
        setValues({...values, userId: props.userId})
        console.log(props.userId);
        setRedirect(true)
      }
    })

  }
  const handleRequestClose = () => {
    setOpen(false)
  }

  if (redirect) {
    window.location.reload(false);
  }
    return (<span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon/>
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete Comments"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your Comments.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteComments} color="secondary" autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>)

}
DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired
}

