## AI Chat Bot API Server Setup

####Code Challenge Software Prerequisities:
1. Docker Installation, check docker installation guide here https://docs.docker.com/engine/install/
2. Install make: Run this command in your macOS:  `brew install make`
 
#### Code setup
1. Clone the Repository:  `git clone https://github.com/Aashish-1008/AIChatBotService.git`
2. Change the current directory to AIChatBotService:  `cd AIChatBotService/`

#### How to Run the tests 
Run command: `make test`

#### How to Start the api-server 
Run command: `make ai-assistant-api-server-up`

#### How to Stop the api-server 
Run command: `make ai-assistant-api-server-up`

Please Note: It might take a while starting the server and running the test cases for the firsttime. The make command will build the docker image locally for the first time.


