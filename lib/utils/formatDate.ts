import siteMetadata from '@/data/siteMetadata'

/**
 * Converts a date string into a formatted string based on the user's locale.
 *
 * @param date - The date string to be formatted.
 * If not provided, the current date is used.
 * @returns A formatted date string based on the user's locale.
 *
 * @example
 * ```typescript
 * import formatDate from './formatDate'
 *
 * const formattedDate = formatDate('2022-01-01')
 * console.log(formattedDate) // Output: "January 31, 2021"
 * ```
 */
const formatDate = (date: string = '') => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const formattedDate = date ? new Date(date) : new Date()

  return formattedDate.toLocaleDateString(siteMetadata.locale, options)
}

export default formatDate
