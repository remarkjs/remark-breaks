'use strict'

module.exports = breaks

var lineFeed = 10
var space = 32

function breaks() {
  var parser = this.Parser
  var tokenizers

  if (!isRemarkParser(parser)) {
    throw new Error('Missing parser to attach `remark-breaks` to')
  }

  tokenizers = parser.prototype.inlineTokenizers

  tokenizeBreak.locator = tokenizers.break.locator

  tokenizers.break = tokenizeBreak

  function tokenizeBreak(eat, value, silent) {
    var length = value.length
    var index = -1
    var code

    while (++index < length) {
      code = value.charCodeAt(index)

      if (code === lineFeed) {
        /* istanbul ignore if - never used (yet) */
        if (silent) {
          return true
        }

        return eat(value.slice(0, index + 1))({type: 'break'})
      }

      if (code !== space) {
        return
      }
    }
  }
}

function isRemarkParser(parser) {
  return Boolean(
    parser &&
      parser.prototype &&
      parser.prototype.inlineTokenizers &&
      parser.prototype.inlineTokenizers.break &&
      parser.prototype.inlineTokenizers.break.locator
  )
}
