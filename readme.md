# remark-breaks [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

Breaks support, without needing spaces, for [**remark**][remark].

## Installation

[npm][]:

```bash
npm install remark-breaks
```

## Usage

Say we have the following file, `example.md` (note: there’s no spaces after
`a`):

```markdown
This is a
paragraph.
```

And our script, `example.js`, looks as follows:

```javascript
var vfile = require('to-vfile')
var report = require('vfile-reporter')
var unified = require('unified')
var markdown = require('remark-parse')
var remark2rehype = require('remark-rehype')
var html = require('rehype-stringify')
var breaks = require('remark-breaks')

unified()
  .use(markdown)
  .use(breaks)
  .use(remark2rehype)
  .use(html)
  .process(vfile.readSync('example.md'), function(err, file) {
    if (err) throw err
    console.log(String(file))
  })
```

Now, running `node example` yields:

```html
<p>This is a<br>
paragraph.</p>
```

Without `remark-breaks`, you’d get:

```html
<p>This is a
paragraph.</p>
```

## API

### `remark.use(breaks)`

Add support for GitHub style (in issues, pull requests, comments, and releases)
hard breaks without needing spaces before newlines.

## Related

*   [`remark-frontmatter`](https://github.com/remarkjs/remark-frontmatter)
    — Frontmatter (yaml, toml, and more) support
*   [`remark-github`](https://github.com/remarkjs/remark-github)
    — Auto-link references like in GitHub issues, PRs, and comments
*   [`remark-math`](https://github.com/rokt33r/remark-math)
    — Inline and block math

## Contribute

See [`contributing.md` in `remarkjs/remark`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/remarkjs/remark-breaks.svg

[build-status]: https://travis-ci.org/remarkjs/remark-breaks

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-breaks.svg

[coverage-status]: https://codecov.io/github/remarkjs/remark-breaks

[chat-badge]: https://img.shields.io/gitter/room/remarkjs/Lobby.svg

[chat]: https://gitter.im/remarkjs/Lobby

[license]: license

[author]: http://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[remark]: https://github.com/remarkjs/remark

[contributing]: https://github.com/remarkjs/remark/blob/master/contributing.md

[coc]: https://github.com/remarkjs/remark/blob/master/code-of-conduct.md
