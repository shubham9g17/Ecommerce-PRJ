"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ShoppingCart, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"
import { useToast } from "@/hooks/use-toast"
import { products } from './data'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
  const cart = useCart()
  const wishlist = useWishlist()
  const { toast } = useToast()
  const categories = ["All", ...new Set(products.map(product => product.category))]

  const filteredProducts = products
    .filter(product => selectedCategory === "All" || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  const addToCart = (product: typeof products[0]) => {
    cart.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`
    })
  }

  const toggleWishlist = (product: typeof products[0]) => {
    const isInWishlist = wishlist.hasItem(product.id)
    if (isInWishlist) {
      wishlist.removeItem(product.id)
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`
      })
    } else {
      wishlist.addItem(product.id)
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`
      })
    }
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">All Products</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Browse our collection of premium products
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-4">
          {categories.map(category => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "secondary" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
        
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <Link href={`/products/${product.id}`}>
              <div className="relative aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
                <Badge className="absolute right-2 top-2">{product.badge}</Badge>
              </div>
            </Link>
            <CardHeader>
              <Link href={`/products/${product.id}`}>
                <CardTitle className="hover:text-primary">{product.name}</CardTitle>
              </Link>
              <CardDescription>{product.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{product.description}</p>
            </CardContent>
            <CardFooter className="flex items-center justify-between gap-2">
              <span className="text-lg font-bold">${product.price}</span>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => addToCart(product)}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button
                  size="sm"
                  variant={wishlist.hasItem(product.id) ? "default" : "outline"}
                  onClick={() => toggleWishlist(product)}
                >
                  <Heart className={`h-4 w-4 ${wishlist.hasItem(product.id) ? "fill-current" : ""}`} />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}