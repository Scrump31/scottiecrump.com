import formatDate from '../../../lib/utils/formatDate'

describe(`${formatDate.name}`, () => {
  process.env.TZ = 'UTC'
  test('when provided a date, then returns formatted version', () => {
    expect(formatDate('2024-12-31')).toBe('December 31, 2024')
  })

  test('when not provided a date, then returns current date', () => {
    const mockDate = new Date('2023-02-02T00:00:00.000Z')
    vi.spyOn(global, 'Date').mockImplementation(() => mockDate)

    expect(formatDate()).toBe('February 2, 2023')
  })
})
