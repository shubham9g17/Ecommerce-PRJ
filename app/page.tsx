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
import { ShoppingCart, TrendingUp, Package, Truck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const featuredProducts = [
  {
    id: 1,
    name: "Premium Leather Backpack",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800",
    category: "Accessories",
    badge: "New Arrival"
  },
  {
    id: 2,
    name: "Wireless Noise-Canceling Headphones",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    category: "Electronics",
    badge: "Best Seller"
  },
  {
    id: 3,
    name: "Minimalist Watch Collection",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    category: "Watches",
    badge: "Limited Edition"
  }
]

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-8">
      {/* Hero Section */}
      <section className="container relative h-[600px] overflow-hidden rounded-lg">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000"
          alt="Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/50">
          <div className="container flex h-full flex-col justify-center gap-4">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
              Discover Premium Quality Products
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              Shop the latest trends in fashion, electronics, and lifestyle products. Free shipping on orders over $100.
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button size="lg" variant="outline">
                View Deals
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-primary" />
              <CardTitle>Trending Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Discover our most popular items loved by customers
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <ShoppingCart className="h-10 w-10 text-primary" />
              <CardTitle>Secure Shopping</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Safe and encrypted transactions with Stripe
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Package className="h-10 w-10 text-primary" />
              <CardTitle>Quality Guarantee</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Premium products with satisfaction guarantee
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Truck className="h-10 w-10 text-primary" />
              <CardTitle>Fast Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Quick shipping with real-time tracking
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
            <p className="text-muted-foreground">Hand-picked products for you</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/products">View All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
                <Badge className="absolute right-2 top-2">{product.badge}</Badge>
              </div>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.category}</CardDescription>
              </CardHeader>
              <CardFooter className="flex items-center justify-between">
                <span className="text-lg font-bold">${product.price}</span>
                <Button size="sm">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}