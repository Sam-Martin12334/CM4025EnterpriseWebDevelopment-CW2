import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import {list} from './api-user.js'

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  }
}))

export default function Users() {
  const classes = useStyles()
  const [users, setUsers] = useState([])

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

    return function cleanup(){
      abortController.abort()
    }
  }, [])

    return (
      <><Paper className={classes.root} elevation={4}>
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
      </Paper><Paper className={classes.root}>

      </Paper></>
    )
}