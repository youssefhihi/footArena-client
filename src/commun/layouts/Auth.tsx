
import { Outlet, useLocation } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { AnimatePresence, motion } from "framer-motion"
import authImage from "../../assets/imgs/auth.png"
import logo from "../../assets/imgs/logo.png"


export function Auth() {
  const location = useLocation()

  return (
    <div
    style={{
      backgroundImage: `url(${authImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
     className="relative h-full overflow-hidden bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      

      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900/70 via-indigo-900/70 to-violet-900/70" />

      {/* Animated shapes */}
      <motion.div
        className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-green-600 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 -right-20 h-64 w-64 rounded-full bg-green-600 blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4">
        {/* FIFA Logo */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-8 flex items-center justify-center"
        >
          <img src={logo} alt="FIFA Logo" className="h-16" />
          <div className="ml-4 border-l-2 border-white/20 pl-4">
            <h1 className="text-2xl font-bold text-white">Competition Manager</h1>
            <p className="text-sm text-blue-200">Manage your FIFA tournaments with ease</p>
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 text-center text-sm text-blue-200/60"
        >
          &copy; {new Date().getFullYear()} FIFA Competition Manager. All rights reserved.
        </motion.div>
      </div>
    </div>
  )
}

export default Auth

