import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import {list} from './api-user.js'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Icon from '@material-ui/core/Icon'
import auth from './../auth/auth-helper'
import {read, update} from './api-user.js'
import {Redirect} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
}))

export default function Users({match}) {
  const classes = useStyles()
  const [users, setUsers] = useState([])
  const [currentUser, setUser] = useState({})
  const [values, setValues] = useState({
    newcomment : "",
    redirectToProfile: false
  })
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setUsers(data)
      }
    })

    read({
      userId: match.params.userId
    }, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true)
      } else {
        setUser(data)
      }
    })

    return function cleanup(){
      abortController.abort()
    }
  }, [match.params.userId])

  const clickSubmit = () => {
    
    var arr = Object.values(currentUser.comments);

    arr.push(values.newcomment)
  
    console.log(arr)
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      about: values.about || undefined,
      comments: arr|| undefined
    }
    

    

    const jwt = auth.isAuthenticated()
    update({
      userId: match.params.userId
    }, {
      t: jwt.token
    }, user).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, userId: data._id, redirectToProfile: true})
      }
    })
  }
  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value})
  }
  if (values.redirectToProfile) {
    return ( window.location.reload(false))
  }
  

    return (

      <><Paper className={classes.root} elevation={4}>
        <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
              Add a new Comment
          </Typography>
          <TextField id="newComment" label="Add Comment here!" className={classes.textField} onChange={handleChange('newcomment')} margin="normal"/>
          <br/> {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
          
        <Typography variant="h3" className={classes.title}>
          The Comments
        </Typography>

        <List dense>
          {users.map((item) => {
            return <><ListItemText primary={'The user ' + item.name + ' commented:'} /><List dense>
              {item.comments.map((comment) => {
                return <ListItemText primary={comment} />
              })}
              
            </List></>
          })}

        </List>
      </Paper>
      
      </>
    )
}