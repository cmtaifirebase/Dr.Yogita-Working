"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ChevronRight } from "lucide-react"
import type { BlogPost } from "@/lib/blog"

interface BlogPostHeroProps {
  post: BlogPost
}

export default function BlogPostHero({ post }: BlogPostHeroProps) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={post.coverImage || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover brightness-[0.6] filter"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/40 to-blue-900/40 mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="mb-4 flex items-center text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/blog" className="hover:text-white transition-colors">
            Blog
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span>{post.title}</span>
        </motion.div>

        <div className="max-w-3xl">
          <motion.div
            className="flex flex-wrap gap-2 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {post.categories.map((category, index) => (
              <span
                key={index}
                className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-3 py-1 rounded-full"
              >
                {category}
              </span>
            ))}
          </motion.div>

          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {post.title}
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-white/90 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {post.excerpt}
          </motion.p>

          <motion.div
            className="flex items-center text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Calendar className="h-5 w-5 mr-2" />
            <span>{post.date}</span>
            <span className="mx-3">•</span>
            <Clock className="h-5 w-5 mr-2" />
            <span>{post.readingTime} read</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
