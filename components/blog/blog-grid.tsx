"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Search, Filter, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { filterBlogPosts, getAllCategories, type BlogCategory } from "@/lib/blog"
import BlogPagination from "@/components/blog/blog-pagination"

export default function BlogGrid() {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPosts, setFilteredPosts] = useState(filterBlogPosts())
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const postsPerPage = 6
  const categories = getAllCategories()

  // Apply filters when category or search query changes
  useEffect(() => {
    const filtered = filterBlogPosts(selectedCategory, searchQuery)
    setFilteredPosts(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [selectedCategory, searchQuery])

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    // Scroll to top of blog grid
    document.getElementById("blog-grid")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already applied via useEffect
  }

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  return (
    <section id="blog-grid" className="py-20 bg-rose-50/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            All Articles
          </motion.h2>

          <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
            <Button
              variant="outline"
              className="md:hidden flex items-center justify-center gap-2 border-pink-200"
              onClick={toggleFilter}
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>

            <form onSubmit={handleSearch} className="relative w-full md:w-auto">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pr-10 border-pink-200 focus:border-pink-400"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-500"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8 mb-12">
          {/* Category filters - desktop */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white p-6 rounded-lg shadow-sm border border-pink-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedCategory === "all"
                      ? "bg-pink-100 text-pink-600 font-medium"
                      : "text-gray-600 hover:bg-pink-50"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === category
                        ? "bg-pink-100 text-pink-600 font-medium"
                        : "text-gray-600 hover:bg-pink-50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Category filters - mobile */}
          {isFilterOpen && (
            <motion.div
              className="md:hidden col-span-1"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white p-6 rounded-lg shadow-sm border border-pink-100 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === "all"
                        ? "bg-pink-100 text-pink-600 font-medium"
                        : "text-gray-600 hover:bg-pink-50"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedCategory === category
                          ? "bg-pink-100 text-pink-600 font-medium"
                          : "text-gray-600 hover:bg-pink-50"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Blog posts grid */}
          <div className="md:col-span-3">
            {currentPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full border-pink-100 hover:shadow-md transition-all duration-300">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={post.coverImage || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.categories.slice(0, 2).map((category, i) => (
                            <span
                              key={i}
                              className="inline-block bg-pink-100 text-pink-600 text-xs font-medium px-2.5 py-1 rounded-full"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">{post.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{post.date}</span>
                          <span className="mx-2">•</span>
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{post.readingTime}</span>
                        </div>
                        <Link href={`/blog/${post.slug}`}>
                          <Button variant="outline" className="w-full border-pink-200 text-pink-600 hover:bg-pink-50">
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg text-center border border-pink-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No articles found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any articles matching your search criteria. Please try a different search term or
                  category.
                </p>
                <Button
                  variant="outline"
                  className="border-pink-200 text-pink-600 hover:bg-pink-50"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {filteredPosts.length > postsPerPage && (
              <div className="mt-12">
                <BlogPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
