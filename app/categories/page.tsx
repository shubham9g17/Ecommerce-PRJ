"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    name: "Electronics",
    description: "Latest gadgets and tech accessories",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=800",
    productCount: 3
  },
  {
    name: "Accessories",
    description: "Fashion accessories and personal items",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800",
    productCount: 2
  },
  {
    name: "Watches",
    description: "Premium timepieces and collections",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800",
    productCount: 1
  }
]

export default function CategoriesPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Categories</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Browse our product categories
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.name} className="overflow-hidden">
            <Link href={`/products?category=${category.name}`}>
              <div className="relative aspect-[2/1]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
            </Link>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{category.name}</span>
                <Badge variant="secondary">
                  <ShoppingBag className="mr-1 h-3 w-3" />
                  {category.productCount}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{category.description}</p>
              <Button variant="link" className="mt-2 h-auto p-0" asChild>
                <Link href={`/products?category=${category.name}`}>
                  View Products →
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}