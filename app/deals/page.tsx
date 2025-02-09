"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ShoppingCart, Percent } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/hooks/use-cart"

const deals = [
  {
    id: 1,
    name: "Premium Leather Backpack",
    originalPrice: 199.99,
    discountedPrice: 159.99,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800",
    discount: "20% OFF",
    description: "Limited time offer on our bestselling backpack",
    endsIn: "2 days"
  },
  {
    id: 2,
    name: "Wireless Noise-Canceling Headphones",
    originalPrice: 299.99,
    discountedPrice: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    discount: "17% OFF",
    description: "Special discount on premium headphones",
    endsIn: "3 days"
  },
  {
    id: 4,
    name: "Professional Camera Kit",
    originalPrice: 1299.99,
    discountedPrice: 999.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
    discount: "23% OFF",
    description: "Exclusive deal for photography enthusiasts",
    endsIn: "1 day"
  }
]

export default function DealsPage() {
  const cart = useCart()

  const addToCart = (deal: typeof deals[0]) => {
    cart.addItem({
      id: deal.id,
      name: deal.name,
      price: deal.discountedPrice,
      image: deal.image
    })
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold tracking-tight">Special Deals</h1>
          <Badge variant="destructive" className="text-base">
            <Percent className="mr-1 h-4 w-4" />
            Limited Time
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground mt-2">
          Exclusive discounts on premium products
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {deals.map((deal) => (
          <Card key={deal.id} className="overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={deal.image}
                alt={deal.name}
                fill
                className="object-cover"
              />
              <Badge variant="destructive" className="absolute right-2 top-2">
                {deal.discount}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle>{deal.name}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                Ends in {deal.endsIn}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{deal.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">${deal.discountedPrice}</span>
                <span className="text-lg text-muted-foreground line-through">${deal.originalPrice}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => addToCart(deal)}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}