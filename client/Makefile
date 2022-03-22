REPOSITORY := globo-challenge-client
COMMAND := yarn start
VERSION := 1.0

build:
	docker build -t ${REPOSITORY}:${VERSION} .

run:
	docker run --rm -it -v ${PWD}:/var/www/app/current ${REPOSITORY}:${VERSION} ${COMMAND}

up:
	docker run --rm -d -it -v ${PWD}:/var/www/app/current -p 127.0.0.1:3000:3000 --name ${REPOSITORY} ${REPOSITORY}:${VERSION}

down:
	docker kill globo-challenge-client
