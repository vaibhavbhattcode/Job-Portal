import { FaBuilding, FaArrowRight, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

export default function FeaturedCompanies() {
  const companies = [
    {
      name: "Google",
      jobs: 235,
      logo: "/images/logos/google.png",
      industry: "Technology",
      newJobs: 42,
      featured: true,
      rating: 4.8,
      employees: "150K+",
      benefits: ["Remote Friendly", "Stock Options", "Flex Hours"],
    },
    {
      name: "Microsoft",
      jobs: 182,
      logo: "/images/logos/microsoft.png",
      industry: "Software",
      newJobs: 28,
      featured: false,
      rating: 4.6,
      employees: "125K+",
      benefits: ["Learning Budget", "Health Insurance", "Parental Leave"],
    },
    {
      name: "Amazon",
      jobs: 324,
      logo: "/images/logos/amazon.png",
      industry: "E-commerce",
      newJobs: 65,
      featured: true,
      rating: 4.2,
      employees: "1.5M+",
      benefits: ["Career Growth", "Tuition Aid", "Signing Bonus"],
    },
    {
      name: "Netflix",
      jobs: 95,
      logo: "/images/logos/netflix.png",
      industry: "Entertainment",
      newJobs: 15,
      featured: false,
      rating: 4.7,
      employees: "12K+",
      benefits: ["Unlimited PTO", "Top Salaries", "Creative Freedom"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Leading Global Employers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Partner with industry pioneers offering exceptional career growth
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {companies.map((company, index) => (
            <motion.article
              key={index}
              variants={itemVariants}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100"
            >
              {company.featured && (
                <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <FaStar className="w-4 h-4" />
                  <span>Featured</span>
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center mb-4">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-gray-100 p-2 mr-4 shadow-inner overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {company.name}
                    </h3>
                    <p className="text-sm text-gray-500">{company.industry}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-blue-600">
                      <FaBuilding className="mr-2" />
                      <span className="font-medium">
                        {company.jobs} Openings
                      </span>
                    </div>
                    <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      +{company.newJobs} new
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-yellow-500">
                      <FaStar className="w-4 h-4" />
                      <span className="ml-1 text-gray-700">
                        {company.rating}/5
                      </span>
                    </div>
                    <span className="text-gray-600">{company.employees}</span>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-500 mb-2">
                      Key Benefits:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {company.benefits.map((benefit, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 text-xs bg-blue-50 text-blue-700 rounded-full"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full flex items-center justify-between px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all group"
                    aria-label={`View jobs at ${company.name}`}
                  >
                    <span className="font-semibold">Explore Roles</span>
                    <FaArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3.5 rounded-xl hover:shadow-lg transition-shadow font-semibold flex items-center justify-center gap-2 mx-auto">
            View All Employers
            <FaArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
