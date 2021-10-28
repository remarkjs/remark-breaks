/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').PhrasingContent} PhrasingContent
 */

import {visit} from 'unist-util-visit'

const find = /[\t ]*(?:\r?\n|\r)/g

/**
 * Plugin to support hard breaks without needing spaces or escapes (turns enters
 * into `<br>`s).
 *
 * @type {import('unified').Plugin<void[], Root>}
 */
export default function remarkBreaks() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      /** @type {PhrasingContent[]} */
      const result = []
      let start = 0

      find.lastIndex = 0

      let match = find.exec(node.value)

      while (match) {
        const position = match.index

        if (start !== position) {
          result.push({type: 'text', value: node.value.slice(start, position)})
        }

        result.push({type: 'break'})
        start = position + match[0].length
        match = find.exec(node.value)
      }

      if (result.length > 0 && parent && typeof index === 'number') {
        if (start < node.value.length) {
          result.push({type: 'text', value: node.value.slice(start)})
        }

        parent.children.splice(index, 1, ...result)
        return index + result.length
      }
    })
  }
}
