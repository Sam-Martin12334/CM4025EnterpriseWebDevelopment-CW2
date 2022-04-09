import express from 'express'
import eventCtrl from '../controllers/event.controller'

const router = express.Router()

router.route('/api/users')
  .get(eventCtrl.listEvent)
  .post(eventCtrl.createEvent)
  .get(eventCtrl.readEvent)
  .put(eventCtrl.updateEvent)
  .delete(eventCtrl.removeEvent)


router.param('eventId', eventCtrl.eventByID)



export default router
