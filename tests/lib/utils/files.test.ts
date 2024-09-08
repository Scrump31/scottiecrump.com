import fs from 'fs'
import path from 'path'
import getAllFilesRecursively from '@/lib/utils/files'
import { Mock } from 'vitest'

vi.mock('fs')
vi.mock('path')

describe(`${getAllFilesRecursively.name}`, () => {
  const testDir = '/test-directory'
  const mockReaddirSync = fs.readdirSync as Mock
  const mockStatSync = fs.statSync as Mock
  const mockPathJoin = path.join as Mock

  test('when directory with files, then returns files array', () => {
    // Return the expected file and directory names
    mockReaddirSync.mockImplementation((dir: string) => {
      if (dir === testDir) {
        return ['file1.txt', 'nestedDir']
      } else if (dir === `${testDir}/nestedDir`) {
        return ['file2.txt']
      }
      return []
    })
    // Return the expected file type (for example, file or directory)
    mockStatSync.mockImplementation((filePath: string) => {
      if (filePath === `${testDir}/file1.txt` || filePath === `${testDir}/nestedDir/file2.txt`) {
        return { isFile: () => true }
      } else if (filePath === `${testDir}/nestedDir`) {
        return { isFile: () => false }
      }
      return { isFile: () => false }
    })
    // Return the expected joined paths
    mockPathJoin.mockImplementation((...args: string[]) => args.join('/'))

    const result = getAllFilesRecursively(testDir)

    expect(result).toEqual([`${testDir}/file1.txt`, `${testDir}/nestedDir/file2.txt`])
  })

  test('when empty directory, then returns empty array', () => {
    mockReaddirSync.mockImplementation(() => [])
    mockStatSync.mockImplementation(() => ({ isFile: () => false }))
    mockPathJoin.mockImplementation((...args: []) => args.join('/'))

    const result = getAllFilesRecursively(testDir)

    expect(result).toEqual([])
  })
})
