/**
 * @typedef {import('mdast').Root} Root
 */

import {newlineToBreak} from 'mdast-util-newline-to-break'

/**
 * Plugin to support hard breaks without needing spaces or escapes (turns enters
 * into `<br>`s).
 *
 * @type {import('unified').Plugin<void[], Root>}
 */
export default function remarkBreaks() {
  return newlineToBreak
}
