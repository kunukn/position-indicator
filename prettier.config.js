// @ts-check
/* eslint-env node */

/**
 * An object with Prettier.js options.
 * @type {import('prettier').Options}
 */
const options = {
  jsxBracketSameLine: true,
  quoteProps: 'consistent',
  singleQuote: true,
  trailingComma: 'all',
  semi: false,
  endOfLine: 'auto',
  tabWidth: 2,
}

module.exports = options
