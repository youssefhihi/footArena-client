
import { FiPlus} from "react-icons/fi"
import { Button } from "./ui/Button"

import { Outlet } from "react-router-dom"
import { useTournamentStore } from "../store/tournament-store";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { eventBus } from "../../../../lib/utils/constants/eventBus";



// Tournament Management Component
export default function TournamentManagement() {
  const {fetchTournaments} = useTournamentStore();

      useEffect(() => {
          fetchTournaments();
      }, [fetchTournaments]);

      
    useEffect(() => {
      const showSuccessToast = (event: unknown) => {
        console.log(event)
        if (typeof event === "string") {
          toast.success(event)
        }
      }
      const showFailureToast = (event: unknown) => {
        console.log(event)
        if (typeof event === "string") {
          toast.error(event)
        }
      }
        eventBus.on("tournamentCreated", showSuccessToast)
        eventBus.on("tournamentNotFound", showFailureToast)

      return () => {
        eventBus.off("tournamentCreated", showSuccessToast)
        eventBus.off("tournamentNotFound", showFailureToast)
      }
    }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <h2 className="text-2xl font-bold">Tournament Management</h2>
        <Button onClick={() => console.log("Create new tournament")} icon={FiPlus}>
          Create Tournament
        </Button>
      </div>
      <Outlet />
    </div>
  )
}

