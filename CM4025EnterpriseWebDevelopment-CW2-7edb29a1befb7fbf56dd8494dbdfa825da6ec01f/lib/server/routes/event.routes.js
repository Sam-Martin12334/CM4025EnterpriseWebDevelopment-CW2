import express from 'express'
import eventCtrl from '../controllers/event.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/events')
  .get(eventCtrl.listEvents)
  .post(eventCtrl.createEvents)

router.route('/api/events/:eventId')
  .get(eventCtrl.readEvents)
  .put(eventCtrl.updateEvents)
  .delete(eventCtrl.removeEvents)

  router.route('/api/events/admin/:eventId')
  .put(authCtrl.hasAdminAuthorization, eventCtrl.updateAdminEvents)

router.param('eventId', eventCtrl.eventByID)



export default router
