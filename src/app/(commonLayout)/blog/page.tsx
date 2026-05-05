import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    title: "10 Best Street Foods in Dhaka",
    excerpt:
      "Discover the hidden gems of Dhaka's vibrant street food scene, from spicy jhalmuri to sweet pitha.",
    author: "Aminul Islam",
    date: "May 10, 2024",
    category: "Guides",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "How to Make the Perfect Biryani at Home",
    excerpt:
      "A step-by-step guide to mastering the art of cooking authentic Kacchi Biryani with traditional spices.",
    author: "Sarah Ahmed",
    date: "May 15, 2024",
    category: "Recipes",
    image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop",
  },
  {
    title: "The Rise of Healthy Fast Food",
    excerpt:
      "Why more people are choosing nutritious alternatives without compromising on taste or convenience.",
    author: "Dr. Rezwan",
    date: "May 20, 2024",
    category: "Health",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop",
  },
  {
    title: "Top 5 Desserts for Your Summer Parties",
    excerpt:
      "Cool down this summer with these refreshing and easy-to-make dessert ideas for any gathering.",
    author: "Maria Gomez",
    date: "May 25, 2024",
    category: "Tips",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1974&auto=format&fit=crop",
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Our Blog
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explore the latest stories, recipes, and food guides from the
          FoodyVerse community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {blogPosts.map((post, i) => (
          <Card
            key={i}
            className="overflow-hidden flex flex-col md:flex-row group border-2 hover:border-primary/50 transition-all shadow-sm hover:shadow-xl"
          >
            <div className="w-full md:w-2/5 relative overflow-hidden h-64 md:h-auto">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary">{post.category}</Badge>
              </div>
            </div>
            <div className="w-full md:w-3/5 p-8 flex flex-col justify-center space-y-4">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {post.author}
                </div>
              </div>
              <h2 className="text-2xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-20 p-12 bg-primary rounded-3xl text-center text-primary-foreground space-y-6">
        <h2 className="text-3xl font-bold">FoodyVerse Stories</h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          We're constantly updating our blog with fresh content, recipes, and
          news from the culinary world. Stay tuned for more!
        </p>
      </div>
    </div>
  );
}
