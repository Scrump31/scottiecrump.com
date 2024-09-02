const { replace } = ''

const htmlSpecialCharactersRegex = /[&<>'"]/g

const htmlEntitiesMap: { [key: string]: string } = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
}
const replaceHtmlSpecialCharacters = (match: string) => htmlEntitiesMap[match]

/**
 * Escapes HTML special characters in a given string.
 *
 * This function replaces HTML special characters (&, <, >, ', ") with their corresponding HTML entities.
 *
 * @param input - The string to escape.
 * @returns The escaped string.
 */
export const escape = (input: string): string =>
  replace.call(input, htmlSpecialCharactersRegex, replaceHtmlSpecialCharacters)
