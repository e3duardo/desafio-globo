export type BrotherType = {
  id: number;
  name: string;
  avatar: string;
  resume: string;
  birth: string;
  status: "regular" | "out";
  created_at: string;
  updated_at: string;
};

export type SurveyType = {
  id: number;
  date: string;
  status: "created" | "active" | "done";
  brother_out_id: number;
  total_votes: number;
  total_votes_at_last_hour: number;
  total_votes_per_brother: {
    brother_id: number;
    total_votes: number;
  }[];
  brothers: BrotherType[];
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  role: "backstage" | "viewer";
};

export type AuthType = {
  token: string;
  exp: string;
  user: UserType;
};
