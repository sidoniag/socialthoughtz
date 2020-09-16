const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String
        // unique, required, trimmed
    },
    email: {
        type: String
        // required, unique, must match a valid email address (look into Mongoose's matching validation)
    },
    thoughts: {
        // Array of _id values referencing the Thought model
    },
    friends: {
        // Array of _id values referencing the User model (self-reference)

    },
});

// Create a virtual called friendCount that retrieves the length
// of the user's friends array field on query.

// create the Pizza model using the PizzaSchema
const User = model('User', UserSchema);

// export the Pizza model
module.exports = User;