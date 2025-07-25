import { authenticatedFetch, API_BASE_URL } from './auth';

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  try {
    const response = await authenticatedFetch(`${API_BASE_URL}${url}`, {
      ...options,
      credentials: 'include',
    });
    return response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

export const adminApi = {
  async getDashboardStats() {
    try {
      const data = await fetchWithAuth('/api/admin/dashboard-stats');
      return data;
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      throw error;
    }
  },
};

// Add response types
export interface DashboardStats {
  stats: Array<{
    label: string;
    value: string;
    change: string;
    icon: string;
    color: string;
  }>;
  recentListings: Array<{
    id: string;
    title: string;
    type: string;
    price: string;
    status: string;
    agent: string;
  }>;
}
