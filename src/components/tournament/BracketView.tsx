import { GitBranch, MapPin, Check, Pencil, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type BracketMatch, type BracketRound } from "@/types/tournament";

// Helper for date formatting
const formatShortDate = (dateStr: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr); // Assumes YYYY-MM-DD
  return date.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" });
};

// Bracket Match Card Component
function BracketMatchCard({
  match,
  onEditMatch,
}: {
  match: BracketMatch;
  onEditMatch?: (match: BracketMatch) => void;
}) {
  const winner = match.winner;
  const pair1Won = winner === 1;
  const pair2Won = winner === 2;

  // Get scores for display
  const getScores = (pairNum: 1 | 2) => {
    if (!match.score) return [];
    const scores = [
      pairNum === 1 ? match.score.set1?.pair1 : match.score.set1?.pair2,
      pairNum === 1 ? match.score.set2?.pair1 : match.score.set2?.pair2,
    ];
    if (match.score.set3) {
      scores.push(
        pairNum === 1 ? match.score.set3.pair1 : match.score.set3.pair2,
      );
    }
    return scores.filter((s) => s !== undefined) as number[];
  };

  const pair1Scores = getScores(1);
  const pair2Scores = getScores(2);

  return (
    <Card className="w-64 shrink-0 rounded-lg border-white/10 bg-slate-900/50 shadow-sm overflow-hidden p-0 relative group hover:border-white/20 transition-colors">
      {/* Status line on left */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${
          match.status === "finished" ? "bg-emerald-500" : "bg-slate-700"
        }`}
      />

      <div className="p-2 pl-3">
        {/* Header: Date & Time */}
        <div className="mb-2 flex items-center justify-between text-[10px] text-slate-400">
          <span>
            {match.date ? formatShortDate(match.date) : "TBD"} •{" "}
            {match.time || "TBD"}
          </span>
          {match.court && (
            <span className="flex items-center gap-0.5">
              <MapPin className="h-2.5 w-2.5" /> {match.court}
            </span>
          )}
        </div>

        {/* Pair 1 */}
        <div
          className={`flex items-center justify-between rounded p-1.5 ${pair1Won ? "bg-emerald-500/10" : ""}`}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            {pair1Won && <Check className="text-emerald-400 size-4" />}
            <div
              className={`truncate text-sm ${pair1Won ? "font-medium text-emerald-400" : "text-slate-300"}`}
            >
              {match.pair1 ? (
                <span>
                  <span className="font-medium text-white">
                    {match.pair1.player1.lastName}
                  </span>
                  / {match.pair1.player2.lastName}
                </span>
              ) : (
                <span className="text-slate-600 italic">Por definir</span>
              )}
            </div>
          </div>
          {pair1Scores.length > 0 && (
            <div className="flex gap-1">
              {pair1Scores.map((score, i) => (
                <span
                  key={i}
                  className={`flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold ${
                    score > (pair2Scores[i] ?? -1)
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {score}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Pair 2 */}
        <div
          className={`mt-1 flex items-center justify-between rounded p-1.5 ${pair2Won ? "bg-emerald-500/10" : ""}`}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            {pair2Won && <Check className="text-emerald-400 size-4" />}

            <div
              className={`truncate text-sm ${pair2Won ? "font-medium text-emerald-400" : "text-slate-300"}`}
            >
              {match.pair2 ? (
                <span>
                  <span className="font-medium text-white">
                    {match.pair2.player1.lastName}
                  </span>
                  / {match.pair2.player2.lastName}
                </span>
              ) : (
                <span className="text-slate-600 italic">Por definir</span>
              )}
            </div>
          </div>
          {pair2Scores.length > 0 && (
            <div className="flex gap-1">
              {pair2Scores.map((score, i) => (
                <span
                  key={i}
                  className={`flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold ${
                    score > (pair1Scores[i] ?? -1)
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {score}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Edit Button */}
        {onEditMatch && match.pair1 && match.pair2 && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 w-full h-7 text-xs text-slate-400 hover:text-white hover:bg-white/5"
            onClick={() => onEditMatch(match)}
          >
            {match.status === "pending" ? (
              <>
                <Plus className="mr-1.5 h-3 w-3" />
                Cargar Resultado
              </>
            ) : (
              <>
                <Pencil className="mr-1.5 h-3 w-3" />
                Editar Resultado
              </>
            )}
          </Button>
        )}
      </div>
    </Card>
  );
}

// Bracket View Component
export function BracketView({
  rounds,
  onEditMatch,
}: {
  rounds: BracketRound[];
  onEditMatch?: (match: BracketMatch) => void;
}) {
  if (!rounds || rounds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-500">
        <GitBranch className="h-12 w-12 mb-4 opacity-50" />
        <p>Las llaves aún no han sido generadas</p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-x-auto pb-8 pt-4">
      {" "}
      {/* Scroll container */}
      <div className="flex min-w-max gap-8 px-4">
        {rounds.map((round, roundIndex) => (
          <div key={round.id} className="flex flex-col">
            <div className="mb-4 text-center">
              <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30 text-sm px-4 py-1">
                {round.name}
              </Badge>
            </div>
            <div
              className={`flex flex-1 flex-col justify-center ${
                roundIndex === 0 ? "gap-6" : "gap-32"
              }`}
            >
              {" "}
              {/* Using justify-center with specific gaps allows for precise connector lines */}
              {round.matches.map((match, matchIndex) => (
                <div key={match.id} className="relative flex items-center">
                  <BracketMatchCard match={match} onEditMatch={onEditMatch} />

                  {/* Connector Lines */}
                  {roundIndex < rounds.length - 1 && (
                    <>
                      {/* Horizontal line exiting right */}
                      <div className="absolute -right-4 top-1/2 h-px w-4 bg-slate-700" />

                      {/* Vertical Connectors meeting in the middle */}
                      {matchIndex % 2 === 0 ? (
                        // Even match: Line DOWN
                        <div
                          className="absolute -right-4 top-1/2 w-px bg-slate-700"
                          style={{
                            height:
                              roundIndex === 0
                                ? "calc(50% + 0.75rem)"
                                : "calc(50% + 4rem)",
                          }}
                        />
                      ) : (
                        // Odd match: Line UP
                        <div
                          className="absolute -right-4 bottom-1/2 w-px bg-slate-700"
                          style={{
                            height:
                              roundIndex === 0
                                ? "calc(50% + 0.75rem)"
                                : "calc(50% + 4rem)",
                          }}
                        />
                      )}
                    </>
                  )}

                  {/* Incoming stub from left */}
                  {roundIndex > 0 && (
                    <div className="absolute -left-4 top-1/2 h-px w-4 bg-slate-700" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
