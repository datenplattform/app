#CONFIGURATION
export PROJECT_IP = 127.0.0.1
export PROJECT_DOMAIN = report-generator.simplicity.dev
export PROJECT_NAME   = report-generator
export SHELL = bash
export DATABASE_HOST = report-generator-database
export DATABASE_PORT = 5432

#xdebug
export HOST_IP = $(shell tools/print-host-ip.sh)
export HOST_PORT = 9000

#DOCKER COMPOSE SETTINGS
export POSTGRES_PASSWORD = pass
export POSTGRES_USER = report-generator
export POSTGRES_DB = report-generator
export PHP_IDE_CONFIG = serverName=${PROJECT_DOMAIN}

#DOCKER
DOCKER = docker
DOCKER_COMPOSE = docker-compose
CLI = $(DOCKER_COMPOSE) exec -T ${PROJECT_NAME}
CONSOLE = $(CLI) ./vendor/bin/conole

#COLORS
GREEN  := $(shell tput -Txterm setaf 2)
WHITE  := $(shell tput -Txterm setaf 7)
YELLOW := $(shell tput -Txterm setaf 3)
RESET  := $(shell tput -Txterm sgr0)

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
# A category can be added with @category
HELP_FUN = \
        %help; \
        while(<>) { push @{$$help{$$2 // 'options'}}, [$$1, $$3] if /^([a-zA-Z\-]+)\s*:.*\#\#(?:@([a-zA-Z\-]+))?\s(.*)$$/ }; \
        print "usage: make [target]\n\n"; \
        for (sort keys %help) { \
        print "${WHITE}$$_:${RESET}\n"; \
        for (@{$$help{$$_}}) { \
        $$sep = " " x (32 - length $$_->[0]); \
        print "  ${YELLOW}$$_->[0]${RESET}$$sep${GREEN}$$_->[1]${RESET}\n"; \
        }; \
        print "\n"; }

help: ##@other Show this help
	@perl -e '$(HELP_FUN)' $(MAKEFILE_LIST)
.PHONY: help

start: ##@development start project
	@sh tools/create-socat-socket.sh
	$(DOCKER_COMPOSE) pull
	$(DOCKER_COMPOSE) up -d
.PHONY: start

stop: ##@development stop project
	$(DOCKER_COMPOSE) stop
.PHONY: stop

down: ##@development delete project container
	$(DOCKER_COMPOSE) down
.PHONY: down

ps: ##@development show running container
	$(DOCKER_COMPOSE) ps
.PHONY: ps

build: ##@development will rebuild all containers for the project
	@$(DOCKER) run -v "${PWD}/../:/var/www/html" docker-registry.simplicity.ag/sl-php-7.1-fpm-dev:0.0.1 /bin/sh -c "composer config --global --auth http-basic.repo.packagist.com token ${PACKAGIST_TOKEN} && composer install --no-progress"
	$(DOCKER) build -t docker-registry.simplicity.ag/${PROJECT_NAME}:development -f ../devops/kubernetes/images/Dockerfile ..
	$(DOCKER) push docker-registry.simplicity.ag/${PROJECT_NAME}:development
.PHONY: build

logs: ##@development show server logs
	$(DOCKER_COMPOSE) logs -f
.PHONY: logs

cli: ##@development get shell
	$(DOCKER_COMPOSE) exec ${PROJECT_NAME} $(SHELL)
.PHONY: cli

composer-install: start ##@development run composer install
	$(CLI) composer config --global --auth http-basic.repo.packagist.com token $(PACKAGIST_TOKEN)
	$(CLI) composer install --ansi
.PHONY: composer-install

setup: ##@development configure development environment
	grep -q -F "${PROJECT_IP} ${PROJECT_DOMAIN}" /etc/hosts || sudo sh -c "echo '${PROJECT_IP} ${PROJECT_DOMAIN}' >> /etc/hosts"
	$(CLI) /bin/sh -c "sed -i '/remote_host/d' /etc/php/conf.d/xdebug.ini"
	$(CLI) /bin/sh -c "echo xdebug.remote_host=$(HOST_IP) >> /etc/php/conf.d/xdebug.ini"
	$(DOCKER_COMPOSE) exec ${PROJECT_NAME}-http /bin/sh -c "sed -i 's/keepalive_timeout 60/keepalive_timeout 600/g' /etc/nginx/nginx.conf"
	$(DOCKER_COMPOSE) exec ${PROJECT_NAME}-http /bin/sh -c "grep -q -F \"fastcgi_read_timeout\" /etc/nginx/fastcgi_params || echo \"fastcgi_read_timeout 600;\" >> /etc/nginx/fastcgi_params"
	$(DOCKER_COMPOSE) restart ${PROJECT_NAME}-http
	$(DOCKER_COMPOSE) restart ${PROJECT_NAME}
.PHONY: setup

tests: ##@testing run all tests
	@$(MAKE) fast-tests
.PHONY: tests

fast-tests: ##@ run fast tests (30s allowed per test group)
	$(CLI) sh -c "timeout 30 find public src | grep \\.php | xargs -L 1 php -l"
	$(CLI) sh -c "if [ -f phpunit.xml ]; then echo \"using phpunit.xml\"; else cp phpunit.xml.dist phpunit.xml; fi && timeout 30 phpunit phpunit.xml"
	$(CLI) sh -c "timeout 30 phpmd public,src text codesize cleancode design naming unusedcode"
	$(CLI) sh -c "timeout 30 phpcs public src"
	$(CLI) sh -c "timeout 30 phpcbf public"
	$(CLI) sh -c "timeout 30 phpcbf src"
.PHONY: fast-tests

check-host-ip: ##@other check host ip
	@sh tools/print-host-ip.sh
.PHONY: check-host-ip

clean: down ##@other clean up project (docker images and settings)
	@[[ -z `$(DOCKER) images -q docker_${PROJECT_NAME}` ]] || $(DOCKER) rmi docker_${PROJECT_NAME}
	@[[ -z `$(DOCKER) images -q --filter dangling=true` ]] || $(DOCKER) rmi `$(DOCKER) images --filter dangling=true --quiet`
	@[[ -z `$(DOCKER) images | grep "^<none>"` ]] || $(DOCKER) rmi `docker images | grep "^<none>" | awk "{print $3}"`
	@sudo sed -i '' "/${PROJECT_NAME}/d" /etc/hosts
.PHONY: clean

restore-database: ##@restores the database with data from migration
	$(DOCKER_COMPOSE) exec ${PROJECT_NAME} php vendor/bin/doctrine orm:schema-tool:drop --force
	$(DOCKER_COMPOSE) exec ${PROJECT_NAME} php vendor/bin/doctrine orm:schema-tool:update --force
.PHONY: database-restore