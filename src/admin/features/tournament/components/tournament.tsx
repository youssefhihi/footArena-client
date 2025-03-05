
import { FiPlus} from "react-icons/fi"
import { Button } from "./ui/Button"

import { Outlet } from "react-router-dom"



// Tournament Management Component
export default function TournamentManagement() {
  

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

