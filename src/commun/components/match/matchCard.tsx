import { Match, UpdateMatchRequest } from "../../../types/Match";
import { motion } from "framer-motion"
import { formatDate, formatTime } from "../../utils/constant/date-formater";
import { Avatar, AvatarFallback, AvatarImage } from "../../../modules/client/components/ui/avatar";
import { useState } from "react";
import { Card, CardContent } from "../ui/card/card";
import { Button } from "../../../modules/client/components/ui/button";
import { Edit, Loader2, MessageSquare } from "lucide-react";
import { Badge } from "../../../modules/client/components/ui/badge";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../modules/client/components/ui/dialog";
import { Input } from "../../../modules/client/components/ui/input";
import { Textarea } from "../../../modules/client/components/ui/textarea";
import { Label } from "../ui/label/label";
import { GiWhistle } from "react-icons/gi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateMatchSchema } from "../../validation/match-validation";
import { useMatchStore } from "../../../core/store/match-store";
interface MatchCardProps {
  match: Match;
  isOwner: boolean
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, isOwner }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editedMatch, setEditedMatch] = useState<Match>(match)
  const { updateMatch } = useMatchStore();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<UpdateMatchRequest>({
      resolver: zodResolver(updateMatchSchema),
    });
    const onSubmit = async(data: UpdateMatchRequest) => {
      console.log("Form submitted:", match, data);
     const res = await updateMatch(match.matchId,data);
     if(res){
      setEditedMatch(res)
     }
      setIsEditDialogOpen(false)
    }

  // If match is undefined, render a loading state
  if (!match) {
    return (
      <Card className="overflow-hidden bg-gray-800 border-gray-700">
        <CardContent className="p-6 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-gray-400">Loading match data...</span>
        </CardContent>
      </Card>
    )
  }


  
 

  return (
    <>
      <motion.div
        key={editedMatch.matchId}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-800 border-gray-700 rounded-xl"
      >
        <Card className="overflow-hidden ">
          <CardContent className="p-0">
            <div className="relative">
              { isOwner &&
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 text-gray-400 hover:text-white hover:bg-gray-700 z-10"
                onClick={() => setIsEditDialogOpen(true)}
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit match</span>
              </Button>
              }

              <div className="px-6 py-5">
                <div className="flex items-center justify-between">
                  <div className="flex flex-1 items-center justify-end space-x-3">
                    <span className="text-lg font-medium text-white">{editedMatch.participant1.organization.name}</span>
                    <Avatar className="h-12 w-12 border-2 border-primary">
                      <AvatarImage
                        imageUrl={editedMatch.participant1.organization.logo || "/placeholder.svg?height=48&width=48"}
                        alt={editedMatch.participant1.organization.name}
                      />
                      <AvatarFallback className="bg-primary/20 text-primary-foreground">
                        {editedMatch.participant1.organization.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {editedMatch.matchResult ? (
                    <div className="mx-6 flex flex-col items-center">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl font-bold text-white">{editedMatch.matchResult.participant1}</span>
                        <span className="text-xl text-gray-400">-</span>
                        <span className="text-3xl font-bold text-white">{editedMatch.matchResult.participant2}</span>
                      </div>
                      <Badge
                        variant="outline"
                        className="mt-1 text-xs bg-primary/10 text-primary-foreground border-primary/20"
                      >
                        Final Score
                      </Badge>
                    </div>
                  ) : (
                    <div className="mx-6 flex flex-col items-center">
                      <Badge
                        variant="outline"
                        className="px-3 py-1 text-sm bg-primary/10 text-primary-foreground border-primary/20"
                      >
                        {formatTime(editedMatch.matchTime)}
                      </Badge>
                      <span className="mt-1 text-xs text-gray-400">Upcoming</span>
                    </div>
                  )}

                  <div className="flex flex-1 items-center space-x-3">
                    <Avatar className="h-12 w-12 border-2 border-primary">
                      <AvatarImage
                        imageUrl={editedMatch.participant2.organization.logo || "/placeholder.svg?height=48&width=48"}
                        alt={editedMatch.participant2.organization.name}
                      />
                      <AvatarFallback className="bg-primary/20 text-primary-foreground">
                        {editedMatch.participant2.organization.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-lg font-medium text-white">{editedMatch.participant2.organization.name}</span>
                  </div>
                </div>

                <Separator className="my-4 bg-gray-700" />

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <GiWhistle className="mr-1.5 h-4 w-4" />
                      <span>{formatDate(editedMatch.matchTime)}</span>
                    </div>
                    {editedMatch.comments && (
                      <div className="flex items-center">
                        <MessageSquare className="mr-1.5 h-4 w-4" />
                        <span className="truncate max-w-[150px]">{editedMatch.comments}</span>
                      </div>
                    )}
                  </div>

                  {editedMatch.carts && (
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-1">
                        <Badge
                          variant="outline"
                          className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 font-medium"
                        >
                          {editedMatch.carts.participant1.yellow}
                        </Badge>
                        <Badge variant="outline" className="bg-red-500/20 text-red-300 border-red-500/30 font-medium">
                          {editedMatch.carts.participant1.red}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Badge
                          variant="outline"
                          className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 font-medium"
                        >
                          {editedMatch.carts.participant2.yellow}
                        </Badge>
                        <Badge variant="outline" className="bg-red-500/20 text-red-300 border-red-500/30 font-medium">
                          {editedMatch.carts.participant2.red}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Match Details</DialogTitle>
            <DialogDescription>
              Update the match result, cards, and comments for {editedMatch.participant1.organization.name} vs{" "}
              {editedMatch.participant2.organization.name}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}  className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">{editedMatch.participant1.organization.name}</h3>
                  <div>
                    <Label htmlFor="score1">Score</Label>
                    <Input
                      id="score1"
                      {...register("matchResult.participant1")}
                      type="number"
                      min="0"
                      
                    />
                    {errors.matchResult?.participant1 && <span className="text-red-500 text-sm ">{errors.matchResult.participant1.message}</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <Label htmlFor="yellow1">
                        <Badge className="bg-yellow-500 text-white">Yellow</Badge>
                      </Label>
                      <Input
                        id="yellow1"
                        {...register("carts.participant1.yellow")}
                        type="number"
                        min="0"
                        
                      />
                      {errors.carts?.participant1 && errors.carts?.participant1.yellow && <span className="text-red-500 text-sm ">{errors.carts.participant1.yellow.message}</span>}
                    </div>
                    <div>
                      <Label htmlFor="red1">
                        <Badge className="bg-red-500 text-white">Red</Badge>
                      </Label>
                      <Input
                        id="red1"
                        {...register("carts.participant1.red")}
                        type="number"
                        min="0"
                        
                      />
                      {errors.carts?.participant1?.red && <span className="text-red-500 text-sm ">{errors.carts.participant1.red.message}</span>}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">{editedMatch.participant2.organization.name}</h3>
                  <div>
                    <Label htmlFor="score2">Score</Label>
                    <Input
                      id="score2"
                      {...register("matchResult.participant2")}
                      type="number"
                      min="0"
                      
                    />
                    {errors.matchResult?.participant2 && errors.matchResult?.participant2 && <span className="text-red-500 text-sm ">{errors.matchResult.participant2.message}</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <Label htmlFor="yellow2">
                        <Badge className="bg-yellow-500 text-white">Yellow</Badge>
                      </Label>
                      <Input
                        id="yellow2"
                        {...register("carts.participant2.yellow")}
                        type="number"
                        min="0"
                        
                      />
                      {errors.carts?.participant2 && errors.carts?.participant2.yellow && <span className="text-red-500 text-sm ">{errors.carts.participant2.yellow.message}</span>}
                    </div>
                    <div>
                      <Label htmlFor="red2">
                        <Badge className="bg-red-500 text-white">Red</Badge>
                      </Label>
                      <Input
                        id="red2"
                        {...register("carts.participant2.red")}
                        type="number"
                        min="0"
                        
                      />
                      {errors.carts?.participant2 && errors.carts?.participant2.red && <span className="text-red-500 text-sm ">{errors.carts.participant2.red.message}</span>}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="comments">Comments</Label>
                <Textarea
                  id="comments"
                  {...register("comments")}
                  placeholder="Add match comments here..."
                  className="resize-none"
                  
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

