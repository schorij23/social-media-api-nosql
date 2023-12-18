
const { Thought, User } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        }catch (err) {
            res.status(500).json(err);
        }
    },

    async getThought (req,res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

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

    async addReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughId },
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

    async deleteReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughId },
                { $pull: { reactions: { _id: req.params. reactionId } } },
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