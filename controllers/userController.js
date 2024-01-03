const { User, Thought } = require("../models");
// Defines userControllers asynchronous methods
const userController = {
        // Get all users with their associated thoughts and friends
    async getUsers(req, res) {
      try {
        const users = await User.find()
        .populate({ path: 'thoughts' })
        .populate({ path: 'friends' })
        res.json(users);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Get a single user by ID with associated thoughts and friends
    async getUser(req, res) {
        try {
          const user = await User.findOne({ _id: req.params.userId })
          .populate({ path: 'thoughts' })
          .populate({ path: 'friends' });
    
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      // Create a new user
      async createUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(user);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },
      // Update user information by their ID
      async updateUser(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      // Delete a user by ID and associated thoughts
      async deleteUser(req, res) {
        try {
          const user = await User.findOneAndDelete({ _id: req.params.userId });
    
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
          }
    
          await Thought.deleteMany({ _id: { $in: user.thoughts } });
          res.json({ message: 'User and thoughts deleted!' });
        } catch (err) {
          res.status(500).json(err);
        }
      },
      // Add a friend to a user's friend list by their IDs
      async addFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId} },
                { runValidators: true, new: true }
            );

            if (!friend) {
                return res.status(404)
                .json({ message: 'No user found with that id'})
            }

            res.json(friend);
        } catch (err) {
            res.status(500).json(err);
        }
      },
      // Delete a friend from a user's friend list by their IDs
      async deleteFriend(req, res) {
        try {
          const friend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId  } },
            { runValidators: true, new: true }
          );
    
          if (!friend) {
            return res.status(404).json({ message: 'No user found with that ID' });
          }
    
          res.json(friend);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    };

    module.exports = userController;
