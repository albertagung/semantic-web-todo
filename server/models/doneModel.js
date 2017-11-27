let mongoose = require('mongoose')
let Schema = mongoose.Schema

let doneSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    name: String,
    description: String,
    tags: [String],
    status: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }
)

let Done = mongoose.model('Done', doneSchema)
module.exports = Done
