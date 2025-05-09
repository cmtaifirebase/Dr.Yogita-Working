"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Facebook, Twitter, Linkedin, Link2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import type { BlogPost } from "@/lib/blog"

interface BlogPostContentProps {
  post: BlogPost
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = post.title

    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case "copy":
        navigator.clipboard.writeText(url)
        alert("Link copied to clipboard!")
        return
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400")
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Social sharing sidebar - desktop */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="sticky top-32">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Share This Article</h3>
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => handleShare("facebook")}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                  <span>Facebook</span>
                </button>
                <button
                  onClick={() => handleShare("twitter")}
                  className="flex items-center space-x-2 text-gray-600 hover:text-sky-500 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                  <span>Twitter</span>
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-700 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>LinkedIn</span>
                </button>
                <button
                  onClick={() => handleShare("copy")}
                  className="flex items-center space-x-2 text-gray-600 hover:text-pink-500 transition-colors"
                >
                  <Link2 className="h-5 w-5" />
                  <span>Copy Link</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Main content */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 border-pink-100">
              <div className="prose prose-pink max-w-none">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-500 mb-3">Related Topics:</h4>
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category, index) => (
                    <span key={index} className="inline-block bg-pink-50 text-pink-600 text-sm px-3 py-1 rounded-full">
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social sharing - mobile */}
              <div className="mt-8 pt-6 border-t border-gray-100 lg:hidden">
                <h4 className="text-sm font-medium text-gray-500 mb-3">Share This Article:</h4>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleShare("facebook")}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleShare("twitter")}
                    className="text-gray-600 hover:text-sky-500 transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="text-gray-600 hover:text-blue-700 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleShare("copy")}
                    className="text-gray-600 hover:text-pink-500 transition-colors"
                  >
                    <Link2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
