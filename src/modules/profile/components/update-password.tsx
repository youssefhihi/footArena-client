import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { FiLock, FiAlertCircle, FiCheck, FiSave } from "react-icons/fi"
import { UpdatePasswordFormData, updatePasswordSchema } from "../validation/profile-validation"
import { useUserStore } from "../../../core/store/user-store"



export const UpdatePassword = () => {

  const [submitSuccess, setSubmitSuccess] = useState(false)

  const { isLoading, updatePassword, error  } = useUserStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
  })

  const handleFormSubmit = async (data: UpdatePasswordFormData) => {

    setSubmitSuccess(false)
    const res = await updatePassword(data)
    if(res) setSubmitSuccess(true)
    reset()
   
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
              Change Password
            </motion.h1>
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-2 text-blue-200"
            >
              Update your password to keep your account secure
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
                <span>Updateing Password failed</span>
              </div>
              <ul className="mt-2 list-inside list-disc pl-2">
                {error.map((errorItem, index) => (
                  <li key={index}>{Object.values(errorItem)}</li>
                ))}
              </ul>
            </motion.div>
          )}

          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-lg bg-green-500/20 p-4 text-sm text-green-200"
            >
              <div className="flex items-center gap-2">
                <FiCheck className="h-5 w-5" />
                <span>Password updated successfully!</span>
              </div>
            </motion.div>
          )}

          <motion.form
            onSubmit={handleSubmit(handleFormSubmit)}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <motion.div variants={itemVariants}>
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiLock className="h-5 w-5 text-blue-300 group-focus-within:text-blue-400" />
                </div>
                <input
                  {...register("currentPassword")}
                  type="password"
                  className="block w-full rounded-lg border border-blue-800/30 bg-blue-900/30 p-3 pl-10 text-white placeholder-blue-300 backdrop-blur-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Current Password"
                />
              </div>
              {errors.currentPassword?.message && (
                <p className="mt-1 text-sm text-red-300">{errors.currentPassword?.message}</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiLock className="h-5 w-5 text-blue-300 group-focus-within:text-blue-400" />
                </div>
                <input
                  {...register("newPassword")}
                  type="password"
                  className="block w-full rounded-lg border border-blue-800/30 bg-blue-900/30 p-3 pl-10 text-white placeholder-blue-300 backdrop-blur-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="New Password"
                />
              </div>
              {errors.newPassword?.message && (
                <p className="mt-1 text-sm text-red-300">{errors.newPassword?.message}</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiLock className="h-5 w-5 text-blue-300 group-focus-within:text-blue-400" />
                </div>
                <input
                  {...register("confirmPassword")}
                  type="password"
                  className="block w-full rounded-lg border border-blue-800/30 bg-blue-900/30 p-3 pl-10 text-white placeholder-blue-300 backdrop-blur-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Confirm New Password"
                />
              </div>
              {errors.confirmPassword?.message && (
                <p className="mt-1 text-sm text-red-300">{errors.confirmPassword?.message}</p>
              )}
            </motion.div>

            <div className="rounded-lg bg-blue-900/20 p-4 text-sm text-blue-200">
              <h4 className="mb-2 font-medium">Password Requirements:</h4>
              <ul className="list-inside list-disc space-y-1">
                <li>At least 4 characters long</li>
                <li>At least one letter</li>
                <li>At least one number</li>
              </ul>
            </div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="relative mt-2 flex w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 p-3 text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
            >
              { isLoading? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                />
              ) : (
                <>
                  <FiSave className="mr-2 h-5 w-5" />
                  <span>Update Password</span>
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </motion.div>
  )
}

