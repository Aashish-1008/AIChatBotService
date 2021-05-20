const express = require('express'),
	bodyParser = require('body-parser'),
	ReplyRouter = require('./routes/reply'),
	Database = require('./framework/database'),
	handleErrors = require('./framework/handleErrors');

var app = express();

//instantiate database connection
Database.init({
	"dbURI": `mongodb://${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
	"clientOptions": {
		"socketTimeoutMS": 30000,
		"keepAlive": true,
		"reconnectTries": 1000,
		"reconnectInterval": 200,
		"wtimeout": 100000,
		"useNewUrlParser": true,
		"autoReconnect": true
	}
});

// setting up the intent reply data to mongodb collection 'intentReply'
require('./app-data-setup')


// setting up app middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));


// routing
app.use('/api/chat-rooms/:chat_room_id', ReplyRouter);


// error handling
app.use(handleErrors)

app.listen(process.env.SERVER_PORT, () => {
	console.log(`Server running at the port : ${process.env.SERVER_PORT}`);
})

module.exports = app