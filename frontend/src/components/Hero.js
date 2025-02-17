export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-indigo-900 to-purple-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <span className="inline-block bg-white/10 px-4 py-2 rounded-full text-sm font-medium">
                🚀 Join 50,000+ Successful Hires
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Find Your
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block">
                  Dream Job
                </span>
                <span className="text-2xl md:text-3xl font-normal text-purple-200 block mt-4">
                  Your Perfect Opportunity Awaits
                </span>
              </h1>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                <div className="text-2xl font-bold">250K+</div>
                <div className="text-sm text-purple-200">Jobs Posted</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                <div className="text-2xl font-bold">35K+</div>
                <div className="text-sm text-purple-200">Companies</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm text-purple-200">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Search Card */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">Start Your Search</h2>
                  <p className="text-purple-200">
                    Find jobs that match your skills and ambitions
                  </p>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Job title, skills, or company"
                    className="w-full px-5 py-4 bg-white/5 rounded-xl border border-white/20 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />

                  <div className="flex gap-4">
                    <select className="w-full px-5 py-4 bg-white/5 rounded-xl border border-white/20 text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400">
                      <option>Select Location</option>
                      <option>Remote</option>
                      <option>New York</option>
                      <option>London</option>
                    </select>

                    <select className="w-full px-5 py-4 bg-white/5 rounded-xl border border-white/20 text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400">
                      <option>Job Type</option>
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                    </select>
                  </div>

                  <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-shadow">
                    Find Jobs Now
                  </button>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-purple-300">Popular searches:</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[
                      "Software Engineer",
                      "Product Manager",
                      "Data Scientist",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-90">
          {["Fortune 500", "Tech Startups", "Unicorns"].map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-2 text-purple-200"
            >
              <div className="w-2 h-2 bg-purple-400 rounded-full" />
              {badge}
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
    </section>
  );
}
