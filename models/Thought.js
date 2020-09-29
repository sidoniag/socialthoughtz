const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema ( 
    {
        // set custom id to avoid confusion with parent thought _id
    reactionId : {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
        },
    reactionBody: {
        type: String,
        required: 'Reaction is Required!',
        maxlength: 280
    },
    username: {
        type: String,
        required: 'Username is Required!'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD YYYY [at] hh:mm a')
        }
    },
    {
    toJSON: {
            getters: true
        } 
    }
);

const ThoughtSchema = new Schema(
    {
    thoughtText: {
        type: String,
        required: 'Thought is Required',
        minlength: 1,
        maxlength: 280
        // required, must be between 1 and 280 characters
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD YYYY [at] hh:mm a')
        // Use moment in a getter method to format the timestamp on query
    },
    username: {
        type: String,
        required: 'Username is Required'
        // required (the user that created this thought)
    },
    reactions: 
        // (these are like replies) Array of nested documents created with the reactionSchema
        [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Create a virtual called reactionCount that retrieves the length
// of the thought's reactions array field on query.

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// create the thought model using the PizzaSchema
const Thought = model('Thought', ThoughtSchema);

// export the thought model
module.exports = Thought;