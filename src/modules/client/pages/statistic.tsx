import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Trophy, Target, Clock, Award } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger }from "../components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { StatCard } from "../components/ui/StatCard"

// Mock data for statistics
const performanceData = [
  { name: "Jan", wins: 4, losses: 1, draws: 1 },
  { name: "Feb", wins: 3, losses: 2, draws: 0 },
  { name: "Mar", wins: 5, losses: 0, draws: 2 },
  { name: "Apr", wins: 2, losses: 3, draws: 1 },
  { name: "May", wins: 6, losses: 1, draws: 0 },
  { name: "Jun", wins: 4, losses: 2, draws: 1 },
]

const tournamentResultsData = [
  { name: "1st Place", value: 8, color: "#22c55e" },
  { name: "2nd Place", value: 5, color: "#3b82f6" },
  { name: "3rd Place", value: 3, color: "#f59e0b" },
  { name: "Other", value: 4, color: "#94a3b8" },
]

const recentMatchesData = [
  { opponent: "FC Barcelona", result: "Win", score: "3-1", date: "2023-06-15" },
  { opponent: "Real Madrid", result: "Loss", score: "1-2", date: "2023-06-08" },
  { opponent: "Manchester City", result: "Win", score: "2-0", date: "2023-05-30" },
  { opponent: "Bayern Munich", result: "Draw", score: "2-2", date: "2023-05-22" },
  { opponent: "Liverpool", result: "Win", score: "3-2", date: "2023-05-15" },
]

export default function Statistics() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Player Statistics</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Wins"
          value="24"
          icon={<Trophy className="h-6 w-6 text-green-600" />}
          change="+3"
          changeText="from last month"
        />
        <StatCard
          title="Win Rate"
          value="68%"
          icon={<Target className="h-6 w-6 text-blue-600" />}
          change="+5%"
          changeText="from last month"
        />
        <StatCard
          title="Avg. Match Duration"
          value="87 min"
          icon={<Clock className="h-6 w-6 text-green-600" />}
          change="-3 min"
          changeText="from average"
        />
        <StatCard
          title="Tournaments Won"
          value="8"
          icon={<Award className="h-6 w-6 text-blue-600" />}
          change="+1"
          changeText="from last season"
        />
      </div>

      <Tabs defaultValue="performance">
        <TabsList className="grid w-full grid-cols-2 md:w-auto">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="tournaments">Tournament Results</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance</CardTitle>
              <CardDescription>Win/loss record over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="wins" stackId="a" fill="#22c55e" name="Wins" />
                    <Bar dataKey="losses" stackId="a" fill="#ef4444" name="Losses" />
                    <Bar dataKey="draws" stackId="a" fill="#94a3b8" name="Draws" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Matches */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Matches</CardTitle>
              <CardDescription>Your last 5 matches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 text-left font-medium">Opponent</th>
                      <th className="pb-2 text-left font-medium">Result</th>
                      <th className="pb-2 text-left font-medium">Score</th>
                      <th className="pb-2 text-left font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentMatchesData.map((match, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-3">{match.opponent}</td>
                        <td className="py-3">
                          <span
                            className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                              match.result === "Win"
                                ? "bg-green-100 text-green-800"
                                : match.result === "Loss"
                                  ? "bg-green-100 text-green-800"
                                  : match.result === "Loss"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {match.result}
                          </span>
                        </td>
                        <td className="py-3">{match.score}</td>
                        <td className="py-3">{new Date(match.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tournaments" className="space-y-6">
          {/* Tournament Results Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Tournament Placements</CardTitle>
              <CardDescription>Your final positions in tournaments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={tournamentResultsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {tournamentResultsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Tournament Stats */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Tournaments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">20</div>
                <p className="text-sm text-gray-500">Participated in last 12 months</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Avg. Position</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">2.4</div>
                <p className="text-sm text-gray-500">Average final position</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Win Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">40%</div>
                <p className="text-sm text-gray-500">Tournament victories</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

