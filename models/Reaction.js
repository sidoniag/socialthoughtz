// const { Schema } = require('mongoose');

// const ReactionSchema = new Schema({
//     reactionId: {
//         // Use Mongoose's ObjectId data type
//         // Default value is set to a new ObjectId  
//     },
//     reactionBody: {
//         type: String
//         // required, 280 character maximum
//     },
//     username: {
//         type: String,
//         // required
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//         // Use moment in a getter method to format the timestamp on query
//     },
// });

// // This will not be a model, but rather will be used as the reaction field's 
// // subdocument schema in the Thought model.

// // create the Reaction model using the ReactionSchema
// const Reaction = ('Reaction', ReactionSchema);

// // export the Reaction model
// module.exports = Reaction;