export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    token: string;
    user: User;
  };
}
