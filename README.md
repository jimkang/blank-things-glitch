everyword-glitch
==================

An everyword-style bot that runs on Glitch.

Installation
------------

Clone this repo.

You need to set up .env with the following for instant-bot to work:

TWITTER_CONSUMER_KEY=<your twitter consumer key>
TWITTER_CONSUMER_SECRET=<your twitter consumer secret>
TWITTER_ACCESS_TOKEN=<your twitter access token>
TWITTER_ACCESS_TOKEN_SECRET=<your twitter access token secret>

MASTODON_ACCESS_TOKEN=<your Mastodon access token>
MASTODON_API_URL="https://<your Mastodon instance></your>api/v1/"

Check out https://www.npmjs.com/package/instant-bot for more details.

Also, this is really helpful for getting your Mastodon access token: https://tinysubversions.com/notes/mastodon-bot/

Usage
-----

To run it on a conventional computer, fill out .env, then do:

    make run

License
-------

The MIT License (MIT)

Copyright (c) 2017 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.