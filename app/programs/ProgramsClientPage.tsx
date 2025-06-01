"use client"
import { motion } from "framer-motion"
import { ShoppingCart, Play, Clock, ArrowRight, Youtube } from "lucide-react" // Added Youtube
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import FooterSection from "@/components/footer-section"
import { useEffect, useState } from "react" // Added useEffect and useState

// Define a type for your program data for better type safety
interface Program {
  _id: string; // MongoDB ID
  title: string;
  description: string;
  price: number;
  duration: string;
  thumbnailUrl: string; // This will be the Cloudinary URL
  slug: string;
  youtubeLink?: string; // Optional, will be an empty string if not provided
  createdAt: string; // Or Date
}

// Ensure this environment variable is set in your .env.local file for the frontend
// e.g., NEXT_PUBLIC_API_URL=http://localhost:5001/api
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api` || "http://localhost:5001/api";

export default function ProgramsClientPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/programs`);
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: `HTTP error! status: ${response.status}` }));
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setPrograms(data.data);
        } else {
          throw new Error(data.error || "Failed to fetch programs");
        }
      } catch (err) {
        console.error("Error fetching programs:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred while fetching programs.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  return (
    <main className="min-h-screen bg-rose-50/30 pt-20">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-pink-50 opacity-70"></div>
        <div className="absolute inset-0 bg-[url('/programs/programs-pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Physiotherapy Programs</h1>
              <p className="text-xl text-gray-600 mb-8">
                Expert-designed video programs to help you recover, strengthen, and improve your physical wellbeing from
                the comfort of your home.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="#program-list">
                  <Button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-md font-medium flex items-center">
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Explore Programs
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto"></div>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Purchase a Program</h3>
              <p className="text-gray-600">
                Choose a program that addresses your specific needs and complete the purchase process.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Receive on WhatsApp</h3>
              <p className="text-gray-600">
                The full program video will be sent directly to your WhatsApp for easy access.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Follow Along</h3>
              <p className="text-gray-600">Follow the expert guidance in the video at your own pace and convenience.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs List - DYNAMIC SECTION */}
      <section id="program-list" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Programs</h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Each program is designed by Dr. Yogita and her team of expert physiotherapists to address specific
              conditions and goals.
            </p>
          </motion.div>

          {isLoading && <p className="text-center text-lg text-gray-700 py-10">Loading programs...</p>}
          {error && <p className="text-center text-lg text-red-600 py-10">Error: {error}</p>}

          {!isLoading && !error && programs.length === 0 && (
            <p className="text-center text-lg text-gray-600 py-10">No programs available at the moment. Please check back soon!</p>
          )}

          {!isLoading && !error && programs.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <motion.div
                  key={program._id} // Use _id from MongoDB
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col"
                >
                  <div className="relative">
                    <Image
                      src={program.thumbnailUrl || "/placeholder.svg"} // Use thumbnailUrl from backend
                      alt={program.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover"
                      priority={index < 3} // Prioritize loading for above-the-fold images
                      unoptimized={program.thumbnailUrl?.includes("cloudinary") ? true : false} // Add this if you face issues with Cloudinary & Next/Image optimization
                    />
                    <div className="absolute bottom-0 left-0 bg-pink-500 text-white px-3 py-1 rounded-tr-lg flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{program.duration}</span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow"> {/* flex-grow ensures footer content is pushed down */}
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{program.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 flex-grow min-h-[60px]">{program.description}</p> {/* flex-grow for description, min-h for consistent height */}

                    <div className="mt-auto"> {/* Pushes buttons to the bottom */}
                      <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-bold text-pink-500">₹{program.price}</span>
                          {/* This button could link to a program detail page or be an "Add to Cart" button */}
                          <Link href={`/programs/${program.slug}`}>
                              <Button variant="outline" size="sm" className="text-pink-500 border-pink-500 hover:bg-pink-50 hover:text-pink-600">
                                  View Details
                              </Button>
                          </Link>
                      </div>

                      {program.youtubeLink && program.youtubeLink.trim() !== '' ? (
                        <a
                          href={program.youtubeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full block" // Make anchor take full width for button styling
                        >
                          <Button className="w-full bg-red-500 hover:bg-red-600 text-white rounded-md font-medium flex items-center justify-center">
                            <Youtube className="mr-2 h-5 w-5" />
                            See Program on YouTube
                          </Button>
                        </a>
                      ) : (
                        <Button
                          className="w-full bg-gray-400 hover:bg-gray-500 text-white rounded-md font-medium flex items-center justify-center cursor-not-allowed"
                          disabled
                        >
                          <Play className="mr-2 h-5 w-5" />
                          Program Coming Soon
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-r from-pink-100 to-blue-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto"></div>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <Image
                    src="/indian-woman-professional-headshot.png" // Replace with actual or placeholder
                    alt="Priya Sharma"
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Priya Sharma</h4>
                  <p className="text-gray-500 text-sm">Back Pain Relief Program</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "The back pain program has been a game-changer for me. After just two weeks of following the exercises,
                my chronic back pain has significantly reduced. The instructions are clear and easy to follow."
              </p>
            </motion.div>
            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <Image
                    src="/indian-man-headshot.png" // Replace with actual or placeholder
                    alt="Rahul Patel"
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Rahul Patel</h4>
                  <p className="text-gray-500 text-sm">Office Worker Wellness Program</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "As someone who sits at a desk all day, this program has been invaluable. The exercises are quick but
                effective, and I've noticed a significant improvement in my posture and reduction in neck pain.
                Receiving it directly on WhatsApp makes it so convenient."
              </p>
            </motion.div>
            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <Image
                    src="/indian-yoga-instructor-headshot.png" // Replace with actual or placeholder
                    alt="Ananya Gupta"
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Ananya Gupta</h4>
                  <p className="text-gray-500 text-sm">Post-Pregnancy Recovery</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "The post-pregnancy program helped me regain my strength safely. Dr. Yogita's guidance is clear and
                reassuring. I appreciate how the exercises gradually increase in intensity, making it perfect for new
                moms."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto"></div>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-6">
            {/* FAQ Item 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">How do I access the program after purchase?</h3>
              <p className="text-gray-600">
                After completing your purchase, you'll receive the full program video directly on your WhatsApp within
                24 hours. You'll also receive an email confirmation with details.
              </p>
            </motion.div>
            {/* FAQ Item 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Can I view the program on multiple devices?</h3>
              <p className="text-gray-600">
                Yes, once you receive the video on WhatsApp, you can save it to your device and view it on any
                compatible device. You can also request the video to be sent to a different WhatsApp number if needed.
              </p>
            </motion.div>
             {/* FAQ Item 3 */}
             <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Are these programs suitable for beginners?</h3>
              <p className="text-gray-600">
                Yes, all our programs are designed with clear instructions and modifications for different fitness
                levels. Each exercise is demonstrated with proper form and technique guidance.
              </p>
            </motion.div>
             {/* FAQ Item 4 */}
             <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">How long do I have access to the program?</h3>
              <p className="text-gray-600">
                Once you receive the video, it's yours to keep permanently. There are no subscription fees or time
                limitations on access.
              </p>
            </motion.div>
             {/* FAQ Item 5 */}
             <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Can I get a refund if the program doesn't work for me?
              </h3>
              <p className="text-gray-600">
                Due to the digital nature of our programs, we do not offer refunds once the video has been delivered.
                However, we're happy to provide guidance or answer questions to help you get the most out of your
                program.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <FooterSection />
    </main>
  )
}