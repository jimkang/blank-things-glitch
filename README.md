blank-things-glitch
==================

A bot in the style of @ghost_things that runs on Glitch. That is, it gets a random noun, then makes a phrase (like ghost <noun>), then posts it.

Installation
------------

To make your own @<something>_things bot:

- `Remix` this repo on Glitch.
- [Get a Wordnik API key.](http://developer.wordnik.com/#!/faq)
- Add the following line to your `.env` file:

    WORDNIK_KEY=<Your Wordnik API key>

- If it's going to be on Mastodon:
  - Create a new Mastodon account.
  - Use [Darius Kazemi's Mastodon registration tool](https://tinysubversions.com/notes/mastodon-bot/) to get a Mastodon access token.
  - Add the following lines to your `.env` file:

    MASTODON_ACCESS_TOKEN=<your Mastodon access token>
    MASTODON_API_URL="https://<your Mastodon instance>/api/v1/" (e.g. https://botsin.space/api/v1/)

- If it's going to be on Twitter:
  - Create a new Twitter account.
  - Use either [Twitter dev web site](https://gist.github.com/jimkang/34d16247b40097d8cace) or [v21's OAuth dance app](http://v21.io/iwilldancetheoauthdanceforyou/) or, if you know what it is, [use twurl](https://gist.github.com/jimkang/873c2434cb893baa3675) to get a Twitter consumer key, consumer secret, access token, and access token secret.
  - Add the following lines to your `.env` file:

    TWITTER_CONSUMER_KEY=<your twitter consumer key>
    TWITTER_CONSUMER_SECRET=<your twitter consumer secret>
    TWITTER_ACCESS_TOKEN=<your twitter access token>
    TWITTER_ACCESS_TOKEN_SECRET=<your twitter access token secret>

- Edit the part of `blank-things-server.js` that creates a phrase from the random noun, then `getPhrase` function:

    function getPhrase(word) {
      var capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
      return capitalizedWord + '-Industrial Complex';
    }

  e.g. If you wanted to make a "weird <thing>" bot, you could change it to:

    function getPhrase(word) {
      return 'weird ' + word;
    }

  And it would post things like 'weird doctors and 'weird abdicator`.

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
