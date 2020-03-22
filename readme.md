# remark-breaks

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**remark**][remark] plugin to add break support, without needing spaces.

## Install

[npm][]:

```sh
npm install remark-breaks
```

## Use

Say we have the following file, `example.md` (note: there are no spaces after
`a`):

```markdown
This is a
paragraph.
```

And our script, `example.js`, looks as follows:

```js
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

### `remark().use(breaks)`

Plugin to add break support without needing spaces.
This adds support for GitHub style (in issues, pull requests, comments, and
releases) hard breaks without needing spaces before newlines.

## Security

Use of `remark-breaks` does not involve [**rehype**][rehype] ([**hast**][hast])
or user content so there are no openings for [cross-site scripting (XSS)][xss]
attacks.

## Related

*   [`remark-frontmatter`](https://github.com/remarkjs/remark-frontmatter)
    — Frontmatter (yaml, toml, and more) support
*   [`remark-github`](https://github.com/remarkjs/remark-github)
    — Auto-link references like in GitHub issues, PRs, and comments
*   [`remark-math`](https://github.com/rokt33r/remark-math)
    — Inline and block math

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/remarkjs/remark-breaks/master.svg

[build]: https://travis-ci.org/remarkjs/remark-breaks

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-breaks.svg

[coverage]: https://codecov.io/github/remarkjs/remark-breaks

[downloads-badge]: https://img.shields.io/npm/dm/remark-breaks.svg

[downloads]: https://www.npmjs.com/package/remark-breaks

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-breaks.svg

[size]: https://bundlephobia.com/result?p=remark-breaks

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/remark

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/master/contributing.md

[support]: https://github.com/remarkjs/.github/blob/master/support.md

[coc]: https://github.com/remarkjs/.github/blob/master/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[remark]: https://github.com/remarkjs/remark

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[rehype]: https://github.com/rehypejs/rehype

[hast]: https://github.com/syntax-tree/hast
