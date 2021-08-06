import {visit} from 'unist-util-visit'

const find = /[\t ]*(?:\r?\n|\r)/g

const splice = [].splice

export default function remarkBreaks() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
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

      if (result.length > 0) {
        if (start < node.value.length) {
          result.push({type: 'text', value: node.value.slice(start)})
        }

        splice.apply(parent.children, [index, 1].concat(result))
        return index + result.length
      }
    })
  }
}
