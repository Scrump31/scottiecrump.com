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
const kebabCase = (inputText: string): string =>
  inputText
    ? (inputText.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || [])
        .map((word) => word.toLowerCase())
        .join('-')
    : ''
export default kebabCase
