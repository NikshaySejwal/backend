import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

/**
 * Protects a page by requiring authentication (and optionally a specific role).
 * Redirects unauthenticated users to `redirectTo` and wrong-role users to '/'.
 *
 * @param {Object} options
 * @param {string|null} options.requiredRole - e.g. 'ADMIN'. Null = any authenticated user.
 * @param {string} options.redirectTo - Where to send unauthenticated users.
 * @returns {{ user: object|null, isReady: boolean }}
 */
export function useAuthGuard({ requiredRole = null, redirectTo = '/auth/login' } = {}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(redirectTo);
      } else if (requiredRole && user.role !== requiredRole) {
        router.push('/');
      }
    }
  }, [user, loading, requiredRole, redirectTo, router]);

  return { user, isReady: !loading && !!user };
}
