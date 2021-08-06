# remark-breaks

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**remark**][remark] plugin to add break support, without needing spaces.

## Note!

This plugin is ready for the new parser in remark
([`micromark`](https://github.com/micromark/micromark),
see [`remarkjs/remark#536`](https://github.com/remarkjs/remark/pull/536)).
A patch version was released (`2.0.1`) that works with old and new remark.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

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

And our module, `example.js`, looks as follows:

```js
import {readSync} from 'to-vfile'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkBreaks from 'remark-breaks'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

const file = readSync('example.md')

unified()
  .use(remarkParse)
  .use(remarkBreaks)
  .use(remarkRehype)
  .use(rehypeStringify)
  .process(file)
  .then((file) => {
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

This package exports no identifiers.
The default export is `remarkBreaks`.

### `unified().use(remarkBreaks)`

Plugin to add break support without needing spaces.
This adds support for GitHub style (in issues, pull requests, comments, and
releases) hard breaks without needing spaces before newlines.

## Security

Use of `remark-breaks` does not involve [**rehype**][rehype] ([**hast**][hast])
or user content so there are no openings for [cross-site scripting (XSS)][xss]
attacks.

## Related

*   [`remark-gfm`](https://github.com/remarkjs/remark-gfm)
    — GitHub Flavored Markdown
*   [`remark-github`](https://github.com/remarkjs/remark-github)
    — Auto-link references like in GitHub issues, PRs, and comments
*   [`remark-footnotes`](https://github.com/remarkjs/remark-footnotes)
    — Footnotes
*   [`remark-frontmatter`](https://github.com/remarkjs/remark-frontmatter)
    — Frontmatter (YAML, TOML, and more) support
*   [`remark-math`](https://github.com/remarkjs/remark-math)
    — Math

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

[build-badge]: https://github.com/remarkjs/remark-breaks/workflows/main/badge.svg

[build]: https://github.com/remarkjs/remark-breaks/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-breaks.svg

[coverage]: https://codecov.io/github/remarkjs/remark-breaks

[downloads-badge]: https://img.shields.io/npm/dm/remark-breaks.svg

[downloads]: https://www.npmjs.com/package/remark-breaks

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-breaks.svg

[size]: https://bundlephobia.com/result?p=remark-breaks

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[remark]: https://github.com/remarkjs/remark

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[rehype]: https://github.com/rehypejs/rehype

[hast]: https://github.com/syntax-tree/hast
