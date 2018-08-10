'use strict'

module.exports = breaks

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
    var queue = ''
    var character

    while (++index < length) {
      character = value.charAt(index)

      if (character === '\n') {
        /* istanbul ignore if - never used (yet) */
        if (silent) {
          return true
        }

        queue += character

        return eat(queue)({type: 'break'})
      }

      if (character !== ' ') {
        return
      }

      queue += character
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
