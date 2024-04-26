export interface User {
  user_id: string;
  username: string;
  codeuser: string;
  first_name: string;
  last_name: string;
  register_number: string;
  email: string;
  role: string;
  situation: string;
  created_at?: string;
  token?: string | undefined;
}
