NAME=api-gateway

.PHONY: run
run:
	docker compose up

.PHONY: stop
stop:
	docker stop ${NAME}
	docker rm ${NAME}