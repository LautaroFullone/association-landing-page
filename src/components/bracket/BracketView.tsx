import { Badge } from "@/components/ui/badge";
import { GitBranch } from "lucide-react";
import { type BracketMatch, BracketMatchCard } from "./BracketMatchCard";

interface BracketLayer {
  name: string;
  matches: BracketMatch[];
}

interface BracketViewProps {
  layers: BracketLayer[];
}

export function BracketView({ layers }: BracketViewProps) {
  if (!layers || layers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-500">
        <GitBranch className="h-12 w-12 mb-4 opacity-50" />
        <p>Las llaves aún no han sido generadas</p>
      </div>
    );
  }

  // Configuration constants
  const CARD_HEIGHT = 112; // h-28 = 7rem = 112px;
  const BASE_GAP = 32; // First gap between pairs in round 0

  // Calculation helpers
  const getGap = (roundIndex: number) => {
    // Gap increases exponentially:
    // Round 0: BASE_GAP
    // Round 1: 2*BASE_GAP + CARD_HEIGHT
    // Round R: 2*Gap(R-1) + CARD_HEIGHT

    // Analytic formula: Gap(r) = (BASE_GAP + CARD_HEIGHT) * 2^r - CARD_HEIGHT
    return (BASE_GAP + CARD_HEIGHT) * Math.pow(2, roundIndex) - CARD_HEIGHT;
  };

  const getConnectorHeight = (roundIndex: number) => {
    // Height from center of match to midpoint between matches
    // This is half the distance between centers of two matches in this round.
    // Distance between centers = CARD_HEIGHT + Gap(r)
    // Connector Height = (CARD_HEIGHT + Gap(r)) / 2
    return (CARD_HEIGHT + getGap(roundIndex)) / 2;
  };

  const getTopOffset = (roundIndex: number) => {
    // Padding Top to align the first match of the round with the midpoint of previous round's pair

    let pt = 0;
    for (let i = 0; i < roundIndex; i++) {
      pt += getConnectorHeight(i);
    }
    return pt;
  };

  return (
    <div className="relative w-full overflow-x-auto pb-8 pt-4">
      <div className="flex min-w-max gap-16 px-4">
        {layers.map((layer, roundIndex) => {
          const gap = getGap(roundIndex);
          const paddingTop = getTopOffset(roundIndex);
          const connectorHeight = getConnectorHeight(roundIndex);

          return (
            <div key={roundIndex} className="flex flex-col">
              <div className="mb-6 text-center h-8">
                <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30 text-sm px-4 py-1">
                  {layer.name}
                </Badge>
              </div>

              <div
                className="flex flex-col relative"
                style={{
                  gap: `${gap}px`,
                  paddingTop: `${paddingTop}px`,
                }}
              >
                {layer.matches.map((match, matchIndex) => (
                  <div key={match.id} className="relative flex items-center">
                    <BracketMatchCard match={match} height={CARD_HEIGHT} />

                    {/* Connector Lines to Next Round */}
                    {roundIndex < layers.length - 1 && (
                      <>
                        {/* Horizontal line exiting right from center */}
                        <div className="absolute -right-8 top-1/2 h-px w-8 bg-slate-700" />

                        {/* Vertical Connectors */}
                        {matchIndex % 2 === 0 ? (
                          // Even match: Line DOWN
                          <div
                            className="absolute -right-8 top-1/2 w-px bg-slate-700"
                            style={{
                              height: `${connectorHeight}px`,
                              transform: "translateY(0)", // Starts at top-1/2 and goes down by height
                            }}
                          />
                        ) : (
                          // Odd match: Line UP
                          <div
                            className="absolute -right-8 bottom-1/2 w-px bg-slate-700"
                            style={{
                              height: `${connectorHeight}px`,
                            }}
                          />
                        )}

                        {/* If using bottom-1/2, height goes UP from there? No. div height extends downwards usually.
                           To make it go UP, we need top: auto, bottom: 50%.
                        */}
                      </>
                    )}

                    {/* Incoming stub from left */}
                    {roundIndex > 0 && (
                      <div className="absolute -left-8 top-1/2 h-px w-8 bg-slate-700" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
