REPOSITORY := globo-challenge-api
COMMAND := /bin/bash
VERSION := 1.0

build:
	docker build -t ${REPOSITORY}:${VERSION} .

run:
	docker run --rm -it -v ${PWD}:/var/www/app/current ${REPOSITORY}:${VERSION} ${COMMAND}

sidekiq:
	docker run --rm -it -v ${PWD}:/var/www/app/current ${REPOSITORY}:${VERSION} bundle exec sidekiq

up:
	docker run --rm -d -it -v ${PWD}:/var/www/app/current -p 127.0.0.1:3000:3000 --name ${REPOSITORY} ${REPOSITORY}:${VERSION}

down:
	docker kill calendar-api
