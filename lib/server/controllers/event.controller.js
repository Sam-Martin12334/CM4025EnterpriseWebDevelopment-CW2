import Event from '../models/event.model'
import extend from 'lodash/extend'
import errorHandler from '../helpers/dbErrorHandler'

const createEvent = async (req, res) => {
  const event = new Event(req.body)
  try {
    await user.save()
    return res.status(200).json({
      message: "New Event Created!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const listEvent = async (req, res) => {
  try {
    let events = await Event.find().select('title peopleGoing')
    res.json(events)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}


const readEvent = (req, res) => {
  return res.json(req.profile)
}


const updateEvent = async (req, res) => {
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

const removeEvent = async (req, res) => {
  try {
    let event = req.profile
    let deletedEvent = await event.remove()
    res.json(deletedUser)
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
  createEvent,
  readEvent,
  listEvent,
  removeEvent,
  updateEvent,
  eventByID
}
