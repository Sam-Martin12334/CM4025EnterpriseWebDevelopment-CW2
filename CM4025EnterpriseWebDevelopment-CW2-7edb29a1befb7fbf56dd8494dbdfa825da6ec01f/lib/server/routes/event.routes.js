import express from 'express'
import eventCtrl from '../controllers/event.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/events')
  .get(eventCtrl.listEvents)
  .post(eventCtrl.createEvents)

router.route('/api/events/:eventId')
  .get(authCtrl.hasAuthorization, eventCtrl.readEvents)
  .put(authCtrl.hasAuthorization, eventCtrl.updateEvents)
  .delete(authCtrl.hasAuthorization, eventCtrl.removeEvents)

router.param('eventId', eventCtrl.eventByID)



export default router
