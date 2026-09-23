import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import LoadingScreen from '../components/ui/LoadingScreen';
import api from '../lib/api';

/**
 * Protects a page by requiring authentication (and optionally a specific role).
 * Redirects unauthenticated users to `redirectTo` and wrong-role users to '/'.
 *
 * @param {Object} options
 * @param {string|null} options.requiredRole - e.g. 'ADMIN'. Null = any authenticated user.
 * @param {string} options.redirectTo - Where to send unauthenticated users.
 * @returns {{ user: object|null, isReady: boolean, LoadingComponent: React.Component|null }}
 */
export function useAuthGuard({ requiredRole = null, redirectTo = '/auth/login' } = {}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [resolvedUser, setResolvedUser] = useState(null);

  useEffect(() => {
    if (loading) {
      return;
    }

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.push(redirectTo);
      return;
    }

    const effectiveUser = user || resolvedUser;
    if (effectiveUser) {
      if (requiredRole && effectiveUser.role !== requiredRole) {
        router.push('/');
      }
      return;
    }

    let cancelled = false;
    api.get('/api/user/profile')
      .then(({ data }) => {
        if (cancelled) return;
        setResolvedUser(data);
        if (requiredRole && data.role !== requiredRole) {
          router.push('/');
        }
      })
      .catch(() => {
        if (cancelled) return;
        localStorage.removeItem('token');
        router.push(redirectTo);
      });

    return () => {
      cancelled = true;
    };
  }, [user, loading, requiredRole, redirectTo, resolvedUser, router]);

  const finalUser = user || resolvedUser;

  return {
    user: finalUser,
    isReady: !loading && !!finalUser && (!requiredRole || finalUser.role === requiredRole),
    LoadingComponent: loading || (!finalUser && !!localStorage?.getItem('token')) ? LoadingScreen : null
  };
}
