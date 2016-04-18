all: build run
	@echo "No default action"

status:
	@docker ps

api-build:
	docker build -t bluepass-api api

api-run:
	docker run -d -p 80:80 -v "`pwd`/api/src":/var/www/html/api --name bluepass-api bluepass-api

api-stop:
	-docker ps | grep bluepass-api && docker stop bluepass-api

api-rm: api-stop
	-docker ps -a | grep bluepass-api && docker rm bluepass-api

api-ip:
	docker inspect --format '{{ .NetworkSettings.IPAddress}}' bluepass-api

api: api-build api-run
