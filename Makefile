VERSION=latest
PROJECT_NAME=sample-app
CONTAINER=gcr.io/harness-test-338118/$(PROJECT_NAME):$(VERSION)

build-push: build push

build:
	docker build . \
		-t $(CONTAINER)

push:
	docker push $(CONTAINER)

.PHONY: build push build-push
