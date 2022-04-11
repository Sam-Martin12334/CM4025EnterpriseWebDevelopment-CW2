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
import {readadmin} from './api-user.js'
import {createEvents, listEvents, removeEvents} from './api-events.js'
import TextField from '@material-ui/core/TextField'
import {Redirect } from 'react-router-dom'



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
    const [redirectToSignin, setRedirectToSignin] = useState(false) 
    const [values, setValues] = useState({
        title: '',
        peopleGoing: [],
        description: ''

      })


    
  
    useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal

        readadmin({
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
                setEventData(data)
            }
        })
        return function cleanup(){
        abortController.abort()
        }
  }, [match.params.userId])
  const clickSubmit = (theEventId) => () => {
   
      removeEvents({
        eventId: theEventId
      }, {t: jwt.token}).then((data) => {
        if (data && data.error) {
          console.log(data.error)
        } else {
          auth.clearJWT(() => console.log('deleted'))
        }
      })

      window.location.reload(false);
  }

  const createEvent = () => {
    const event = {
        title: values.title || undefined,
        peopleGoing: [] || undefined,
        description: values.description || undefined
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

    window.location.reload(false);
  }

  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value})
  }

  if (redirectToSignin) {
    return <Redirect to='/signin'/>
  }


  let eventArr = Array.from(eventList);

  
  
    return (

      <><Paper className={classes.root} elevation={4}>
      <Card className={classes.cardMain}>
      <CardContent>    
        <Typography variant="h3" className={classes.title}>
          This page will display all the events currently being run by our service!
        </Typography>
        <TextField id="name" label="Name of Event" className={classes.textField} value={values.title} onChange={handleChange('title')} margin="normal"/><br/>
        <TextField id="multiline-flexible"
                      label="Description of event"
                      multiline
                      rows="2"
                      value={values.description}
                      onChange={handleChange('description')}
                      className={classes.textField}
                      margin="normal"
                    />
        <CardActions>
          <Button color="primary" variant="contained" onClick={createEvent} className={classes.submit}>Submit</Button>
        </CardActions>
       </CardContent>
    </Card>
   
      <List dense>
      
      
      {eventArr.map((item) => {
        
            let peopleArr = Array.from(item.peopleGoing)

            console.log(peopleArr)
            if(item.peopleGoing.length == 0) {
              return <Card className={classes.cardMain}>
              <CardContent>
              <Typography variant="h3" className={classes.title}>
                  {item.title}
              </Typography>
              <Typography  className = {classes.commentTitle}> Description of event: </Typography>
              <Typography  className = {classes.comment}> {item.description} </Typography>
              <Typography  className = {classes.commentTitle}> No users have signed up yet! </Typography>
              <CardActions>
                <Button color="primary" variant="contained" onClick={clickSubmit(item._id)} className={classes.submit}>Remove Event</Button>
              </CardActions>  
            </CardContent>
            </Card>
              
            } else {
                  return <Card className={classes.cardMain}>
                  <CardContent>
                  <Typography variant="h3" className={classes.title}>
                      {item.title}
                  </Typography>
                  <Typography  className = {classes.commentTitle}> Description of event: </Typography>
                  <Typography  className = {classes.comment}> {item.description} </Typography>
                  <Typography  className = {classes.commentTitle}> {'The amount of people going to this event is: ' + item.peopleGoing.length} </Typography>
                  <Typography className = {classes.commentTitle} > {'The people going to this event are: '}  </Typography>
                  {item.peopleGoing.map((item2) => {
                    return <Typography className = {classes.commentTitle} > {item2.name} </Typography>
                  })}

              <CardActions>
                <Button color="primary" variant="contained" onClick={clickSubmit(item._id)} className={classes.submit}>Remove Event</Button>
              </CardActions> 

                  </CardContent>
                  
                  </Card>
            }
       
            
       })}
        </List>
      </Paper>
      
      </>
    )
}