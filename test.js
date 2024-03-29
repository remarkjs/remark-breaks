import assert from 'node:assert/strict'
import test from 'node:test'
import rehypeStringify from 'rehype-stringify'
import remarkBreaks from 'remark-breaks'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'

test('remarkBreaks', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('remark-breaks')).sort(), [
      'default'
    ])
  })
})

test('fixtures', async function (t) {
  const fixtures = [
    {
      in: 'This is a\nparagraph.',
      out: '<p>This is a<br>\nparagraph.</p>',
      name: 'no space'
    },
    {
      in: 'This is a \nparagraph.',
      out: '<p>This is a<br>\nparagraph.</p>',
      name: 'one space'
    },
    {
      in: 'This is a  \nparagraph.',
      out: '<p>This is a<br>\nparagraph.</p>',
      name: 'two spaces'
    },
    {
      in: 'This is a   \nparagraph.',
      out: '<p>This is a<br>\nparagraph.</p>',
      name: 'three spaces'
    },
    {
      in: 'This is a\rparagraph.',
      out: '<p>This is a<br>\nparagraph.</p>',
      name: 'carriage return'
    },
    {
      in: 'This is a\r\nparagraph.',
      out: '<p>This is a<br>\nparagraph.</p>',
      name: 'carriage return + line feed'
    },
    {
      in: 'After *phrasing*\nmore.',
      out: '<p>After <em>phrasing</em><br>\nmore.</p>',
      name: 'after phrasing'
    },
    {
      in: 'Before\n*phrasing*.',
      out: '<p>Before<br>\n<em>phrasing</em>.</p>',
      name: 'before phrasing'
    },
    {
      in: 'Mul\nti\nple.',
      out: '<p>Mul<br>\nti<br>\nple.</p>',
      name: 'multiple'
    },
    {
      in: 'None.',
      out: '<p>None.</p>',
      name: 'none'
    },
    {
      in: [
        'no space',
        'asd',
        '',
        'one space ',
        'asd',
        '',
        'one tab	',
        'asd',
        '',
        'in an ![image',
        'alt](#)',
        '',
        'in a [link',
        'alt](#)',
        '',
        'in an *emphasis',
        'emphasis*.',
        '',
        'in a **strong',
        'strong**.',
        '',
        'setext',
        'heading',
        '===',
        '',
        '> block',
        '> quote.',
        '',
        '* list',
        '  item.'
      ].join('\n'),
      out: [
        '<p>no space<br>',
        'asd</p>',
        '<p>one space<br>',
        'asd</p>',
        '<p>one tab<br>',
        'asd</p>',
        '<p>in an <img src="#" alt="image',
        'alt"></p>',
        '<p>in a <a href="#">link<br>',
        'alt</a></p>',
        '<p>in an <em>emphasis<br>',
        'emphasis</em>.</p>',
        '<p>in a <strong>strong<br>',
        'strong</strong>.</p>',
        '<h1>setext<br>',
        'heading</h1>',
        '<blockquote>',
        '<p>block<br>',
        'quote.</p>',
        '</blockquote>',
        '<ul>',
        '<li>list<br>',
        'item.</li>',
        '</ul>'
      ].join('\n'),
      name: 'document'
    }
  ]
  let index = -1

  while (++index < fixtures.length) {
    const fixture = fixtures[index]
    await t.test(fixture.name, async function () {
      assert.equal(
        String(
          await unified()
            .use(remarkParse)
            .use(remarkBreaks)
            .use(remarkRehype)
            .use(rehypeStringify)
            .process(fixture.in)
        ),
        fixture.out
      )
    })
  }
})
