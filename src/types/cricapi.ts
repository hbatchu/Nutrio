// Raw CricAPI response types

export interface CricAPIResponse<T> {
  apikey: string;
  data: T;
  status: string;
  info: {
    hitsToday: number;
    hitsUsed: number;
    hitsLimit: number;
    credits: number;
    server: number;
    offsetRows: number;
    totalRows: number;
    queryTime: number;
    s: number;
    cache: number;
  };
}

export interface CricAPIMatch {
  id: string;
  name: string;
  matchType: string; // "t20" | "odi" | "test" | "ipl"
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo?: TeamInfo[];
  score?: Score[];
  series_id?: string;
  fantasyEnabled?: boolean;
  bbbEnabled?: boolean;
  hasSquad?: boolean;
  matchStarted?: boolean;
  matchEnded?: boolean;
}

export interface TeamInfo {
  name: string;
  shortname: string;
  img: string;
}

export interface Score {
  r: number;   // runs
  w: number;   // wickets
  o: number;   // overs
  inning: string;
}

export interface CricAPIScorecard {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo?: TeamInfo[];
  score?: Score[];
  tossResults?: {
    tossWinner: string;
    tossDecision: string;
  };
  matchWinner?: string;
  series_id?: string;
  matchStarted?: boolean;
  matchEnded?: boolean;
  scorecard: InningsScorecard[];
}

export interface InningsScorecard {
  batting: BatsmanStat[];
  bowling: BowlerStat[];
  extras?: string;
  powerplay?: string;
  target?: string;
  inning: string;
}

export interface BatsmanStat {
  batsman: string;
  dismissal: string;
  r: number;
  b: number;
  "4s": number;
  "6s": number;
  sr: string;
}

export interface BowlerStat {
  bowler: string;
  o: string;
  m: string;
  r: number;
  w: number;
  nb: string;
  wd: string;
  eco: string;
}

export interface CricAPISeries {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  odi: number;
  t20: number;
  test: number;
  squads: number;
  matches: number;
}

export interface CricAPISeriesInfo {
  info: {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    odi: number;
    t20: number;
    test: number;
    squads: number;
    matches: number;
  };
  matchList: CricAPIMatch[];
}

export interface CricAPIPlayer {
  id: string;
  name: string;
  country: string;
}

export interface CricAPIPlayerInfo {
  id: string;
  name: string;
  dateOfBirth: string;
  role: string;
  battingStyle: string;
  bowlingStyle: string;
  country: string;
  playerImg: string;
  bat?: {
    career?: CareerStat[];
  };
  bowl?: {
    career?: BowlCareerStat[];
  };
}

export interface CareerStat {
  type: string;
  mat: string;
  inns: string;
  no: string;
  runs: string;
  hs: string;
  avg: string;
  bf: string;
  sr: string;
  "100": string;
  "50": string;
  "4s": string;
  "6s": string;
}

export interface BowlCareerStat {
  type: string;
  mat: string;
  inns: string;
  ov: string;
  runs: string;
  wkts: string;
  bbi: string;
  bbm: string;
  avg: string;
  econ: string;
  sr: string;
  "4w": string;
  "5w": string;
}
