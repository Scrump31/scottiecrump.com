import NextImage from 'next/image'
import type { ImageProps } from 'next/image'

const Image = ({ src, alt, ...rest }: ImageProps) => <NextImage src={src} alt={alt} {...rest} />
export default Image
