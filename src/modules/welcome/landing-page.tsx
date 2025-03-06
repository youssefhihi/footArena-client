import { motion } from "framer-motion"
import { BsFillTrophyFill } from "react-icons/bs"
import { FiCalendar, FiUsers, FiArrowRight } from "react-icons/fi"
import { Link } from "react-router-dom"

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600">FootballTourneys</div>
            <div className="hidden md:flex space-x-4">
              <Link to="/tournaments" className="text-blue-600 hover:text-blue-800">
                Tournaments
              </Link>
              <Link to="/dashboard" className="text-blue-600 hover:text-blue-800">
                Dashboard
              </Link>
              <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Login
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
          
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-blue-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Organize and Join Football Tournaments
            </motion.h1>
            <motion.p
              className="text-xl text-green-700 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Create, manage, and participate in football tournaments with ease.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                to="/tournaments"
                className="bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300"
              >
                Explore Tournaments
              </Link>
            </motion.div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            <motion.img
              src="/football-hero.jpg"
              alt="Football Tournament"
              className="rounded-lg shadow-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <section className="mt-24">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Why Choose FootballTourneys?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FiCalendar,
                title: "Easy Scheduling",
                description: "Effortlessly plan and schedule your tournaments.",
              },
              {
                icon: FiUsers,
                title: "Team Management",
                description: "Manage teams and players with just a few clicks.",
              },
              {
                icon: BsFillTrophyFill,
                title: "Live Results",
                description: "Real-time updates on matches and tournament progress.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <feature.icon className="text-4xl text-green-600 mb-4" />
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{feature.title}</h3>
                <p className="text-green-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-green-700 mb-8">
            Join thousands of football enthusiasts and start your tournament journey today!
          </p>
          <Link
            to="/auth/signup"
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 inline-flex items-center"
          >
            Sign Up Now
            <FiArrowRight className="ml-2" />
          </Link>
        </section>
      </main>

      <footer className="bg-blue-800 text-white mt-24">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold mb-4 md:mb-0">FootballTourneys</div>
            <div className="flex space-x-4">
              <Link to="/about" className="hover:text-green-300">
                About
              </Link>
              <Link to="/contact" className="hover:text-green-300">
                Contact
              </Link>
              <Link to="/privacy" className="hover:text-green-300">
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">© 2023 FootballTourneys. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage