const express = require('express'),
	 router = express.Router(),
	 ReplyController = require('../controllers/ReplyController');

router.post('/bots/:botId/reply', ReplyController.reply);

module.exports = router;