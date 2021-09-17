const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const Todo = require('../../models/Todo');

const formatDate = (date) => {
    const splitDate = date.split('-');
    
    const day = splitDate[2];
    const month = splitDate[1];
    const year = splitDate[0];

    return day + '-' + month + '-' + year;
};

// @route    POST api/todos
// @desc     Create a todo
// @access   Private    
router.post(
    '/', 
    auth, 
    body('text', 'Text is required').trim().notEmpty(),
    body('date', 'Please enter a valid date in YYYY-MM-DD format').isDate(),
    body('time', 'Please enter a valid time in HH:MM format').matches(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/),
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { text, date, time } = req.body;
            
            const todo = new Todo({
                user: req.user.id,
                text,
                date: formatDate(date), 
                time
            });

            await todo.save();
            res.status(201).json({ todo });

        } catch(err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    GET api/todos
// @desc     Get all todos of a user
// @access   Private    
router.get('/', auth, async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id });
        if(!todos) {
            return res.status(404).json({ msg: 'Todos not found' });
        }
        res.json({ todos });
        
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    DELETE api/todos/:date
// @desc     Delete all todos at a date
// @access   Private
router.delete('/:date', auth, async (req, res) => {
    try {
        const result = await Todo.deleteMany({ user: req.user.id, date: req.params.date });
        if(!result.n) {
            return res.status(404).json({ msg: 'Todos not found' });
        }
        res.json({ result });
    
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    DELETE api/todos/:id
// @desc     Delete a todo by id
// @access   Private
router.delete('/todo/:id', auth, async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id });
        if(!todo) {
            return res.status(404).json({ msg: 'No todo found' });
        }
        res.json({ todo });

    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    PATCH api/todos/:date
// @desc     Update complete field of all todos
// @access   Private
router.patch('/:date', auth, async (req, res) => {
    try {
        const result = await Todo.updateMany(
            { user: req.user.id, date: req.params.date }, 
            { completed: true }
        );
        if(!result.n) {
            return res.status(404).send({ msg: 'Todos not found' });
        }
        res.json({ result });

    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    PATCH api/todos/:id
// @desc     Update complete field of a todo
// @access   Private
router.patch('/todo/:id', auth, async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if(!todo) {
            return res.status(404).json({ msg: 'No todo found' });
        }

        todo.completed = !todo.completed;
        await todo.save();

        res.json({ todo });

    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;