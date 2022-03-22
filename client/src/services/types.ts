export type BrotherType = {
  id: number;
  name: string;
  avatar: string;
  resume: string;
  birth: string;
  status: 'regular' | 'out';
  created_at: string;
  updated_at: string;
}

export type SurveyType = {
  id: number;
  date: string
  status: 'created' | 'active' | 'done';
  brother_out_id: string;
  created_at: string;
  updated_at: string;
  brothers: BrotherType[];
}

export type UserType = {
  name: string;
  email: string;
}

export type AuthType = {
  token: string;
  exp: string;
  user: UserType
}