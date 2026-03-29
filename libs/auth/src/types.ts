export interface User {
  name: string;
  email: string;
}

export interface AuthContext {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}
