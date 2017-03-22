# build mkdocs and deploy to Github Page
doc:
	mkdocs gh-deploy

dev:
	./build-dev.sh

prod:
	./build.sh

