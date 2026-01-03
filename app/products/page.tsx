import Card from '@/components/Card'
import productList from '@/data/productList'
import siteMetadata from '@/data/siteMetadata'
import { Product } from '@/types/product'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Products - ${siteMetadata.author}`,
  description: siteMetadata.description,
}

export default function Products() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Products
        </h1>
      </div>
      <div className="container py-12">
        <div className="flex flex-wrap -m-4">
          {productList.map((product: Product) => (
            <Card
              key={product.title}
              title={product.title}
              description={product.description}
              imgSrc={product.imgSrc}
              href={product.href}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
