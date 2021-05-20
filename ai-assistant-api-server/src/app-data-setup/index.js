var Promise = require('bluebird'),
debug = require('debug')('app-data-setup'),
	db = require('../framework/mongoOperations'),
	IntentReplyData = require('./intent_reply_examples.json');


// setting up the intent_reply data into mongo 'intentReply' collection	


db.bulkInsert('intentReply', IntentReplyData).then(function(IntentReplyDocuments) {
	console.log(`Intent reply data set up done, ${IntentReplyData.length} documents added. `)
}).catch(function(err){
	console.log("problem occurred while setting up intent reply app data.")
	console.log(err)
})