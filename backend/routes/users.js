const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const mobile = req.body.mobile;

    const newUser = new User({ firstName, lastName, email, mobile });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (req.body.hasOwnProperty('firstName')) {
                user.firstName = req.body.firstName;
            }
            if (req.body.hasOwnProperty('lastName')) {
                user.lastName = req.body.lastName;
            }
            if (req.body.hasOwnProperty('email')) {
                user.email = req.body.email;
            }
            if (req.body.hasOwnProperty('mobile')) {
                user.mobile = req.body.mobile;
            }


            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;