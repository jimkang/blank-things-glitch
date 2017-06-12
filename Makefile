include .env

run:
	TWITTER_CONSUMER_KEY=$(TWITTER_CONSUMER_KEY) \
	TWITTER_CONSUMER_SECRET=$(TWITTER_CONSUMER_SECRET) \
	TWITTER_ACCESS_TOKEN=$(TWITTER_ACCESS_TOKEN) \
	TWITTER_ACCESS_TOKEN_SECRET=$(TWITTER_ACCESS_TOKEN_SECRET) \
	node post-everyword-tweet.js

split-all-words-file:
	split -l 5000 data/words.txt data/words.txt.part-

TEXTFILES = $(shell ls data/words.txt.part*)

template-offsets:
	@$(foreach TEXTFILE, $(TEXTFILES), \
		node node_modules/.bin/get-file-line-offsets-in-json $(TEXTFILE) > \
		$(TEXTFILE)-lineoffsets.json \
		;)

pushall:
	git push origin master
