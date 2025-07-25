// Authentication utility functions
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URI || 'http://localhost:3001';

// Types
export interface User {
  id: string
  fullName: string
  email: string
  signupMethod: string
  role: UserRole
  lastLoggedIn: string
  isEmailVerified: boolean
  createdAt?: string
  updatedAt?: string
}

// User roles enum (matching backend)
export const USER_ROLES = {
  USER: 'user',
  AGENT: 'agent',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin'
} as const

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface AuthResponse {
  success: boolean
  message: string
  data?: {
    user: User
    tokens: AuthTokens
  }
}

// Token management
export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
}

export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken')
}

export const getUserData = (): User | null => {
  if (typeof window === 'undefined') return null
  const userData = localStorage.getItem('userData') || sessionStorage.getItem('userData')
  return userData ? JSON.parse(userData) : null
}

export const clearAuthData = (): void => {
  if (typeof window === 'undefined') return
  
  // Clear from both localStorage and sessionStorage
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('userData')
  sessionStorage.removeItem('accessToken')
  sessionStorage.removeItem('refreshToken')
  sessionStorage.removeItem('userData')
}

export const isAuthenticated = (): boolean => {
  return !!getAccessToken()
}

// API call with automatic token refresh
export const authenticatedFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const accessToken = getAccessToken()
  
  if (!accessToken) {
    throw new Error('No access token available')
  }

  // Add authorization header
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
    ...options.headers,
  }

  let response = await fetch(url, {
    ...options,
    headers,
  })

  // If token expired, try to refresh
  if (response.status === 401) {
    const refreshed = await refreshAccessToken()
    if (refreshed) {
      // Retry with new token
      const newAccessToken = getAccessToken()
      response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          'Authorization': `Bearer ${newAccessToken}`,
        },
      })
    } else {
      // Refresh failed, redirect to login
      clearAuthData()
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login'
      }
      throw new Error('Authentication failed')
    }
  }

  return response
}

// Refresh access token
export const refreshAccessToken = async (): Promise<boolean> => {
  const refreshToken = getRefreshToken()
  
  if (!refreshToken) {
    return false
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    })

    const data = await response.json()

    if (data.success && data.data?.accessToken) {
      // Update access token in storage
      const storage = localStorage.getItem('accessToken') ? localStorage : sessionStorage
      storage.setItem('accessToken', data.data.accessToken)
      return true
    }

    return false
  } catch (error) {
    console.error('Token refresh failed:', error)
    return false
  }
}

// Logout function
export const logout = async (): Promise<void> => {
  try {
    const accessToken = getAccessToken()
    if (accessToken) {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
    }
  } catch (error) {
    console.error('Logout API call failed:', error)
  } finally {
    clearAuthData()
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login'
    }
  }
}

// Role-based permission checking
export const hasRole = (requiredRole: UserRole): boolean => {
  const user = getUserData()
  if (!user) return false
  return user.role === requiredRole
}

// Check if user has any of the specified roles
export const hasAnyRole = (roles: UserRole[]): boolean => {
  const user = getUserData()
  if (!user) return false
  return roles.includes(user.role as UserRole)
}

// Check if user is admin (admin or super_admin)
export const isAdmin = (): boolean => {
  return hasAnyRole([USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN])
}

// Check if user is agent or higher
export const isAgent = (): boolean => {
  return hasAnyRole([USER_ROLES.AGENT, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN])
}

// Check if user has specific role or higher privilege
export const hasRoleOrHigher = (minRole: UserRole): boolean => {
  const user = getUserData()
  if (!user) return false
  
  const roleHierarchy = {
    [USER_ROLES.USER]: 1,
    [USER_ROLES.AGENT]: 2,
    [USER_ROLES.ADMIN]: 3,
    [USER_ROLES.SUPER_ADMIN]: 4
  }
  
  const userLevel = roleHierarchy[user.role as UserRole] || 0
  const requiredLevel = roleHierarchy[minRole] || 0
  
  return userLevel >= requiredLevel
}

// Get user role
export const getUserRole = (): UserRole | null => {
  const user = getUserData()
  return user?.role as UserRole || null
}

// Check if user has specific role/permission
export const hasPermission = (permission: string): boolean => {
  const user = getUserData()
  // TODO: Implement granular permission system
  return !!user
}

// Format user display name
export const getDisplayName = (user?: User | null): string => {
  const userData = user || getUserData()
  return userData?.fullName || userData?.email || 'User'
}

// Format user role for display
export const getRoleDisplayName = (role?: UserRole): string => {
  const roleNames = {
    [USER_ROLES.USER]: 'User',
    [USER_ROLES.AGENT]: 'Agent',
    [USER_ROLES.ADMIN]: 'Admin',
    [USER_ROLES.SUPER_ADMIN]: 'Super Admin'
  }
  
  return roleNames[role || USER_ROLES.USER] || 'User'
}
