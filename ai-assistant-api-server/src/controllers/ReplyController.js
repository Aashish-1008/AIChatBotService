var Promise = require('bluebird'),
	debug = require('debug')('reply-controller'),
	db = require('../framework/mongoOperations'),
	_ = require('lodash'),
	IntentService = require('../service/IntentService'),
	ApiError = require('../framework/apiError'),
	ReplyMessageService = require('../service/ReplyMessageService');

/**
 * ReplyController module.
 * @module controller/ReplyController
 */
var ReplyController = module.exports = {
	reply: reply
};

/**
 * reply  returns a single reply corresponding to the highest predicted intent above the confidence threshold]
 * @param  object   req  incoming request object
 * @param  object      res  http response object
 * @return object   reply to input messages      
 */
function reply(req, res, next) {

	let reqPayload = req.body,
		reqParams = req.params;


	// 1. validate the incoming request data
	if (_.isEmpty(reqPayload['message'])) {
		throw new ApiError.BadRequest("Missing 'message' parameters")
		return
	}

	// 2. Using publicly available api find the right intent for the message
	IntentService.getAllIntentsOnMessage(reqParams['botId'], reqPayload['message']).then(function(intents) {
		// 3. find the intent with high confidence and which is above the confidence Threshold	
		const intent = IntentService.getHighConfidenceIntent(intents, reqPayload['confidenceThreshold'])

		// 4. Find the reply message from the database for the high confidence inferred intent.   
		return ReplyMessageService.getReplyMessage(intent)

	}).then(function(reply) {
		res.send(reply)
	}).catch(next)

}