import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { generateMatchesSchema } from "../../validation/match-validation";
import { MatchRequest } from "../../../types/Match";
import { useMatchStore } from "../../../core/store/match-store";
import { FormButton } from "../ui/button/Button";
import { FormInput } from "../input";
import { Button } from "../../../modules/client/components/ui/button";


interface MatchFormProps {
  tournamentId: string;
  onCancel: () => void;

}

export const MatchForm: React.FC<MatchFormProps> = ({ tournamentId,onCancel }) => {
    const {isLoading,generateTournamentMatches}   = useMatchStore();  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MatchRequest>({
    resolver: zodResolver(generateMatchesSchema),
  });

  const onSubmit = async(data: MatchRequest) => {
     const generated =  await generateTournamentMatches(tournamentId,data);
     if(generated){
      window.location.reload();
     }else{
      onCancel();
     } 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-xl rounded-lg bg-gray-800 p-6 shadow-xl"
    >
      <h2 className="text-xl font-bold mb-4">Match Configuration</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Start Time */}
        <div>
          <FormInput
            label="Start Time"
            type="datetime-local"
            {...register("startTime")}
            error={errors.startTime?.message}
          />
        </div>

        {/* Interval Days */}
        <div>
          <FormInput
            type="number"
            {...register("intervalDays", { valueAsNumber: true })}
            error={errors.intervalDays?.message}
            label="Interval Days"
          />
        </div>

        {/* Matches Per Day */}
        <div className="flex justify-between space-x-4">
          <FormInput
            type="number"
            {...register("matchesPerDay", { valueAsNumber: true })}
            label="Matches Per Day"
            error={errors.matchesPerDay?.message}
          />
            {/* Round Gap Hours */}
           <FormInput
            type="number"
            label="Round Gap Hours"
            {...register("roundGapHours", { valueAsNumber: true })}
            error={errors.roundGapHours?.message}
          />
        </div>

        {/* Submit Button */}
        <div className="flex space-x-10 w-full px-5">
        <Button type="button" onClick={onCancel} className="w-1/2" variant="danger">cancel </Button>
        <FormButton className="w-1/2" type="submit" loading={isLoading} >Generate Matches</FormButton>
        </div>
      </form>
    </motion.div>
    </div>
  );
};

export default MatchForm;
