PROJECT = antoniodiaz_frontend

BASE = docker-compose.base.yml
NODE_ENV_DEVELOPMENT  = docker-compose.dev.yml
NODE_ENV_PRODUCTION = docker-compose.prod.yml

start-dev:
	docker compose -p $(PROJECT) -f $(BASE) -f $(NODE_ENV_DEVELOPMENT) up --build

down-dev:
	docker compose -p $(PROJECT) -f $(BASE) -f $(NODE_ENV_DEVELOPMENT) down -v

start-prod:
	docker compose --env-file /dev/null -p $(PROJECT) -f $(BASE) -f $(NODE_ENV_PRODUCTION) up -d --build

down:
	docker compose -p $(PROJECT) down

logs:
	docker compose -p $(PROJECT) logs -f client
