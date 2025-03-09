
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import type { z } from "zod"
import { loginSchema } from "../validation/validation"
import { useAuthStore } from "../store/auth-store"
import { Role } from "../../../types/auth"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { eventBus } from "../../../commun/utils/constant/eventBus"
import { FiUser, FiLock, FiLogIn, FiAlertCircle } from "react-icons/fi"
import { FormInput } from "../../../commun/components/input"

type LoginFormData = z.infer<typeof loginSchema>

export const Login = () => {
  const navigate = useNavigate()
  const { login, isLoading, error } = useAuthStore()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    const showToast = (event: unknown) => {
      console.log(event)
      if (typeof event === "string") {
        toast.success(event)
      }
    }
      eventBus.on("showToast", showToast)
    return () => {
      eventBus.off("showToast", showToast)
    }
  }, [])

  const onSubmit = async (data: LoginFormData) => {
    const role = await login(data.usernameOrEmail, data.password)
    if (role != null)
      navigate(role === Role.ADMIN ? "/dashboard" : "/home", { state: { loginSuccess: "Login successful!" } })
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="overflow-hidden rounded-2xl bg-white/10 backdrop-blur-xl"
    >
      <div className="relative">
        {/* Top decorative element */}
        <div className="absolute -top-6 -right-6 h-12 w-32 rotate-12 bg-gradient-to-r from-blue-500 to-indigo-600 blur-xl" />

        <div className="relative p-8">
          <div className="mb-6 text-center">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-white"
            >
              Welcome Back
            </motion.h1>
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-2 text-blue-200"
            >
              Sign in to continue to your account
            </motion.p>
          </div>

          {error && Array.isArray(error) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-lg bg-red-500/20 p-4 text-sm text-red-200"
            >
              <div className="flex items-center gap-2">
                <FiAlertCircle className="h-5 w-5" />
                <span>Authentication failed</span>
              </div>
              <ul className="mt-2 list-inside list-disc pl-2">
                {error.map((errorItem, index) => (
                  <li key={index}>{Object.values(errorItem)}</li>
                ))}
              </ul>
            </motion.div>
          )}

          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-13 left-0 flex items-center pl-3">
                  <FiUser className="h-5 w-5 text-blue-300 group-focus-within:text-blue-400" />
                </div>
                <FormInput
                className="text-white"
                  {...register("usernameOrEmail")}
                  type="text"
                  label="Username or Email"
                  error={errors.usernameOrEmail?.message }
                  placeholder="Username or Email"
                />
              </div>
            
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-13 left-0 flex items-center pl-3">
                  <FiLock className="h-5 w-5 text-blue-300 group-focus-within:text-blue-400" />
                </div>
                <FormInput
                className="text-white"
                  {...register("password")}
                  label="Password"
                  type="password"
                  error={errors.password?.message}
                  placeholder="Password"
                />
              </div>
            </motion.div>
            

            <motion.div variants={itemVariants} className="flex items-center justify-between">
              <Link
                to="/auth/forget-password"
                className="text-sm font-medium text-blue-300 transition-colors hover:text-blue-200"
              >
                Forgot password?
              </Link>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                />
              ) : (
                <>
                  <FiLogIn className="mr-2 h-5 w-5" />
                  <span>Sign In</span>
                </>
              )}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center text-sm text-blue-200"
          >
            Don't have an account?{" "}
            <Link to="/auth/sign-up" className="font-medium text-blue-400 transition-colors hover:text-blue-300">
              Create account
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

