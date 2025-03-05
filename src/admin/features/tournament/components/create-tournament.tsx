import { motion } from "framer-motion"
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiAlertCircle, FiSave } from "react-icons/fi";
import ReactQuill from 'react-quill-new';
import "react-quill/dist/quill.snow.css";
import { TournamentRequest } from "../../../../types/tournament";
import { createTournamentSchema } from "../validation/tournament-validation";
import { Input } from "../../../../components/ui/input/input";
import { Button } from "./ui/Button";
import { useTournamentStore } from "../store/tournament-store";

export const CreateTournament: React.FC = () => {
  const {isLoading, error, createTournament} = useTournamentStore();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TournamentRequest>({
    resolver: zodResolver(createTournamentSchema),
  });

  const onSubmit = async (data: TournamentRequest) => {
      await createTournament(data);    
  };

  return (
    <div className="max-w-2xl mx-auto  p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">Create New Tournament</h2>
      {error && Array.isArray(error) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-lg bg-red-500 p-4 text-sm text-red-200"
            >
              <div className="flex items-center gap-2">
                <FiAlertCircle className="h-5 w-5" />
              </div>
              <ul className="mt-2 list-inside list-disc pl-2">
                {error.map((errorItem, index) => (
                  <li key={index}>{Object.values(errorItem)}</li>
                ))}
              </ul>
            </motion.div>
          )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input label="Title" {...register("title")} error={errors.title?.message} />

        <div className="mb-4">
          <label className="block text-sm font-medium text-white mb-1">
            Description
          </label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <ReactQuill
                value={field.value}
                onChange={field.onChange}
                className="text-white rounded-md"
              />
            )}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        <Input
          label="Max Participants"
          type="number"
          {...register("maxParticipants", { valueAsNumber: true })}
          error={errors.maxParticipants?.message}
        />

        <div className="mb-4">
            <Input
            label="Is Teams Tournament"
              type="checkbox"
              {...register("isTeams")}
              error={errors.isTeams?.message}
            />
        </div>

        <Input
          label="Start Time"
          type="datetime-local"
          {...register("startTime", {
            setValueAs: (v: string) => (v ? new Date(v) : undefined),
          })}
          error={errors.startTime?.message}
        />

        <Button onClick={() => {}} disabled={isLoading} icon={FiSave}>
          {isLoading ? "Creating..." : "Create Tournament"}
        </Button>
      </form>
    </div>
  );
};
