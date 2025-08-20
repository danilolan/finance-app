import { create } from 'zustand';
import type { AuthState } from '../types/auth';
import { authService } from '../services/auth.service';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('auth_token'),
  isLoading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('auth_token'),

  login: async (data) => {
    try {
      set({ isLoading: true, error: null });
      const response = await authService.login(data);
      
      localStorage.setItem('auth_token', response.access_token);
      set({
        user: response.user,
        token: response.access_token,
        isAuthenticated: true,
      });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to login' });
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (data) => {
    try {
      set({ isLoading: true, error: null });
      const response = await authService.register(data);
      set({ user: response.data });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to register' });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    authService.logout().catch(console.error);
  },

  clearError: () => set({ error: null }),
}));

// Initialize user data if token exists
if (localStorage.getItem('auth_token')) {
  authService.me()
    .then(user => {
      useAuthStore.setState({ user }); // Update with user data directly
    })
    .catch(() => {
      // If fetching user data fails, clear the auth state
      useAuthStore.getState().logout();
    });
}