"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate, useSearchParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import type { z } from "zod"
import { updatePasswordSchema } from "../validation/validation"
import { useAuthStore } from "../store/auth-store"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { eventBus } from "../../../lib/utils/constants/eventBus"
import { FiLock, FiAlertCircle, FiCheckCircle } from "react-icons/fi"

type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>

export const UpdatePassword = () => {
  const { updatePassword, isLoading, error } = useAuthStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
  })

  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing token!")
      navigate("/auth/sign-in")
    }
  }, [token, navigate])

  const onSubmit = async (data: UpdatePasswordFormData) => {
    const { newPassword } = data
    const success = await updatePassword({ newPassword, token: token ?? "" })
    if (success) {
      eventBus.emit("passwordUpdated", "Password updated successfully try to login now!")
      navigate("/auth/sign-in")
    }
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
              Reset Password
            </motion.h1>
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-2 text-blue-200"
            >
              Create a new password for your account
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
                <span>Password reset failed</span>
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
                  <FiLock className="h-5 w-5 text-blue-300 group-focus-within:text-blue-400" />
                </div>
                <input
                  {...register("newPassword")}
                  type="password"
                  className="block w-full rounded-lg border border-blue-800/30 bg-blue-900/30 p-4 pl-10 text-white placeholder-blue-300 backdrop-blur-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="New Password"
                />
              </div>
              {errors.newPassword?.message && (
                <p className="mt-2 text-sm text-red-300">{errors.newPassword?.message}</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-13 left-0 flex items-center pl-3">
                  <FiLock className="h-5 w-5 text-blue-300 group-focus-within:text-blue-400" />
                </div>
                <input
                  {...register("confirmPassword")}
                  type="password"
                  className="block w-full rounded-lg border border-blue-800/30 bg-blue-900/30 p-4 pl-10 text-white placeholder-blue-300 backdrop-blur-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Confirm Password"
                />
              </div>
              {errors.confirmPassword?.message && (
                <p className="mt-2 text-sm text-red-300">{errors.confirmPassword?.message}</p>
              )}
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
                  <FiCheckCircle className="mr-2 h-5 w-5" />
                  <span>Reset Password</span>
                </>
              )}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-center text-sm text-blue-200"
          >
            Remember your password?{" "}
            <Link to="/auth/sign-in" className="font-medium text-blue-400 transition-colors hover:text-blue-300">
              Back to Sign In
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

