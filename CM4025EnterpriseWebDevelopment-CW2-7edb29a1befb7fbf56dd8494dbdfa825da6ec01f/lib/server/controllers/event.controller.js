import Event from '../models/events.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'

const createEvents = async (req, res) => {
  const event = new Event(req.body)
  try {
    await event.save()
    return res.status(200).json({
      message: "New Event Created!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const listEvents = async (req, res) => {
  try {
    let events = await Event.find().select('_id title peopleGoing description')
    res.json(events)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}


const readEvents = (req, res) => {
  return res.json(req.profile)
}


const updateEvents = async (req, res) => {
  try {
    let event = req.profile
    event = extend(event, req.body)
    await event.save()
    res.json(event)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const removeEvents = async (req, res) => {
  try {
    let event = req.profile
    let deletedEvent = await event.remove()
    res.json(deletedEvent)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const eventByID = async (req, res, next, id) => {
  try {
    let event = await Event.findById(id)
    if (!event)
      return res.status('400').json({
        error: "Event not found"
      })
    req.profile = event
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve event"
    })
  }
}



export default {
  createEvents,
  readEvents,
  listEvents,
  removeEvents,
  updateEvents,
  eventByID
}
