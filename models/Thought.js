const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String
        // required, must be between 1 and 280 characters
    },
    createdAt: {
        type: Date,
        default: Date.now
        // Use moment in a getter method to format the timestamp on query
    },
    username: {
        type: String,
        // required (the user that created this thought)
    },
    reactions: {
        // (these are like replies) Array of nested documents created with the reactionSchema
    },
});

// Create a virtual called reactionCount that retrieves the length
// of the thought's reactions array field on query.

// create the Pizza model using the PizzaSchema
const Thought = model('Thought', ThoughtSchema);

// export the Pizza model
module.exports = Thought;