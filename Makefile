
dockerStop= \
	echo "Building docker ${1} from directory ${2}"; \
	docker build -t ${1} ${2}

dockerStop= \
	echo "Stopping docker ${1}"; \
	if docker ps | grep ${1}; then \
		docker stop ${1}; fi

dockerStart= \
	echo "Starting docker ${1}"; \
	docker run -d -p 80:80 -v "`pwd`/api/src":/var/www/html/api --name ${1} ${1}

dockerRemove= \
	echo "Removing docker ${1}"; \
	if docker ps -a | grep ${1}; then \
		docker rm bluepass-api; fi

all: build run
	@echo "No default action"

status:
	@docker ps

api-build:
	@$(call dockerBuild,bluepass-api,api)

api-run:
	@$(call dockerStart,bluepass-api)

api-stop:
	@$(call dockerStop,bluepass-api)

api-rm: api-stop
	@$(call dockerRemove,bluepass-api)

api-ip:
	docker inspect --format '{{ .NetworkSettings.IPAddress}}' bluepass-api

api: api-build api-run
