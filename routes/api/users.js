const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { body, validationResult} = require('express-validator');

const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route    POST api/users
// @desc     Sign Up user
// @access   Public
router.post(
    '/',
    body('name', 'Name is required').trim().notEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').trim().isLength({ min: 6 }),
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { name, email, password } = req.body;

            let user = await User.findOne({ email });

            if(user) {
                return res.status(400).json({ error: { msg: 'User already exists' }});
            }

            user = new User ({
                name,
                email, 
                password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            
            await user.save();
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '30 days' },
                (err, token) => {
                    if(err) throw err;
                    res.json({ token });
                }
            )
        } catch(err) {
            console.log(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route    GET api/users
// @desc     Get user by token
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }

});

// @route    POST api/users/login
// @desc     Authenticate user and & get token
// @access   public
router.post('/login',
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ error: { msg: 'Invalid Credentials' }});
        }

        try {
            const  {email, password } = req.body;
            const user = await User.findOne({ email });
            if(!user) {
                return res.status(400).json({ error: { msg: 'Invalid Credentials' }});
            }

            const isMatched = await bcrypt.compare(password, user.password);
            if(!isMatched) {
                return res.status(400).json({ error: { msg: 'Invalid Credentials' }});
            }

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '30 days' },
                (err, token) => {
                    if(err) throw err;
                    res.json({ token });
                }    
            );
        } catch(err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;