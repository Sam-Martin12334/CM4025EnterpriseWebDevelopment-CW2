import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import auth from './../auth/auth-helper'
import {read} from './api-user.js'
import {createEvents, listEvents} from './api-events.js'



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

export default function Event({match}) {
    const classes = useStyles()
    const [user, setUser] = useState({})
    const [eventList, setEventData] = useState({})
    const jwt = auth.isAuthenticated()
    const [values, setValues] = useState({
        title: '',
        peopleGoing: [],

      })
    
  
    useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal

        read({
        userId: match.params.userId
        }, {t: jwt.token}, signal).then((data) => {
        if (data && data.error) {
            setRedirectToSignin(true)
        } else {
            setUser(data)
        }
        })

        listEvents(signal).then((data) => {
            
            if (data && data.error) {
                console.log(data.error)
            } else {
                console.log(data)
                setEventData(data)
            }
        })
        return function cleanup(){
        abortController.abort()
        }
  }, [match.params.userId])

  const clickSubmit = () => {
    const event = {
        title: "New Event" || undefined,
        peopleGoing: [{ 
            name: "me" || undefined,
            userId: user._id || undefined
            }, {
            name: "you" || undefined,
            userId: user._id || undefined
            }
        ] || undefined,
        description: "A brand new event" || undefined
    }

    
    createEvents(event).then((data) => {
      if (data.error) {
        console.log("Not Worked")
        setValues({ ...values, error: data.error})
        console.log("Not Worked")
      } else {
        console.log("Worked")
        setValues({ ...values, error: '', open: true})
        console.log("Worked")
      }
    })

    
  }
  let eventArr = Array.from(eventList);

  
  
    return (

      <><Paper className={classes.root} elevation={4}>
      <Card className={classes.cardMain}>
      <CardContent>    
        <Typography variant="h3" className={classes.title}>
          Comments from all of our users!
        </Typography>
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
       </CardContent>
    </Card>
   
      <List dense>
      {eventArr.map((item) => {
            return <> <Card className={classes.cardMain}>
            <CardContent>
            <Typography variant="h3" className={classes.title}>
                {item.title}
            </Typography>
            {item.peopleGoing.map((item2) => {
                var id1 = item2.userId
                var id2 = match.params.userId
                if(id1 === id2) {
                    console.log("yes")
                    return <ListItemText classes = {{primary:classes.commentTitle}} primary={'You are going to this event!'} />
                } else {
                    return <ListItemText classes = {{primary:classes.commentTitle}} primary={'Would you like to go to this event?'} />
                    
                }
            })}
            <ListItemText  classes = {{primary:classes.commentTitle}} primary={'Description of event:'} />
            <ListItemText  classes = {{primary:classes.comment}} primary={item.description} />
            <ListItemText  classes = {{primary:classes.commentTitle}} primary={'The amount of people going to this event is: ' + item.peopleGoing.length} />
            </CardContent>
        </Card></>
          })}
        </List>
        
        
       
      </Paper>
      
      </>
    )
}

/*

          */