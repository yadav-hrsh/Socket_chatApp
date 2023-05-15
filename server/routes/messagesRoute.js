const {getMessages,addMessage} = require('../controllers/messagesController.js');
const router = require('express').Router();

router.post('/addmsg/',addMessage )
router.post('/getmsg/',getMessages )


module.exports = router;