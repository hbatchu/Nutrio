"use client";

import { usePlayerInfo } from "@/hooks/usePlayer";
import { ErrorState } from "@/components/shared/ErrorState";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import type { CareerStat, BowlCareerStat } from "@/types/cricapi";

export function PlayerDetailClient({ playerId }: { playerId: string }) {
  const { data: player, isLoading, isError } = usePlayerInfo(playerId);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <Link href="/players" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Players
      </Link>

      {isLoading && (
        <div className="space-y-4 animate-pulse">
          <div className="csk-gradient h-40 rounded-xl" />
          <div className="h-64 rounded-xl bg-muted" />
        </div>
      )}
      {isError && <ErrorState title="Player not found" />}

      {player && (
        <div className="space-y-6">
          {/* Profile card */}
          <div className="csk-gradient rounded-xl p-6 text-white">
            <div className="flex items-start gap-4">
              {player.playerImg ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={player.playerImg}
                  alt={player.name}
                  className="h-20 w-20 rounded-full border-2 border-[#FDB913] object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#FDB913] bg-[#253570]">
                  <User className="h-8 w-8 text-[#FDB913]" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h1 className="font-display text-2xl font-bold">{player.name}</h1>
                <p className="mt-0.5 text-white/60">{player.country}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {player.role && <Badge className="bg-[#FDB913] text-[#1A2B5F] font-semibold">{player.role}</Badge>}
                  {player.battingStyle && <Badge variant="outline" className="border-white/30 text-white/70 text-xs">{player.battingStyle}</Badge>}
                  {player.bowlingStyle && player.bowlingStyle !== "NA" && (
                    <Badge variant="outline" className="border-white/30 text-white/70 text-xs">{player.bowlingStyle}</Badge>
                  )}
                </div>
                {player.dateOfBirth && (
                  <p className="mt-2 text-xs text-white/40">Born: {player.dateOfBirth}</p>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <Tabs defaultValue="batting">
              <TabsList className="mb-4">
                <TabsTrigger value="batting" className="data-[state=active]:bg-[#1A2B5F] data-[state=active]:text-[#FDB913]">Batting</TabsTrigger>
                <TabsTrigger value="bowling" className="data-[state=active]:bg-[#1A2B5F] data-[state=active]:text-[#FDB913]">Bowling</TabsTrigger>
              </TabsList>

              <TabsContent value="batting">
                {player.bat?.career?.length ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-[#1A2B5F]">
                        <TableRow>
                          {["Format","Mat","Inn","NO","Runs","HS","Avg","SR","100","50"].map(h => (
                            <TableHead key={h} className="text-white/80 text-center whitespace-nowrap">{h}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {player.bat.career.map((s: CareerStat, i: number) => (
                          <TableRow key={i} className="hover:bg-muted/50">
                            <TableCell className="font-medium whitespace-nowrap">{s.type}</TableCell>
                            <TableCell className="text-center">{s.mat}</TableCell>
                            <TableCell className="text-center">{s.inns}</TableCell>
                            <TableCell className="text-center">{s.no}</TableCell>
                            <TableCell className="text-center font-bold text-[#1A2B5F] dark:text-[#FDB913]">{s.runs}</TableCell>
                            <TableCell className="text-center">{s.hs}</TableCell>
                            <TableCell className="text-center">{s.avg}</TableCell>
                            <TableCell className="text-center">{s.sr}</TableCell>
                            <TableCell className="text-center">{s["100"]}</TableCell>
                            <TableCell className="text-center">{s["50"]}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : <p className="text-sm text-muted-foreground">No batting stats available.</p>}
              </TabsContent>

              <TabsContent value="bowling">
                {player.bowl?.career?.length ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-[#1A2B5F]">
                        <TableRow>
                          {["Format","Mat","Inn","Ov","Runs","Wkts","BBI","Avg","Econ","SR"].map(h => (
                            <TableHead key={h} className="text-white/80 text-center whitespace-nowrap">{h}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {player.bowl.career.map((s: BowlCareerStat, i: number) => (
                          <TableRow key={i} className="hover:bg-muted/50">
                            <TableCell className="font-medium whitespace-nowrap">{s.type}</TableCell>
                            <TableCell className="text-center">{s.mat}</TableCell>
                            <TableCell className="text-center">{s.inns}</TableCell>
                            <TableCell className="text-center">{s.ov}</TableCell>
                            <TableCell className="text-center">{s.runs}</TableCell>
                            <TableCell className="text-center font-bold text-red-600">{s.wkts}</TableCell>
                            <TableCell className="text-center">{s.bbi}</TableCell>
                            <TableCell className="text-center">{s.avg}</TableCell>
                            <TableCell className="text-center">{s.econ}</TableCell>
                            <TableCell className="text-center">{s.sr}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : <p className="text-sm text-muted-foreground">No bowling stats available.</p>}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}
