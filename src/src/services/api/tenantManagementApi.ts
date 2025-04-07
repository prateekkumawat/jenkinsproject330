
import { ApiClient } from './apiClient';
import { APIError } from './config';

// Initialize the API client with the base URL
const apiClient = new ApiClient('https://tenant-management-production.up.railway.app');

// Define the tenant creation request interface
export interface TenantCreationRequest {
  name: string;
  adminUsername: string;
  adminPassword: string;
  adminEmail: string;
  companyFullName: string;
  industry: string;
  companySize: string;
  companyWebsite?: string;
}

export interface TenantCreationResponse {
  id: string;
  name: string;
  status: string;
  createdAt: string;
}

// Tenant management API functions
export const tenantManagementApi = {
  /**
   * Creates a new tenant
   */
  createTenant: async (data: TenantCreationRequest): Promise<TenantCreationResponse> => {
    try {
      return await apiClient.post<TenantCreationResponse>('api/v1/tenants', data);
    } catch (error) {
      console.error('Error creating tenant:', error);
      throw error instanceof APIError 
        ? error 
        : new APIError('Failed to create tenant', 500);
    }
  }
};
