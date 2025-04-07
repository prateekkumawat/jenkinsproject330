
// Configuration for API endpoints
export const API_CONFIG = {
  ASSET_MANAGEMENT_BASE_URL: import.meta.env.VITE_ASSET_MANAGEMENT_URL || 'https://asset-management-hrms.up.railway.app',
  EMPLOYEE_MANAGEMENT_BASE_URL: import.meta.env.VITE_EMPLOYEE_MANAGEMENT_URL || 'https://employee-management-hrms.up.railway.app',
};

// Common headers for API requests
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Request timeout in milliseconds
export const REQUEST_TIMEOUT = 30000;

// Custom error class for API errors
export class APIError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
  }
}
