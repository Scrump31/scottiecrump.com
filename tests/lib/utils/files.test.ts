import fs from 'fs'
import path from 'path'
import getAllFilesRecursively from '@/lib/utils/files'

describe(`${getAllFilesRecursively.name}`, () => {
  const testDir = '/test-directory'

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('when directory with files, then returns files array', () => {
    // Spy on fs and path functions and provide implementations
    vi.spyOn(fs, 'readdirSync').mockImplementation((dir: any) => {
      if (dir === testDir) return ['file1.txt', 'nestedDir'] as any
      if (dir === `${testDir}/nestedDir`) return ['file2.txt'] as any
      return [] as any
    })
    vi.spyOn(fs, 'statSync').mockImplementation((filePath: any) => {
      if (filePath === `${testDir}/file1.txt` || filePath === `${testDir}/nestedDir/file2.txt`) {
        return { isFile: () => true } as any
      }
      if (filePath === `${testDir}/nestedDir`) {
        return { isFile: () => false } as any
      }
      return { isFile: () => false } as any
    })
    vi.spyOn(path, 'join').mockImplementation((...args: any[]) => args.join('/'))

    const result = getAllFilesRecursively(testDir)
    expect(result).toEqual([`${testDir}/file1.txt`, `${testDir}/nestedDir/file2.txt`])
  })

  test('when empty directory, then returns empty array', () => {
    vi.spyOn(fs, 'readdirSync').mockImplementation(() => [] as any)
    vi.spyOn(fs, 'statSync').mockImplementation(() => ({ isFile: () => false } as any))
    vi.spyOn(path, 'join').mockImplementation((...args: any[]) => args.join('/'))

    const result = getAllFilesRecursively(testDir)
    expect(result).toEqual([])
  })
})
