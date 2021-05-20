## AI Chat Bot API Server

### Software Prerequisites:
1. Docker Installation, check docker installation guide here https://docs.docker.com/engine/install/
2. Install make: Run this command in your macOS:  `brew install make`
 
### Code setup
1. Clone the Repository:  `git clone https://github.com/Aashish-1008/AIChatBotService.git`
2. Change the current directory to AIChatBotService:  `cd AIChatBotService/`


Please Note: Make sure you are in `AIChatBotService` directory to run below commands.

### How to Run the tests

Run command: `make test`

### How to Start the api-server 

Run command: `make ai-assistant-api-server-up`

### How to Stop the api-server 

Run command: `make ai-assistant-api-server-up`

Please Note: It might take a while starting the server and running the test cases for the firsttime. The make command will build the docker image locally for the first time.


### How to call Chatbot reply api

Make Sure ai-assistant-api-server up and running.

##### Using Postman

1. Import the collection `ChatBotApiCollection.postman_collection.json` file into postman. This file can be found under `AIChatBotService/postman` folder.
2. Once Postman collection will be imported, it will list down the "POST ChatBot Reply" API. Call the api from Postman.

##### Using curl

1. Open the terminal
2. Run this command `curl --location --request POST 'localhost:3000/api/chat-rooms/chat_room_id/bots/5f74865056d7bb000fcd39ff/reply' --header 'Content-Type: application/json' --data-raw '{
    "message": "Hello !!",
    "confidenceThreshold": 0.5
}'`
