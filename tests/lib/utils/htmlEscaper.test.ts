import { escape } from '@/lib/utils/htmlEscaper'

describe(`${escape.name}`, () => {
  test.each([
    { char: '&', expected: '&amp;' },
    { char: '<', expected: '&lt;' },
    { char: '>', expected: '&gt;' },
    { char: "'", expected: '&#39;' },
    { char: '"', expected: '&quot;' },
  ])(
    'when special character $char, then returns $expected HTML special characters',
    ({ char, expected }) => {
      expect(escape(char)).toBe(expected)
    }
  )
})
