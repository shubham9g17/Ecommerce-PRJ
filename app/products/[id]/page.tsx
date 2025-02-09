import { notFound } from "next/navigation"
import { products } from '../data'

import dynamic from "next/dynamic";

// Dynamically import ProductDetails as a Client Component
const ProductDetails = dynamic(() => import("./product-details"), { ssr: false });

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }))
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === parseInt(params.id))
  
  if (!product) {
    notFound()
  }

  return <ProductDetails product={product} />
}