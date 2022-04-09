import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import DeleteComments from './DeleteComments'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import auth from './../auth/auth-helper'
import {read, listadmin,update} from './api-user.js'


const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  commentTitle: {
    color: theme.palette.openTitle,
    textAlign: 'left',
    fontSize:'1.5em'
  },
  comment: {
    color: theme.palette.openTitle,
    textAlign: 'left',
    fontSize:'1em'
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  cardMain: {
    maxWidth: 1200,
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
    const [user, setUser] = useState({})
    const jwt = auth.isAuthenticated()
    
  
    useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal
  
      listadmin({userId: match.params.userId}, {t: jwt.token}, signal).then((data) => {
        if (data && data.error) {
          console.log(data.error)
        } else {
            //console.log("Here is the user data")
            //console.log(data)
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
  console.log(users)
    return (

      <><Paper className={classes.root} elevation={4}>
      <Card className={classes.cardMain}>
      <CardContent>    
        <Typography variant="h3" className={classes.title}>
          Comments from all of our users!
        </Typography>

        <List dense>
          {users.map((item) => {
            return <><ListItemText  classes = {{primary:classes.commentTitle}} primary={'The user ' + item.name + ' commented:'} /><List dense>
              {item.comments.map((comment) => {
                return <ListItemText primary={comment} classes = {{primary:classes.comment} }/>
              })}
              <DeleteComments userId={item._id}/>
            </List></>
          })}

        </List>
       </CardContent>
        </Card>
      </Paper>
      
      </>
    )
}