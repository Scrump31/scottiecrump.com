import { render, screen } from '@testing-library/react'
import Products from 'app/products/page'
import ProductList from '@/data/productList'

test('when render products page, then displays current products', () => {
  render(<Products />)
  ProductList.forEach((product) => {
    expect(screen.getByRole('heading', { name: `Link to ${product.title}` })).toBeInTheDocument()
  })
})
