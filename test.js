'use strict'

var test = require('tape')
var unified = require('unified')
var markdown = require('remark-parse')
var html = require('rehype-stringify')
var remark2rehype = require('remark-rehype')
var breaks = require('.')

test('breaks()', function (t) {
  t.equal(typeof breaks, 'function', 'should be a function')

  t.throws(
    function () {
      unified().use(breaks).freeze()
    },
    /^Error: Missing parser to attach `remark-breaks` to/,
    'should not throw if without parser'
  )

  t.end()
})

test('fixtures', function (t) {
  var fixtures = [
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
    }
  ]

  var proc = unified().use(markdown).use(breaks).use(remark2rehype).use(html)

  fixtures.forEach(check)

  t.end()

  function check(fixture) {
    t.equal(String(proc.processSync(fixture.in)), fixture.out, fixture.name)
  }
})
