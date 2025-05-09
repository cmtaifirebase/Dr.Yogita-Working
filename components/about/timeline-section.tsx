"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function TimelineSection() {
  const timelineEvents = [
    {
      year: "2001",
      title: "Education",
      description:
        "Completed Bachelor's in Physiotherapy from Delhi University with honors.",
      image: "/timeline/education.png",
    },
    {
      year: "2003",
      title: "Qualification Milestone",
      description:
        "Completed BPT (Bachelor of Physiotherapy), laying the foundation for a dedicated career in physical rehabilitation.",
      image: "/timeline/education.png",
    },
    {
      year: "2005",
      title: "First Clinic",
      description:
        "Opened the first Dr. Yogita Physiotherapy Clinic in South Delhi, beginning a journey of hands-on healing.",
      image: "/timeline/first-clinic.png",
    },
    {
      year: "2008",
      title: "Psychology Degree",
      description:
        "Earned a BSc in Psychology to better understand the mental and emotional dimensions of healing.",
      image: "/timeline/education.png",
    },
    {
      year: "2010",
      title: "Advanced Certification",
      description:
        "Received advanced certification in Manual Therapy and Sports Rehabilitation, enhancing clinical expertise.",
      image: "/timeline/certification.png",
    },
    {
      year: "2011",
      title: "Postgraduate Studies",
      description:
        "Completed MSc in Psychology, integrating psychological insight into physical therapy treatment.",
      image: "/timeline/education.png",
    },
    {
      year: "2012",
      title: "HR & Management Diploma",
      description:
        "Completed Post Graduate Diploma in Personnel Management and Industrial Relations.",
      image: "/timeline/education.png",
    },
    {
      year: "2014",
      title: "Master of Physiotherapy",
      description:
        "Completed MPT (Ortho), deepening clinical and academic understanding of orthopedic physiotherapy.",
      image: "/timeline/education.png",
    },
    {
      year: "2015",
      title: "Clinic Expansion",
      description:
        "Expanded to three locations across Delhi NCR, increasing access to personalized physiotherapy care.",
      image: "/timeline/expansion.png",
    },
    {
      year: "2018",
      title: "Research & Publication",
      description:
        "Published innovative research on chronic back pain management, contributing to evidence-based care.",
      image: "/timeline/research.png",
    },
    {
      year: "2020",
      title: "Online Consultation Launch",
      description:
        "Launched virtual physiotherapy services to treat patients remotely during the pandemic and beyond.",
      image: "/timeline/online.png",
    },
    {
      year: "2023",
      title: "Present Day",
      description:
        "Now leading a team of 15+ specialists across 5 centers in Delhi NCR, offering advanced physiotherapy solutions.",
      image: "/timeline/present.png",
    },
    {
      year: "2024",
      title: "Bach Remedy Certification",
      description:
        "Certified in Bach Flower Remedies by Bach Remedy UK, expanding holistic healing capabilities.",
      image: "/timeline/certification.png",
    },
  ];


  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Professional Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dr. Yogita's path to becoming a leading physiotherapist in Delhi NCR has been marked by continuous learning,
            innovation, and dedication to patient care.
          </p>
          <div className="w-20 h-1 bg-pink-500 mx-auto mt-6"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-pink-200 hidden md:block"></div>

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-8`}
              >
                <div className="md:w-1/2 flex justify-center md:justify-end">
                  <div
                    className={`bg-white rounded-lg shadow-lg p-6 ${index % 2 === 0 ? "md:text-right" : "md:text-left"
                      } relative`}
                  >
                    <div className="absolute top-6 h-4 w-4 rounded-full bg-pink-500 hidden md:block right-0 md:right-auto md:left-auto transform translate-x-1/2 md:translate-x-0 md:translate-y-0"></div>
                    <span className="inline-block bg-pink-100 text-pink-600 rounded-full px-3 py-1 text-sm font-medium mb-2">
                      {event.year}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-center md:justify-start">
                  <div className="relative w-48 h-48 rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
