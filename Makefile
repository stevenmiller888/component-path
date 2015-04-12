
default: node_modules

test: node_modules
	@./node_modules/.bin/mocha test \
		--reporter spec

node_modules: package.json
	@npm install

.PHONY: test