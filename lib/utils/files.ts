import fs from 'fs'
import path from 'path'

const pipe = (
  ...fns: {
    (
      path: fs.PathLike,
      options?:
        | {
            encoding: BufferEncoding | null
            withFileTypes?: false | undefined
            recursive?: boolean | undefined
          }
        | BufferEncoding
        | null
    ): string[]
    (
      path: fs.PathLike,
      options:
        | { encoding: 'buffer'; withFileTypes?: false | undefined; recursive?: boolean | undefined }
        | 'buffer'
    ): Buffer[]
    (
      path: fs.PathLike,
      options?:
        | (fs.ObjectEncodingOptions & {
            withFileTypes?: false | undefined
            recursive?: boolean | undefined
          })
        | BufferEncoding
        | null
    ): string[] | Buffer[]
    (
      path: fs.PathLike,
      options: fs.ObjectEncodingOptions & { withFileTypes: true; recursive?: boolean | undefined }
    ): fs.Dirent[]
    (input: any): any
    (input: any): any
    (extraPath: any): string
    (fullPath: any): any
  }[]
) => (x: any) => fns.reduce((v, f) => f(v), x)

const flattenArray = (input: any[]) =>
  input.reduce((acc, item) => [...acc, ...(Array.isArray(item) ? item : [item])], [])

const map = (fn: (x: any) => any) => (input: any[]) => input.map(fn)

const walkDir = (fullPath: fs.PathLike) => {
  return fs.statSync(fullPath).isFile() ? fullPath : getAllFilesRecursively(fullPath)
}

const pathJoinPrefix = (prefix: string) => (extraPath: string) => path.join(prefix, extraPath)

/**
 * A function that recursively retrieves all files within a specified directory.
 *
 * @param folder - The path to the directory to be searched.
 * @returns An array of file paths found within the specified directory and its subdirectories.
 */
const getAllFilesRecursively = (folder: fs.PathLike) =>
  // @ts-ignore
  pipe(fs.readdirSync, map(pipe(pathJoinPrefix(folder), walkDir)), flattenArray)(folder)

export default getAllFilesRecursively
