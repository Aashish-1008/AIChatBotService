DC-BASE = docker-compose.yml

ai-assistant-api-server-up: 
	docker-compose -f $(DC-BASE) build;
	docker-compose -f $(DC-BASE) up;

ai-assistant-api-server-down: 
	docker-compose -f $(DC-BASE) down	

test:
	docker-compose -f $(DC-BASE) down; 
	docker-compose -f $(DC-BASE) build;
	docker-compose -f $(DC-BASE) up -d;
	echo "Spinning up the api and db server...."
	sleep 45; 
	docker exec -it "ai-assistant-api-server" sh -c "npm test";
	docker-compose -f $(DC-BASE) down;
