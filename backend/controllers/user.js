const bcryprt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/user');

exports.createUser = (req, res, next) => {
    console.log(req.body)
    bcryprt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
                preName: req.body.preName,
                name: req.body.name,
                score: req.body.score
            });
            user.save().then(result => {
                res.status(201).json({
                    message: 'User Created',
                    result: result
                })
            }).catch(error => {
                console.log(error);
                res.status(500).json({
                    error: error
                })
            });
        });
}

exports.userLogin = (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Auth Failed'
                })
            }
            fetchedUser = user;
            return bcryprt.compare(req.body.password, user.password)
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: 'Auth Failed'
                })
            }
            const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id },
                'secret_web_token_for_full_stack_development',
                { expiresIn: '1h'}
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({
                message: 'Auth Failed'
            })
        })
}