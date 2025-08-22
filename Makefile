NAME=api-gateway

.PHONY: run
run:
	# docker image inspect ${NAME} > /dev/null 2>&1 || docker build -t ${NAME} .
	docker compose up

.PHONY: stop
stop:
	docker stop ${NAME}
	docker rm ${NAME}