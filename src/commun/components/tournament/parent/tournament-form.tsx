import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiAlertCircle, FiSave } from "react-icons/fi";
import ReactQuill from 'react-quill-new';
import "react-quill/dist/quill.snow.css";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { TournamentRequest } from "../../../../types/tournament";
import { createTournamentSchema } from "../../../validation/tournament";
import { useTournamentStore } from "../../../../core/store/tournament-store";
import { eventBus } from "../../../utils/constant/eventBus";
import { FormInput } from "../../input";
import { Button } from "../Button";


export default function Form(){
  const { tournamentId } = useParams<{ tournamentId: string }>();
  const isEditMode = Boolean(tournamentId);
  const { isLoading, error, createTournament, updateTournament, getTournamentById } = useTournamentStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TournamentRequest>({
    resolver: zodResolver(createTournamentSchema),
    defaultValues: {
      title: "",
      description: "",
      maxParticipants: 0,
      isTeams: false,
      startTime: new Date(),
    },
  });

  useEffect(() => {
    console.log("is",isEditMode)
    if (isEditMode) {
      const fetchTournament = async () => {
        const tournament = await getTournamentById(tournamentId!);
        if (tournament) {
          console.log(tournament)
          setValue("title", tournament.title);
          setValue("description", tournament.description);
          setValue("maxParticipants", tournament.maxParticipants);
          setValue("isTeams", tournament.isTeams);
          setValue("startTime", new Date(tournament.startTime));
        }
      };
      fetchTournament();
    }
  }, [tournamentId, isEditMode, setValue, getTournamentById]);

  const onSubmit = async (data: TournamentRequest) => {
    if (isEditMode) {
      const updated = await updateTournament(tournamentId!, data);
      if (updated) {
        eventBus.emit("tournamentUpdated", "Tournament updated successfully!");
        navigate(-1);
      }
    } else {
      const created = await createTournament(data);
      if (created) {
        eventBus.emit("tournamentCreated", "Tournament created successfully!");
        navigate(-1);
      }
    }
  };
  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }


  return (
    <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="overflow-hidden rounded-2xl bg-white/10 backdrop-blur-xl max-w-2xl mx-auto px-6 py-3 "
    >      
          <div className="relative">
        {/* Top decorative element */}
    <div className="absolute -top-6 -right-6 h-12 w-32 rotate-12 bg-gradient-to-r from-blue-500 to-indigo-600 blur-xl" />

        <div className="relative p-8">
      <h2 className="text-2xl font-bold mb-6 text-white">
        {isEditMode ? "Edit Tournament" : "Create New Tournament"}
      </h2>
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
        <motion.form
            onSubmit={handleSubmit(onSubmit)}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
        <FormInput label="Title" {...register("title")} error={errors.title?.message} />

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

        <FormInput
          label="Max Participants"
          type="number"
          {...register("maxParticipants", { valueAsNumber: true })}
          error={errors.maxParticipants?.message}
        />

        <div className="mb-4">
          <FormInput
            label="Is Teams Tournament"
            type="checkbox"
            {...register("isTeams")}
            error={errors.isTeams?.message}
          />
        </div>

        <FormInput
          label="Start Time"
          type="datetime-local"
          {...register("startTime", {
            setValueAs: (v: string) => (v ? new Date(v) : undefined),
          })}
          error={errors.startTime?.message}
        />

        <Button onClick={() => {}} disabled={isLoading} icon={FiSave}>
          {isLoading ? (isEditMode ? "Updating..." : "Creating...") : (isEditMode ? "Update Tournament" : "Create Tournament")}
        </Button>
      </motion.form>
      </div>
      </div>
    </motion.div>
    </div>
  );
};

