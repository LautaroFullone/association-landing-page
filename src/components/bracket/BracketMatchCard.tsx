import { Card } from "@/components/ui/card";
import { Check, MapPin } from "lucide-react";
import { formatShortDate } from "@/lib/utils";

export interface BracketMatchPlayer {
  name: string;
  lastName: string;
}

export interface BracketMatch {
  id: string;
  pair1?: {
    player1: BracketMatchPlayer;
    player2: BracketMatchPlayer;
  } | null;
  pair2?: {
    player1: BracketMatchPlayer;
    player2: BracketMatchPlayer;
  } | null;
  score1?: number[];
  score2?: number[];
  winner?: 1 | 2 | null;
  status: "pending" | "finished" | "en-juego";
  date?: string;
  time?: string;
  court?: string;
}

interface BracketMatchCardProps {
  match: BracketMatch;
  height: number;
}

export function BracketMatchCard({ match, height }: BracketMatchCardProps) {
  const winner = match.winner;
  const pair1Won = winner === 1;
  const pair2Won = winner === 2;

  // Ensure scores are arrays for display
  const pair1Scores = match.score1 || [];
  const pair2Scores = match.score2 || [];

  return (
    <Card
      className="w-64 shrink-0 rounded-lg border-white/10 bg-slate-900/50 shadow-sm overflow-hidden p-0 relative group hover:border-white/20 transition-colors"
      style={{ height: `${height}px` }}
    >
      {/* Status line on left */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${
          match.status === "finished"
            ? "bg-emerald-500"
            : match.status === "en-juego"
              ? "bg-amber-500 animate-pulse"
              : "bg-slate-700"
        }`}
      />

      <div className="p-2 pl-3 h-full flex flex-col justify-center">
        {/* Header: Date & Time */}
        <div className="mb-1.5 flex items-center justify-between text-[10px] text-slate-400">
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
          className={`flex items-center justify-between rounded p-1 ${
            pair1Won ? "bg-emerald-500/10" : ""
          }`}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            {pair1Won && <Check className="text-emerald-400 size-3 shrink-0" />}
            <div
              className={`truncate text-xs ${
                pair1Won ? "font-medium text-emerald-400" : "text-slate-300"
              }`}
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
            <div className="flex gap-1 shrink-0 ml-1">
              {pair1Scores.map((score, i) => (
                <span
                  key={i}
                  className={`flex h-4 w-4 items-center justify-center rounded text-[10px] font-bold ${
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
          className={`mt-1 flex items-center justify-between rounded p-1 ${
            pair2Won ? "bg-emerald-500/10" : ""
          }`}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            {pair2Won && <Check className="text-emerald-400 size-3 shrink-0" />}

            <div
              className={`truncate text-xs ${
                pair2Won ? "font-medium text-emerald-400" : "text-slate-300"
              }`}
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
            <div className="flex gap-1 shrink-0 ml-1">
              {pair2Scores.map((score, i) => (
                <span
                  key={i}
                  className={`flex h-4 w-4 items-center justify-center rounded text-[10px] font-bold ${
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
      </div>
    </Card>
  );
}
