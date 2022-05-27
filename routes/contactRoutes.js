const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const {
    addcontact, getcontact, updatecontact, getcontactbyid, deletecontact
} = require('../controller/contactcontroller');

router.post('/', auth, addcontact);
router.get('/', auth, getcontact);
router.get('/:id', auth, getcontactbyid);
router.put(`/:id`, auth, updatecontact);
router.delete(`/:id`, auth, deletecontact);


module.exports = router;