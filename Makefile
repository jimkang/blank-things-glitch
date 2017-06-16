include .env

run:
	TWITTER_CONSUMER_KEY=$(TWITTER_CONSUMER_KEY) \
	TWITTER_CONSUMER_SECRET=$(TWITTER_CONSUMER_SECRET) \
	TWITTER_ACCESS_TOKEN=$(TWITTER_ACCESS_TOKEN) \
	TWITTER_ACCESS_TOKEN_SECRET=$(TWITTER_ACCESS_TOKEN_SECRET) \
	node post-everyword-tweet.js

try-get-phrase:
	WORDNIK_KEY=$(WORDNIK_KEY) node tools/try-get-phrase.js

pushall:
	git push origin master
