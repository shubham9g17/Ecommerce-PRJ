"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, ArrowLeft, Heart, Star, Truck, Shield, RefreshCw } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  badge: string
  description: string
  details: string[]
}

export default function ProductDetails({ product }: { product: Product }) {
  const cart = useCart()
  const wishlist = useWishlist()
  const { toast } = useToast()
  const isInWishlist = wishlist.hasItem(product.id)

  const addToCart = () => {
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

  const toggleWishlist = () => {
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
      <Link href="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Product Images Section */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            <Badge className="absolute right-2 top-2">{product.badge}</Badge>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="relative aspect-square cursor-pointer overflow-hidden rounded-md bg-gray-100">
                <Image
                  src={product.image}
                  alt={`${product.name} view ${i + 1}`}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Badge variant="secondary" className="text-sm">
                {product.category}
              </Badge>
              <h1 className="text-4xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-primary text-primary"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  (128 reviews)
                </span>
              </div>
            </div>
            <p className="text-lg text-muted-foreground">{product.description}</p>
          </div>

          <div className="space-y-4">
            <div className="text-3xl font-bold">${product.price}</div>
            <div className="flex gap-4">
              <Button size="lg" className="flex-1" onClick={addToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant={isInWishlist ? "default" : "outline"}
                className="w-14"
                onClick={toggleWishlist}
              >
                <Heart className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`} />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-2 rounded-lg border p-4">
              <Truck className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">On orders over $100</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border p-4">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">2 Year Warranty</h3>
                <p className="text-sm text-muted-foreground">Full coverage</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border p-4">
              <RefreshCw className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">Free Returns</h3>
                <p className="text-sm text-muted-foreground">Within 30 days</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4 pt-4">
              <ul className="space-y-2">
                {product.details.map((detail, index) => (
                  <li key={index} className="flex items-center text-muted-foreground">
                    <span className="mr-2">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="specifications" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Brand</span>
                  <span className="text-muted-foreground">Luxe Market</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Model</span>
                  <span className="text-muted-foreground">2024</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Material</span>
                  <span className="text-muted-foreground">Premium</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Weight</span>
                  <span className="text-muted-foreground">0.5 kg</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold mb-2">Standard Shipping</h3>
                  <p className="text-sm text-muted-foreground">
                    Free shipping on orders over $100. Delivery within 3-5 business days.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold mb-2">Express Shipping</h3>
                  <p className="text-sm text-muted-foreground">
                    $15 for next-day delivery. Order before 2 PM for same-day dispatch.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold mb-2">International Shipping</h3>
                  <p className="text-sm text-muted-foreground">
                    Available for select countries. Delivery within 7-10 business days.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}