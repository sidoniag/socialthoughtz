const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
        // unique, required, trimmed
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/]
        // required, unique, must match a valid email address (look into Mongoose's matching validation)
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ]
        // Array of _id values referencing the Thought model
    },
    {
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
        // Array of _id values referencing the User model (self-reference)
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

// Create a virtual called friendCount that retrieves the length
// of the user's friends array field on query.
UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total, friends) => total + friends.thoughts.length + 1, 0);
});

// create the user model using the PizzaSchema
const User = model('User', UserSchema);

// export the user model
module.exports = User;