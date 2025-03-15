import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createUserSchema } from "../../../../commun/validation/user-validation";
import { FiAlertCircle, FiX } from "react-icons/fi";
import { CreateUserRequest } from "../../../../types/user";
import { useUserStore } from "../../../../core/store/user-store";
import { motion } from "framer-motion";
import { FormInput } from "../../../../commun/components/input";
import { FormButton } from "../../../../commun/components/ui/button/Button";
interface UserFormProps {
    onClose: () => void;
    className?: string;
}
export const UserCreateForm = ({ onClose }:UserFormProps) => {
    const { isLoading, error, createUser } = useUserStore();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<CreateUserRequest>({ resolver: zodResolver(createUserSchema) });
    const onSubmit = async (data: CreateUserRequest) => {
       const res = await createUser(data);
       if (res) onClose();
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Create User</h2>
            <button onClick={onClose} className="text-white">
              <FiX size={20} />
            </button>
          </div>
          {error && Array.isArray(error) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 rounded-lg bg-red-500 p-4 text-sm text-red-200"
                  >
                    <div className="flex items-center gap-2">
                      <FiAlertCircle className="h-5 w-5" /> Creation Fialed
                    </div>
                    <ul className="mt-2 list-inside list-disc pl-2">
                        {error.map((errorItem, index) => (
                        <li key={index}>{Object.values(errorItem)}</li>
                        ))}
                    </ul>
                  </motion.div>
                )}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <div>
              <FormInput
                label="First Name"
                {...register("fullName.firstName")}
                placeholder="First Name"
                error={errors?.fullName?.firstName?.message}
              />
              
            </div>
  
            <div>
              <FormInput
                label="Last Name"
                {...register("fullName.lastName")}
                placeholder="Last Name"
                error={errors?.fullName?.lastName?.message}
              />
              
            </div>
  
            <div>
              <FormInput
                label="Username"
                {...register("username")}
                placeholder="Username"
                error={errors?.username?.message}
              />
             
            </div>
  
            <div>
              <FormInput
                label="Email"
                {...register("email")}
                placeholder="Email"
                error={errors?.email?.message}
              />
            </div>
  
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-500"
              >
                Cancel
              </button>
              <FormButton
                loading={isLoading}
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
              >
                Create User
              </FormButton>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }
  