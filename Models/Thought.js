
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dayjs = require('dayjs');
// Define the thought schema
const thoughtSchema = new Schema(
    {
        // The text of the thought (required, limited to 280 characters)
        thoughtText: {
            type: String,
            required: true,
            minlength:1,
            maxlength: 280,
        },
        // The creation date of the thought (defaults to the current date)
        cratedAt: {
            type: Date,
            default: Date.now,
            // Custom getter to format the date
            get: createdFormat => dayjs(createdFormat).format('MMM DD, YYYY hh:mm a')
        },
        // The username of the thought's author (required)
        username: {
            type: String,
            required: true,
        },
        // Array of reactions associated with the thought
        reactions: [reactionSchema],
    },
    {
        // Configure toJSON options for virtual and getter fields included in the JSON
        toJSON: {
            virtuals: true,
            getters: true
        },
        // Disable default "_id" field for this schema
        id: false,
    });
    // Define a virtual field to calculate the reaction count
    thoughtSchema.virtual('reactionCount').get(function () {
        return this.reactions.length;
    });

    
    // Create the Thought model using the thought schema
    const Thought = model('thought', thoughtSchema);

    module.exports = Thought;