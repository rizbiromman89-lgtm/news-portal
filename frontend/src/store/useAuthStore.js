import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user_info')) || null,
  token: localStorage.getItem('auth_token') || null,
  setAuth: (user, token) => {
    localStorage.setItem('user_info', JSON.stringify(user));
    localStorage.setItem('auth_token', token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem('user_info');
    localStorage.removeItem('auth_token');
    set({ user: null, token: null });
  },
  updateUser: (user) => {
    localStorage.setItem('user_info', JSON.stringify(user));
    set({ user });
  },
}));