
import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FiCalendar, FiUsers, FiArrowRight, FiCheck, FiBarChart2, FiGlobe, FiStar } from "react-icons/fi"
import { GiSoccerBall, GiWhistle, GiTrophyCup } from "react-icons/gi"
import logo from "../../assets/imgs/logo.png"
import auth from "../../assets/imgs/auth.png"
import { BsFillTrophyFill } from "react-icons/bs"
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

const LandingPage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  // Mock testimonials data
  const testimonials = [
    {
      name: "Carlos Mendez",
      role: "Tournament Director",
      image: "/placeholder.svg?height=80&width=80",
      quote:
        "This platform has revolutionized how we manage our regional tournaments. The automated scheduling and real-time updates have saved us countless hours.",
    },
    {
      name: "Sarah Johnson",
      role: "Club Manager",
      image: "/placeholder.svg?height=80&width=80",
      quote:
        "The team management features are exceptional. We can easily track player statistics, manage registrations, and communicate with everyone in one place.",
    },
    {
      name: "Ahmed Al-Farsi",
      role: "National League Coordinator",
      image: "/placeholder.svg?height=80&width=80",
      quote:
        "We've been able to scale our operations significantly since adopting this platform. The analytics and reporting tools provide invaluable insights.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1929] to-[#0f2942]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a1929]/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-blue-200 hover:text-white transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-blue-200 hover:text-white transition-colors">
                How It Works
              </a>
              <a href="#testimonials" className="text-blue-200 hover:text-white transition-colors">
                Testimonials
              </a>
              <a href="#pricing" className="text-blue-200 hover:text-white transition-colors">
                Pricing
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/auth/sign-in" className="text-blue-200 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link
                to="/auth/sign-up"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 mb-10 md:mb-0"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                variants={fadeIn}
              >
                Manage Football Tournaments with Ease
              </motion.h1>

              <motion.p className="text-xl text-blue-200 mb-8" variants={fadeIn}>
                The complete platform for organizing, managing, and tracking football competitions of any size.
              </motion.p>

              <motion.div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4" variants={fadeIn}>
                <Link
                  to="/auth/sign-up"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-center transition-colors flex items-center justify-center"
                >
                  Start Free Trial
                  <FiArrowRight className="ml-2" />
                </Link>

                <a
                  href="#how-it-works"
                  className="border border-blue-400 text-blue-200 hover:bg-blue-900/30 px-8 py-3 rounded-lg text-center transition-colors"
                >
                  Learn More
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-30"></div>
                <div className="relative bg-[#0c223a] p-2 rounded-2xl overflow-hidden">
                  <img
                    src={auth}
                    alt="FIFA Competition Manager Dashboard"
                    className="rounded-lg w-full"
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
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 bg-[#071525]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-xl text-blue-200 font-medium">Trusted by organizations worldwide</h2>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {["UEFA", "CONMEBOL", "Premier League", "La Liga", "Bundesliga"].map((org, index) => (
              <div key={index} className="text-gray-400 text-xl font-bold">
                {org}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Powerful Features</h2>
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
            {[
              {
                icon: <FiCalendar className="h-8 w-8" />,
                title: "Smart Scheduling",
                description:
                  "Automatically generate optimal match schedules based on venues, teams, and time constraints.",
              },
              {
                icon: <FiUsers className="h-8 w-8" />,
                title: "Team Management",
                description:
                  "Easily manage team registrations, player profiles, and participation across multiple tournaments.",
              },
              {
                icon: <GiWhistle className="h-8 w-8" />,
                title: "Referee Assignment",
                description:
                  "Assign and manage referees for all matches with conflict detection and workload balancing.",
              },
              {
                icon: <FiBarChart2 className="h-8 w-8" />,
                title: "Live Statistics",
                description: "Track and display real-time statistics, standings, and player performance metrics.",
              },
              {
                icon: <FiGlobe className="h-8 w-8" />,
                title: "Public Tournament Pages",
                description: "Create beautiful public-facing tournament pages with fixtures, results, and standings.",
              },
              {
                icon: <GiTrophyCup className="h-8 w-8" />,
                title: "Tournament Templates",
                description:
                  "Save and reuse tournament formats including group stages, knockouts, and round-robin systems.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-[#0c223a] p-6 rounded-xl border border-blue-900/50 hover:border-blue-600/50 transition-colors"
                variants={fadeIn}
              >
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 w-16 h-16 rounded-lg flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-blue-200">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-[#071525]">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Get your tournament up and running in just a few simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              className="order-2 md:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-8">
                {[
                  {
                    number: "01",
                    title: "Create Your Tournament",
                    description: "Set up your tournament structure, add divisions, and configure rules and settings.",
                  },
                  {
                    number: "02",
                    title: "Add Teams & Players",
                    description:
                      "Register teams and players manually or let them sign up through your tournament page.",
                  },
                  {
                    number: "03",
                    title: "Generate Schedule",
                    description: "Our smart algorithm creates the optimal schedule based on your requirements.",
                  },
                  {
                    number: "04",
                    title: "Manage & Track",
                    description: "Record match results, track statistics, and keep everyone updated in real-time.",
                  },
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    className="flex"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="mr-6">
                      <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold">
                        {step.number}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-blue-200">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="order-1 md:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-30"></div>
                <div className="relative bg-[#0c223a] p-2 rounded-2xl overflow-hidden">
                  <img
                    src="/placeholder.svg?height=500&width=500"
                    alt="Tournament Creation Process"
                    className="rounded-lg w-full"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Users Say</h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Join thousands of satisfied tournament organizers worldwide
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className={`bg-[#0c223a] p-8 rounded-xl border border-blue-900/50 ${
                    activeTestimonial === index ? "block" : "hidden"
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center mb-6">
                    <div className="mr-4">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                      <p className="text-blue-300">{testimonial.role}</p>
                    </div>
                    <div className="ml-auto flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <blockquote className="text-lg text-blue-100 italic">"{testimonial.quote}"</blockquote>
                </motion.div>
              ))}

              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full ${activeTestimonial === index ? "bg-blue-600" : "bg-blue-900"}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-[#071525]">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">Choose the plan that fits your tournament needs</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                name: "Starter",
                price: "$49",
                period: "per month",
                description: "Perfect for small clubs and local tournaments",
                features: [
                  "Up to 20 teams",
                  "Basic scheduling",
                  "Team management",
                  "Public tournament page",
                  "Email support",
                ],
                cta: "Get Started",
                highlighted: false,
              },
              {
                name: "Professional",
                price: "$99",
                period: "per month",
                description: "Ideal for regional leagues and competitions",
                features: [
                  "Up to 100 teams",
                  "Advanced scheduling",
                  "Referee management",
                  "Custom branding",
                  "Live statistics",
                  "Priority support",
                ],
                cta: "Get Started",
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "pricing",
                description: "For national associations and large tournaments",
                features: [
                  "Unlimited teams",
                  "API access",
                  "Advanced analytics",
                  "Multi-tournament management",
                  "Dedicated account manager",
                  "24/7 support",
                ],
                cta: "Contact Us",
                highlighted: false,
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                className={`rounded-xl overflow-hidden ${
                  plan.highlighted ? "border-2 border-blue-600 scale-105 relative z-10" : "border border-blue-900/50"
                }`}
                variants={fadeIn}
              >
                {plan.highlighted && (
                  <div className="bg-blue-600 text-white text-center py-1 text-sm font-medium">Most Popular</div>
                )}

                <div className={`p-8 ${plan.highlighted ? "bg-[#0c223a]" : "bg-[#0a1929]"}`}>
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    <span className="text-blue-300 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-blue-200 mb-6">{plan.description}</p>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <FiCheck className="text-blue-400 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-blue-100">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      plan.highlighted
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-blue-900/50 hover:bg-blue-800 text-blue-100"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
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
                <Link
                  to="/auth/sign-up"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg text-center transition-colors font-medium"
                >
                  Start Free Trial
                </Link>
                <a
                  href="#"
                  className="border border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg text-center transition-colors"
                >
                  Schedule Demo
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#071525]">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
              <p className="text-blue-300 mb-4">
                The complete platform for organizing, managing, and tracking football competitions of any size.
              </p>
              <div className="flex space-x-4">{/* Social media icons would go here */}</div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-300 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-300 hover:text-white transition-colors">
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

