# remark-breaks [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

Breaks support, without needing spaces, for [**remark**][remark].

## Installation

[npm][]:

```bash
npm install remark-breaks
```

## Usage

Say we have the following file, `example.md`:

```markdown
This is a
paragraph.
```

And our script, `example.js`, looks as follows:

```javascript
var vfile = require('to-vfile');
var report = require('vfile-reporter');
var unified = require('unified');
var markdown = require('remark-parse');
var remark2rehype = require('remark-rehype');
var html = require('rehype-stringify');
var breaks = require('remark-breaks');

unified()
  .use(markdown)
  .use(breaks)
  .use(remark2rehype)
  .use(html)
  .process(vfile.readSync('example.md'), function (err, file) {
    if (err) throw err;
    console.log(String(file));
  });
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

Add support for GitHub style (in comments) hard breaks without needing
spaces before newlines.

## Related

*   [`remark-github`](https://github.com/wooorm/remark-github)
    — Auto-link references like in GitHub issues, PRs, and comments

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/wooorm/remark-breaks.svg

[build-status]: https://travis-ci.org/wooorm/remark-breaks

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/remark-breaks.svg

[coverage-status]: https://codecov.io/github/wooorm/remark-breaks

[chat-badge]: https://img.shields.io/gitter/room/wooorm/remark.svg

[chat]: https://gitter.im/wooorm/remark

[license]: LICENSE

[author]: http://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[remark]: https://github.com/wooorm/remark
