
const { User, Thought } = require('../models');
// Defines thoughtControllers asynchronous methods
const thoughtController = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a single thought by its ID
    async getThought (req,res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create and associate a new thought with a user
    async createThought (req, res) {
        try {
            const thought = await Thought.create(req.body);

            const user = await User.findByIdAndUpdate(
                req.body.userId,
                { $addToSet: { thoughts: thought._id} },
                { runValidators: true, new: true }
            );

            res.json({ thought, user });
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    // Update a thought by ID
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!'});
            }
            res.json(thought);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    // Delete a thought by its ID
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId, });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(thought);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    // Add a reaction to a thought by its ID
    async addReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true }
            );

            if (!reaction) {
                return res.status(404).json({ message : 'No thought with that ID' });
            }

            res.json(reaction);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    // Delete a reaction from a thought by its ID and reaction ID
    async deleteReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { _id: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if (!reaction) {
                return res.status(404).json({ message: 'No reaction with that ID' });
            }

            res.json(reaction);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
};

module.exports = thoughtController;