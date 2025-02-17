import {
  FaLaptopCode,
  FaChartLine,
  FaStethoscope,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function JobCategories() {
  const categories = [
    {
      icon: <FaLaptopCode />,
      title: "Tech & Development",
      jobs: "5,000+",
      gradient: "from-blue-500 to-cyan-400",
      progress: 75,
      roles: ["Software Engineer", "Data Scientist", "DevOps Specialist"],
    },
    {
      icon: <FaChartLine />,
      title: "Business & Finance",
      jobs: "3,200+",
      gradient: "from-purple-500 to-pink-400",
      progress: 60,
      roles: ["Financial Analyst", "Project Manager", "HR Business Partner"],
    },
    {
      icon: <FaStethoscope />,
      title: "Healthcare",
      jobs: "1,500+",
      gradient: "from-green-500 to-emerald-400",
      progress: 45,
      roles: ["Registered Nurse", "Medical Director", "Pharmacist"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            High-Demand Career Paths
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Explore thriving industries with growing opportunities and
            competitive salaries
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((cat, index) => (
            <motion.article
              key={index}
              variants={itemVariants}
              className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

              <div className="p-8">
                <div
                  className={`mb-6 w-16 h-16 rounded-2xl bg-gradient-to-r ${cat.gradient} flex items-center justify-center shadow-lg`}
                >
                  <span className="text-white text-3xl">{cat.icon}</span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {cat.title}
                </h3>

                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-600 font-medium">
                    {cat.jobs} Open Positions
                  </p>
                  <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    +{cat.progress}% Growth
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
                  <motion.div
                    className={`bg-gradient-to-r ${cat.gradient} h-2 rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${cat.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-500 mb-3">
                    Popular Roles:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.roles.map((role, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-sm bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  className="w-full flex items-center justify-between px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl hover:shadow-lg transition-all group"
                  aria-label={`Explore ${cat.title} jobs`}
                >
                  <span className="font-semibold">Browse Opportunities</span>
                  <FaArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
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
            Explore All Categories
            <FaArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
