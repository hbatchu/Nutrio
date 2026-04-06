"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import type { InningsScorecard } from "@/types/cricapi";

interface ScorecardTableProps {
  scorecard: InningsScorecard[];
}

export function ScorecardTable({ scorecard }: ScorecardTableProps) {
  const innings = scorecard.filter((s) => s.batting?.length || s.bowling?.length);

  if (!innings.length) {
    return <p className="py-8 text-center text-sm text-muted-foreground">No scorecard data available yet.</p>;
  }

  return (
    <Tabs defaultValue="0" className="w-full">
      <TabsList className="mb-4 bg-muted">
        {innings.map((inn, i) => (
          <TabsTrigger key={i} value={String(i)} className="text-xs data-[state=active]:bg-[#1A2B5F] data-[state=active]:text-[#FDB913]">
            {inn.inning}
          </TabsTrigger>
        ))}
      </TabsList>
      {innings.map((inn, i) => (
        <TabsContent key={i} value={String(i)} className="space-y-6">
          {/* Batting */}
          {inn.batting?.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">Batting</h3>
              <div className="overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader className="bg-[#1A2B5F]">
                    <TableRow>
                      <TableHead className="text-white/80 min-w-[140px]">Batsman</TableHead>
                      <TableHead className="text-white/80">Dismissal</TableHead>
                      <TableHead className="text-center text-white/80">R</TableHead>
                      <TableHead className="text-center text-white/80">B</TableHead>
                      <TableHead className="text-center text-white/80">4s</TableHead>
                      <TableHead className="text-center text-white/80">6s</TableHead>
                      <TableHead className="text-center text-white/80">SR</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inn.batting.map((b, j) => (
                      <TableRow key={j} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{b.batsman}</TableCell>
                        <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">{b.dismissal || "—"}</TableCell>
                        <TableCell className="text-center font-mono font-bold text-[#1A2B5F] dark:text-[#FDB913]">{b.r}</TableCell>
                        <TableCell className="text-center font-mono text-sm">{b.b}</TableCell>
                        <TableCell className="text-center font-mono text-sm">{b["4s"]}</TableCell>
                        <TableCell className="text-center font-mono text-sm">{b["6s"]}</TableCell>
                        <TableCell className="text-center font-mono text-sm">{b.sr}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {inn.extras && (
                <p className="mt-1 text-right text-xs text-muted-foreground">Extras: {inn.extras}</p>
              )}
            </div>
          )}

          {/* Bowling */}
          {inn.bowling?.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">Bowling</h3>
              <div className="overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader className="bg-[#1A2B5F]">
                    <TableRow>
                      <TableHead className="text-white/80 min-w-[140px]">Bowler</TableHead>
                      <TableHead className="text-center text-white/80">O</TableHead>
                      <TableHead className="text-center text-white/80">M</TableHead>
                      <TableHead className="text-center text-white/80">R</TableHead>
                      <TableHead className="text-center text-white/80">W</TableHead>
                      <TableHead className="text-center text-white/80">Econ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inn.bowling.map((b, j) => (
                      <TableRow key={j} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{b.bowler}</TableCell>
                        <TableCell className="text-center font-mono text-sm">{b.o}</TableCell>
                        <TableCell className="text-center font-mono text-sm">{b.m}</TableCell>
                        <TableCell className="text-center font-mono text-sm">{b.r}</TableCell>
                        <TableCell className="text-center font-mono font-bold text-red-600">{b.w}</TableCell>
                        <TableCell className="text-center font-mono text-sm">{b.eco}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
