var Promise = require('bluebird'),
	debug = require('debug')('intent-service'),
	rp = require('request-promise'),
	_ = require('lodash'),
	ApiError = require('../framework/apiError'),
	db = require('../framework/mongoOperations');

/**
 * IntentService module.
 * @module controller/IntentService
 */
var IntentService = module.exports = {
	getAllIntentsOnMessage: getAllIntentsOnMessage,
	getHighConfidenceIntent: getHighConfidenceIntent
};

/**
 * getAllIntentsOnMessage  Using the public inference api find all the possible inference on message
 * @param  string   botId  incoming request object
 * @param  string   message  http response object
 * @return Object   	intents     
 */
function getAllIntentsOnMessage(botId, message) {
	return new Promise(function(resolve, reject) {

		var options = {
			method: 'POST',
			uri: `${process.env.ULTIMATE_AI_PUBLIC_API_URL}/intents`,
			body: {
				botId: botId,
				message: message
			},
			headers: {
				authorization: process.env.ULTIMATE_AI_API_KEY,
				'Content-Type': 'application/json'
			},
			resolveWithFullResponse: true,
			json: true
		};

		rp(options).then(function(apiResponse) {
			return resolve(apiResponse['body']['intents'])
		}).catch(function(err) {
			if (err.statusCode == 400)
				return reject(new ApiError.BadRequest(err.error.text))
			else if (err.statusCode == 404)
				return reject(new ApiError.NotFound(err.error.text))
			else if (err.statusCode == 401)
				return reject(new ApiError.UnAuthorized(err.error.text))
			else
				return reject(err)
		});

	})
}


function getHighConfidenceIntent(intents, confidenceThreshold) {
	let maxConfidenceIntent = _.maxBy(intents, 'confidence');

	if (_.isEmpty(maxConfidenceIntent))
		return {
			"name": 'INTENT_NOT_FOUND'
		}

	if (confidenceThreshold !== undefined) {
		if (maxConfidenceIntent['confidence'] >= confidenceThreshold)
			return maxConfidenceIntent
		else
			return {
				"name": 'INTENT_NOT_FOUND'
			}
	} else {
		return maxConfidenceIntent
	}

}