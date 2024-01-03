
const {Schema, model } = require("mongoose")
// Define the user schema
const userSchema = new Schema (
    {
        // User's username (unique, required, trimmed)
        username: {
            type: String,
            unique: true,
            required:true,
            trim: true,
        },
        // User's email (unique, required, validated with regex)
        email : {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Need to Match email address'], 
        },
        // Array of references to user's thoughts
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
        },
    ],
    // Array of references to user's friends (other users)
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
    ],
},
{
    // Configure toJSON options for virtual fields included in the JSON representation
    toJSON: {
        virtuals: true,
    },
    // Disable default "_id" field for this schema
    id: false,
}
);
// Define a virtual field to calculate the friend count
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
// Create the User model using the user schema
const User = model('user', userSchema);

module.exports = User;