import { Description } from '@material-ui/icons';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: 'Title is required'
  },
  peopleGoing: [{
      name: String,
      userId : ObjectId
  }],
 //This is going to be an array to hold the users that are going,
  description: {
    type: String
  },
  linkToImage: {
    type: String
  }
  
})


const eventModel = mongoose.model('Event', EventSchema);
eventModel.createIndexes();
export default eventModel
