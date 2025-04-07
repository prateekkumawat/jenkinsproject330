import { ApiClient } from './apiClient';
import { API_CONFIG } from './config';

// Types for Asset Management data
export interface Asset {
  id?: number | string; // Updated to support both number and string types
  assetCode: string;
  name: string;
  type: string;
  serialNumber: string;
  purchaseDate?: string;
  purchasePrice?: number;
  status: string;
  retirementDate?: string;
  isActive: boolean;
  notes?: string;
  allocationDate?: string; // Added for employee asset view
}

export interface AssetAllocation {
  id: string;
  assetId: string;
  employeeId: string;
  allocationDate: string;
  dueDate?: string;
  returnDate?: string;
  status: 'active' | 'returned' | 'overdue';
  notes?: string;
  // Additional fields for UI display
  assetName?: string;
  assetType?: string;
  employeeName?: string;
  department?: string;
}

export interface AssetRequest {
  id?: string;
  employeeId: string;
  assetType: string;
  reason: string;
  requestedDate: string;
  status?: 'pending' | 'approved' | 'rejected' | 'fulfilled';
  comments?: string;
}

export interface AssetReportRequest {
  status: string;
  reportingDate: string;
  reportingDescription: string;
}

class AssetManagementApi {
  private client: ApiClient;
  
  constructor() {
    this.client = new ApiClient(API_CONFIG.ASSET_MANAGEMENT_BASE_URL);
  }
  
  // Assets
  async getAllAssets(status?: string, assetType?: string): Promise<Asset[]> {
    let endpoint = 'asset';
    
    // Add query parameters if provided
    const queryParams: string[] = [];
    if (status) {
      queryParams.push(`status=${status}`);
    }
    if (assetType) {
      queryParams.push(`assetType=${assetType}`);
    }
    
    if (queryParams.length > 0) {
      endpoint += `?${queryParams.join('&')}`;
    }
    
    console.log("API Request:", endpoint);
    return this.client.get<Asset[]>(endpoint);
  }
  
  async getAssetById(id: string): Promise<Asset> {
    return this.client.get<Asset>(`asset/${id}`);
  }
  
  async createAsset(asset: Omit<Asset, 'id'>): Promise<Asset> {
    return this.client.post<Asset>('asset', asset);
  }
  
  async updateAsset(id: string, asset: Partial<Asset>): Promise<Asset> {
    return this.client.put<Asset>(`asset/${id}`, asset);
  }
  
  async deleteAsset(id: string): Promise<void> {
    return this.client.delete<void>(`asset/${id}`);
  }
  
  // Asset Report
  async reportAsset(assetId: string, reportData: AssetReportRequest): Promise<Asset> {
    return this.client.patch<Asset>(`asset/report/${assetId}`, reportData);
  }
  
  // Asset Allocations
  async getAllAllocations(): Promise<AssetAllocation[]> {
    return this.client.get<AssetAllocation[]>('allocations');
  }
  
  async getAllocationsByEmployee(employeeId: string): Promise<AssetAllocation[]> {
    return this.client.get<AssetAllocation[]>(`allocations/employee/${employeeId}`);
  }
  
  async getAllocationsByAsset(assetId: string): Promise<AssetAllocation[]> {
    return this.client.get<AssetAllocation[]>(`allocations/asset/${assetId}`);
  }
  
  async allocateAsset(assetId: string, allocation: { employeeId: string | number, allocationDate: string }): Promise<AssetAllocation> {
    return this.client.patch<AssetAllocation>(`asset/allocate/${assetId}`, allocation);
  }
  
  async returnAsset(id: string, returnDate: string, notes?: string): Promise<AssetAllocation> {
    return this.client.patch<AssetAllocation>(`allocations/${id}/return`, { 
      returnDate, 
      notes,
      status: 'returned' 
    });
  }
  
  // New method to get assets by employee ID
  async getAssetsByEmployeeId(employeeId: string): Promise<Asset[]> {
    // Updated endpoint to match the provided curl format: /asset/employee?employeeId={employeeId}
    return this.client.get<Asset[]>(`asset/employee?employeeId=${employeeId}`);
  }
  
  // Asset Requests
  async getAllRequests(): Promise<AssetRequest[]> {
    return this.client.get<AssetRequest[]>('requests');
  }
  
  async getRequestsByEmployee(employeeId: string): Promise<AssetRequest[]> {
    return this.client.get<AssetRequest[]>(`requests/employee/${employeeId}`);
  }
  
  async createRequest(request: Omit<AssetRequest, 'id' | 'status'>): Promise<AssetRequest> {
    // Using the endpoint format from the provided curl example
    return this.client.post<AssetRequest>(`asset/request?employeeId=${request.employeeId}`, {
      assetType: request.assetType,
      comment: request.comments,
      requestedDate: request.requestedDate,
      reason: request.reason
    });
  }
  
  async updateRequestStatus(id: string, status: AssetRequest['status'], comments?: string): Promise<AssetRequest> {
    return this.client.patch<AssetRequest>(`requests/${id}/status`, { status, comments });
  }
}

// Export a singleton instance
export const assetManagementApi = new AssetManagementApi();
