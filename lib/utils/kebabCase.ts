/**
 * Converts a given string to kebab-case.
 *
 * This function takes a string as input and returns the kebab-case version of it.
 *
 * @param inputText - The input string to be converted to kebab-case.
 * @returns A string in kebab-case.
 * If the input is an empty string or null, an empty string is returned.
 *
 * @example
 * ```typescript
 * kebabCase('Hello World') // returns 'hello-world'
 * kebabCase('helloWorld') // returns 'hello-world'
 * kebabCase('HelloWorld123') // returns 'hello-world-123'
 * kebabCase('') // returns ''
 * kebabCase(null) // returns ''
 * ```
 */
const kebabCase = (inputText: string): string => {
  if (!inputText) return ''

  // Insert hyphens before uppercase letters and replace spaces/underscores
  return inputText
    .replaceAll(/([a-z\d])([A-Z])/g, '$1-$2')
    .replaceAll(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1-$2')
    .replaceAll(/[\s_]+/g, '-')
    .toLowerCase()
}
export default kebabCase
