
const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs');
// Define the reaction schema
const reactionSchema = new Schema(
    {
        // Unique identifier for the reaction (auto-generated ObjectId)
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        // The body of the reaction (required, limited to 280 characters)
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        // The username of the user who created the reaction (required)
        username: {
            type: String,
            required: true,
        },
        // The creation date of the reaction (defaults to the current date)
        createdAt: {
            type: Date,
            default: Date.now,
            // Custom getter to format the date
            get: createdFormat => dayjs(createdFormat).format('MMM DD, YYYY hh:mm a')
        },
        
    },
    {
        // Configure toJSON options for virtual and getter fields included in the JSON
        toJSON: {
            getters: true
        },
        // Disable default "_id" field for this schema
        id: false
    }
);

    module.exports = reactionSchema;