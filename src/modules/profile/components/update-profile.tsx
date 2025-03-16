import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { FiUser, FiMail, FiPhone, FiUpload, FiSave, FiAlertCircle } from "react-icons/fi"
import { UpdateProfileFormData, updateProfileSchema } from "../validation/profile-validation"
import { useAuthStore } from "../../auth/store/auth-store"
import { useUserStore } from "../../../core/store/user-store"


const url = import.meta.env.VITE_API_URL

export const UpdateProfile = () => {
  const { authUser } = useAuthStore();
   const [profileImagePreview, setProfileImagePreview] = useState<string | null>(authUser?.profileImage ? url + authUser.profileImage : null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { isLoading, updateProfile,error } = useUserStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
  })

  useEffect(() => {
    if (authUser) {
      setValue("fullName.firstName", authUser.fullName.firstName)
      setValue("fullName.lastName", authUser.fullName.lastName)
      setValue("username", authUser.username)
      setValue("email", authUser.email)
      setValue("phoneNumber", authUser.phoneNumber)
    }
  }, [authUser, setValue])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setProfileImagePreview(base64String)
        // We don't set the value in the form anymore since we'll handle the file separately
      }
      reader.readAsDataURL(file)
    }
  }
console.log(errors);
  const onSubmit = async (data: UpdateProfileFormData) => {
      const formData = new FormData()

      // Add text fields
      formData.append("firstName", data.fullName.firstName)
      formData.append("lastName", data.fullName.lastName)
      
      formData.append("username", data.username)
      formData.append("email", data.email)
      if (data.phoneNumber) {
        formData.append("phoneNumber", data.phoneNumber)
      }

      // Add file if selected
      if (selectedFile) {
        formData.append("profileImage", selectedFile)
      }

      await updateProfile(formData)
    
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
              Update Profile
            </motion.h1>
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-2 text-blue-200"
            >
              Update your personal information
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
                <span>Updateing Profile failed</span>
              </div>
              <ul className="mt-2 list-inside list-disc pl-2">
                {error.map((errorItem, index) => (
                  <li key={index}>{Object.values(errorItem)}</li>
                ))}
              </ul>
            </motion.div>
          )}
          {/* Profile Image */}
          <div className="mb-6 flex justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-blue-500 bg-blue-900/30">
                {profileImagePreview ? (
                  <img
                    src={profileImagePreview || "/placeholder.svg"}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <FiUser className="h-12 w-12 text-blue-300" />
                  </div>
                )}
              </div>
              <label
                htmlFor="profileImage"
                className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700"
              >
                <FiUpload className="h-4 w-4" />
                <input
                  type="file"
                  id="profileImage"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </motion.div>
          </div>

        

          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
            encType="multipart/form-data"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <motion.div variants={itemVariants}>
                <div className="group relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FiUser className="h-5 w-5 text-blue-300 group-focus-within:text-blue-400" />
                  </div>
                  <input
                    {...register("fullName.firstName")}
                    type="text"
                    className="block w-full rounded-lg border border-blue-800/30 bg-blue-900/30 p-3 pl-10 text-white placeholder-blue-300 backdrop-blur-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="First Name"
                  />
                </div>
                {errors.fullName?.firstName?.message && (
                  <p className="mt-1 text-sm text-red-300">{errors.fullName?.firstName?.message}</p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="group relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FiUser className="h-5 w-5 text-blue-300 group-focus-within:text-blue-400" />
                  </div>
                  <input
                    {...register("fullName.lastName")}
                    type="text"
                    className="block w-full rounded-lg border border-blue-800/30 bg-blue-900/30 p-3 pl-10 text-white placeholder-blue-300 backdrop-blur-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="Last Name"
                  />
                </div>
                {errors.fullName?.lastName?.message && (
                  <p className="mt-1 text-sm text-red-300">{errors.fullName?.lastName?.message}</p>
                )}
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiUser className="h-5 w-5 text-blue-300 group-focus-within:text-blue-400" />
                </div>
                <input
                  {...register("username")}
                  type="text"
                  className="block w-full rounded-lg border border-blue-800/30 bg-blue-900/30 p-3 pl-10 text-white placeholder-blue-300 backdrop-blur-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Username"
                />
              </div>
              {errors.username?.message && <p className="mt-1 text-sm text-red-300">{errors.username?.message}</p>}
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiMail className="h-5 w-5 text-blue-300 group-focus-within:text-blue-400" />
                </div>
                <input
                  {...register("email")}
                  type="email"
                  className="block w-full rounded-lg border border-blue-800/30 bg-blue-900/30 p-3 pl-10 text-white placeholder-blue-300 backdrop-blur-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Email"
                />
              </div>
              {errors.email?.message && <p className="mt-1 text-sm text-red-300">{errors.email?.message}</p>}
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiPhone className="h-5 w-5 text-blue-300 group-focus-within:text-blue-400" />
                </div>
                <input
                  {...register("phoneNumber")}
                  type="tel"
                  className="block w-full rounded-lg border border-blue-800/30 bg-blue-900/30 p-3 pl-10 text-white placeholder-blue-300 backdrop-blur-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Phone Number (Optional)"
                />
              </div>
              {errors.phoneNumber?.message && (
                <p className="mt-1 text-sm text-red-300">{errors.phoneNumber?.message}</p>
              )}
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="relative mt-2 flex w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 p-3 text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                />
              ) : (
                <>
                  <FiSave className="mr-2 h-5 w-5" />
                  <span>Save Changes</span>
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </motion.div>
  )
}

