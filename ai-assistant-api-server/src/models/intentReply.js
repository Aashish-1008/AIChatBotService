const mongoose = require('mongoose');

var intentReplySchema = mongoose.Schema({
    _id: {
        type: String
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    trainingData: {
        messages: [{
            id: {
                type: String,
                required: true,
            },
            text: {
                type: String,
                required: true,
            }
        }]
    },
    reply: {
        id: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        }
    }
});


mongoose.model('intentReply', intentReplySchema, 'intentReply');