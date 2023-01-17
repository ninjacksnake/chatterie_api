const { register, login, setAvatar, getContacts } = require('../controllers/userController');

const router = require('express').Router();

router.post('/register', register)
router.post('/login', login);
router.post('/setAvatar/:id', setAvatar);
router.get(`/users/:id`, getContacts);
router.get(`/users`, getContacts);



module.exports = router; 