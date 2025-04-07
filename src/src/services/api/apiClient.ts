
import { DEFAULT_HEADERS, REQUEST_TIMEOUT, APIError } from './config';

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestOptions {
  method?: RequestMethod;
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

export class ApiClient {
  private baseUrl: string;
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  
  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = REQUEST_TIMEOUT
    } = options;

    const url = `${this.baseUrl}/${endpoint}`;
    
    // Create AbortController for request timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        method,
        headers: { ...DEFAULT_HEADERS, ...headers },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      const data = await response.json().catch(() => ({}));
      
      if (!response.ok) {
        throw new APIError(
          data.message || `Request failed with status ${response.status}`,
          response.status
        );
      }
      
      return data as T;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof APIError) {
        throw error;
      }
      
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new APIError('Request timeout', 408);
      }
      
      throw new APIError((error as Error).message || 'Network error', 0);
    }
  }
  
  public async get<T>(endpoint: string, options: Omit<RequestOptions, 'method' | 'body'> = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }
  
  public async post<T>(endpoint: string, body: any, options: Omit<RequestOptions, 'method'> = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  }
  
  public async put<T>(endpoint: string, body: any, options: Omit<RequestOptions, 'method'> = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  }
  
  public async patch<T>(endpoint: string, body: any, options: Omit<RequestOptions, 'method'> = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body });
  }
  
  public async delete<T>(endpoint: string, options: Omit<RequestOptions, 'method'> = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}
