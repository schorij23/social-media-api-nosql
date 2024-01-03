
const router = require('express').Router();
// Import thoughtController functions for handling requests
const {
    getThoughts,
    getThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');
// GET all thoughts and POST a new thought
router.route('/').get(getThoughts).post(createThought);
// GET a single thought, PUT a thought, and DELETE a thought by ID
router
.route('/:thoughtId')
.get(getThought)
.put(updateThought)
.delete(deleteThought);
// POST a reaction to a thought by ID
router.route('/:thoughtId/reactions').post(addReaction);
// DELETE a reaction by ID from a thought by ID
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
// Export the router configuration for use in the application
module.exports = router;