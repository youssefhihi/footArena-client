import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  FiArrowRight,
  FiCheck,
  FiShield,
  FiUsers,
  FiBarChart2,
  FiGlobe,
  FiCalendar,
  FiClock,
} from "react-icons/fi"
import { GiSoccerBall, GiWhistle, GiTrophyCup } from "react-icons/gi"
import { useAuthStore } from "../auth/store/auth-store"
import { Role } from "../../types/user"
import { BsFillTrophyFill } from "react-icons/bs"
import  logo  from "../../assets/imgs/logo.png"
import  landingPageImg  from "../../assets/imgs/landingPage.png"
import  landingPageImg1  from "../../assets/imgs/landingPage1.png"
import  rankingImg  from "../../assets/imgs/ranking.png"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}
const cards= [
  {
    icon: <FiCalendar className="h-8 w-8" />,
    title: "Create & Manage Tournaments",
    description: "Easily create your own tournaments for free and manage every aspect from a single platform.",
    color: "from-blue-600 to-blue-400",
  },
  {
    icon: <GiWhistle className="h-8 w-8" />,
    title: "Automated Match Generation",
    description: "Automatically generate fair match schedules based on tournament format and participant availability.",
    color: "from-purple-600 to-purple-400",
  },
  {
    icon: <FiBarChart2 className="h-8 w-8" />,
    title: "Automated Rankings",
    description: "Track and update rankings dynamically as matches are played, with real-time leaderboard updates.",
    color: "from-green-600 to-green-400",
  },
  {
    icon: <FiGlobe className="h-8 w-8" />,
    title: "Create Your Own Organization",
    description: "Build your own club or organization, manage members, and participate in tournaments together.",
    color: "from-cyan-600 to-cyan-400",
  },
  {
    icon: <FiUsers className="h-8 w-8" />,
    title: "Participant Management",
    description: "Add, remove, and manage participants effortlessly to ensure smooth competition organization.",
    color: "from-indigo-600 to-indigo-400",
  },
  {
    icon: <FiShield className="h-8 w-8" />,
    title: "Secure & Reliable",
    description: "Enjoy a secure platform with reliable data storage and role-based access for better control.",
    color: "from-red-600 to-red-400",
  },
 
]
const LandingPage = () => {
  const { authUser, getAuthUser } = useAuthStore()
  const navigate = useNavigate()

  // Redirect based on role if user is authenticated
  useEffect(() => {
    if (!authUser) {
      getAuthUser();
    }
  }, [authUser, getAuthUser])

  // Handle dashboard navigation based on user role
  const handleDashboardClick = () => {
    if (authUser) {
      navigate(authUser.role === Role.ADMIN ? "/a/dashboard" : "/c/dashboard")
    } else {
      navigate("/auth/sign-in")
    }
  }

  return (
    <div className="min-h-screen bg-[#0a1929] text-white">
      {/* Header/Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a1929]/90 backdrop-blur-md border-b border-blue-900/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src={logo} alt="Foot Arena" className="h-10 rounded-full"/>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-blue-200 hover:text-white transition-colors">
                Features
              </a>
              <a href="#tournaments" className="text-blue-200 hover:text-white transition-colors">
                Tournaments
              </a>
              <a href="#stats" className="text-blue-200 hover:text-white transition-colors">
                Statistics
              </a>
            </div>

            <div className="flex items-center space-x-4">
              {authUser ? (
                <button
                  onClick={handleDashboardClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Go to Dashboard
                </button>
              ) : (
                <>
                  <Link to="/auth/sign-in" className="text-blue-200 hover:text-white transition-colors">
                    Sign In
                  </Link>
                  <Link
                    to="/auth/sign-up"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-blue-900/20 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-radial from-indigo-900/20 to-transparent"></div>
        </div>

        {/* Soccer ball animation */}
        <motion.div
          className="absolute top-1/4 right-10 text-blue-500/10"
          animate={{
            y: [0, 20, 0],
            rotate: [0, 360],
          }}
          transition={{
            y: { duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
            rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          }}
        >
          <GiSoccerBall className="w-40 h-40" />
        </motion.div>

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div
              className="lg:w-1/2 mb-10 lg:mb-0"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                variants={fadeIn}
              >
                Elevate Your <span className="text-blue-400">Football Tournaments</span> to the Next Level
              </motion.h1>

              <motion.p className="text-xl text-blue-200 mb-8" variants={fadeIn}>
                The ultimate platform for organizing, managing, and tracking football competitions with professional
                tools.
              </motion.p>

              <motion.div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4" variants={fadeIn}>
                <button
                  onClick={handleDashboardClick}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg text-center transition-all flex items-center justify-center shadow-lg shadow-blue-600/20"
                >
                  {authUser ? "Go to Dashboard" : "Start Free Trial"}
                  <FiArrowRight className="ml-2" />
                </button>

                <a
                  href="#features"
                  className="border border-blue-400 text-blue-200 hover:bg-blue-900/30 px-8 py-3 rounded-lg text-center transition-colors"
                >
                  Explore Features
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 lg:pl-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-30"></div>
                <div className="relative bg-[#0c223a] p-2 rounded-2xl overflow-hidden border border-blue-900/50">
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900/70 via-indigo-900/70 to-violet-900/70" />
                <img
                    src={landingPageImg}
                    alt="Foot Arean"
                    className="rounded-lg w-full bg-cover "
                  />
                </div>

                {/* Floating elements */}
                <motion.div
                  className="absolute -right-4 -bottom-4 bg-blue-600 text-white p-3 rounded-lg shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                >
                  <BsFillTrophyFill className="h-8 w-8" />
                </motion.div>

                <motion.div
                  className="absolute -left-4 top-1/4 bg-indigo-600 text-white p-3 rounded-lg shadow-lg"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 }}
                >
                  <GiSoccerBall className="h-8 w-8" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 bg-blue-900/20 rounded-xl p-6 border border-blue-900/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">10,000+</div>
              <div className="text-blue-300 text-sm">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">5,000+</div>
              <div className="text-blue-300 text-sm">Tournaments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">50,000+</div>
              <div className="text-blue-300 text-sm">Matches</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">100+</div>
              <div className="text-blue-300 text-sm">Countries</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gradient-to-b from-[#0a1929] to-[#0c223a]">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Powerful Tournament Management</h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Everything you need to run successful football tournaments from start to finish
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {cards.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-[#0c223a] p-6 rounded-xl border border-blue-900/50 hover:border-blue-600/50 transition-colors group"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div
                  className={`bg-gradient-to-r ${feature.color} w-16 h-16 rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-blue-200">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tournaments Section */}
      <section id="tournaments" className="py-20 px-6 bg-[#0a1929]">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div
              className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Create and Manage Tournaments with Ease
              </h2>
              <p className="text-xl text-blue-200 mb-8">
                From small local competitions to large international tournaments, our platform scales to meet your
                needs.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: <GiTrophyCup className="h-6 w-6" />,
                    title: "League Tournament ",
                    description: "Support for league tournament structures.",
                  },
                  {
                    icon: <FiClock className="h-6 w-6" />,
                    title: "Automated Progression",
                    description: "Automatic team advancement between tournament stages based on results.",
                  },
                  {
                    icon: <FiUsers className="h-6 w-6" />,
                    title: "Team Registration",
                    description: "Self-service team registration with approval workflows.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="bg-blue-600/20 p-3 rounded-lg text-blue-400 mr-4">{item.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-blue-200">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <button
                  onClick={handleDashboardClick}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg transition-all flex items-center"
                >
                  {authUser ? "Manage Your Tournaments" : "Create Your First Tournament"}
                  <FiArrowRight className="ml-2" />
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-30"></div>
                <div className="relative bg-[#0c223a] p-2 rounded-2xl overflow-hidden border border-blue-900/50">
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900/70 via-indigo-900/70 to-violet-900/70" />

                  <img
                    src={landingPageImg1}
                    alt="Tournament Creation Process"
                    className="rounded-lg w-full"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="stats" className="py-20 px-6 bg-gradient-to-b from-[#0c223a] to-[#0a1929]">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Comprehensive Statistics & Analytics</h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Track performance, analyze trends, and make data-driven decisions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-30"></div>
                <div className="relative bg-[#0c223a] p-2 rounded-2xl overflow-hidden border border-blue-900/50">
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900/70 via-indigo-900/70 to-violet-900/70" />
                  <img
                    src={rankingImg}
                    alt="Statistics Dashboard"
                    className="rounded-lg w-full"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Powerful Insights at Your Fingertips</h3>

              <div className="space-y-4">
                {[
                  "match statistics and performance metrics",
                  "Team and player performance analytics",
                  "Tournament progression",
                  "Historical data analysis and trend identification",
                  "Customizable reports and data export options",
                  "Comparative analysis across tournaments and seasons",
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="bg-green-500/20 p-1 rounded-full text-green-400 mr-3">
                      <FiCheck className="h-5 w-5" />
                    </div>
                    <p className="text-blue-100">{item}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <button
                  onClick={handleDashboardClick}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg transition-all flex items-center mt-4"
                >
                  {authUser ? "View Your Statistics" : "Explore Analytics Features"}
                  <FiArrowRight className="ml-2" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#0a1929] to-[#071525]">
        <div className="container mx-auto">
          <motion.div
            className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Tournament Management?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of tournament organizers who have simplified their competition management.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleDashboardClick}
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg text-center transition-colors font-medium"
                >
                  {authUser ? "Go to Dashboard" : "Start Free Trial"}
                </button>
                <a
                  href="#features"
                  className="border border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg text-center transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#071525] border-t border-blue-900/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src={logo} alt="Foot Arena" className="mb-4 h-10 rounded-full" />
              <p className="text-blue-300 mb-4">
                The complete platform for organizing, managing, and tracking football competitions of any size.
              </p>
              <div className="flex space-x-4">{/* Social media icons would go here */}</div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-blue-300 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-blue-300 hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-300 hover:text-white transition-colors">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-300 hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-300 hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-300 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-300 hover:text-white transition-colors">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-300 hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-300 hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-300 hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-300 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-300 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-900/50 pt-8 text-center">
            <p className="text-blue-400">
              &copy; {new Date().getFullYear()} FIFA Competition Manager. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

