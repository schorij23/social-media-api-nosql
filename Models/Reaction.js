
const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs');
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdFormat => dayjs(createdFormat).format('MMM DD, YYYY hh:mm a')
        },
        
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

    module.exports = reactionSchema;