const { User, Thought } = require("../models");

const userController = {
    // Get all courses
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
      async createUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(user);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },

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
