import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: 'Title is required'
  },
  peopleGoing: [{type: String}] //This is going to be an array to hold the users that are going
  
})


const eventModel = mongoose.model('Event', EventSchema);
eventModel.createIndexes();
export default eventModel
