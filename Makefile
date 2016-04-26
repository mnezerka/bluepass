
dockerBuild= \
	echo "Building docker ${1} from directory ${2}"; \
	docker build -t ${1} ${2}

dockerStop= \
	echo "Stopping docker ${1}"; \
	if docker ps | grep -q ${1}; then \
		docker stop ${1}; fi

dockerStart= \
	echo "Starting docker ${1}"; \
	docker run -d --name ${1} ${2} ${1}

dockerRemove= \
	echo "Removing docker ${1}"; \
	if docker ps -a | grep -q ${1}; then \
		docker -l=fatal rm ${1}; fi

all: build run
	@echo "No default action"

status:
	@docker ps

api-build:
	@$(call dockerBuild,bluepass-api,api)

api-run:
	@$(call dockerStart,bluepass-api,-p 80:80 -v "`pwd`/api/src":/var/www/html/api)

api-stop:
	@$(call dockerStop,bluepass-api)

api-rm: api-stop
	@$(call dockerRemove,bluepass-api)

api-ip:
	docker inspect --format '{{ .NetworkSettings.IPAddress}}' bluepass-api

api: api-build api-run

app-build:
	@$(call dockerBuild,bluepass-app,app)

app-run:
	@$(call dockerStart,bluepass-app,-p 8081:8081 -v "`pwd`/app":/app)

app-stop:
	@$(call dockerStop,bluepass-app)

app-rm: app-stop
	@$(call dockerRemove,bluepass-app)

app-ip:
	docker inspect --format '{{ .NetworkSettings.IPAddress}}' bluepass-app

app: app-build app-run

app-install:
	docker exec bluepass-app bash -c "cd /app && npm install"

app-watch:
	docker exec bluepass-app bash -c "cd /app && gulp watch"

