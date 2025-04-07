import { ApiClient } from './apiClient';
import { API_CONFIG } from './config';

// Initialize the API client with the base URL
const apiClient = new ApiClient(API_CONFIG.EMPLOYEE_MANAGEMENT_BASE_URL);

// Employee data types
export interface Employee {
  id?: string | number; // Updated to support both string and number types
  name: string;
  username: string;
  role: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  jobTitle: string;
  project?: string;
  jobType: string;
  jobStatus: string;
  jobDescription?: string;
  department?: string; // Added department property
}

export interface EmployeeResponse extends Employee {
  id?: string | number; // Making id optional since it might not be used
  employeeId: string; // Adding employeeId which is returned by the API
  createdAt?: string;
  updatedAt?: string;
  department?: string; // Explicitly adding department to EmployeeResponse
}

// Leave tracker interface
export interface LeaveRequest {
  leaveType: string;
  startDate: string;
  endDate: string;
  totalDays?: number;
  reason: string;
}

export interface LeaveResponse extends LeaveRequest {
  id: number;
  employeeId: string; // Changed from number to string for UUID
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

// Timesheet entry interface
export interface TimesheetEntry {
  workDate: string;
  clockIn: string;
  clockOut: string;
  totalHours: number;
}

// API functions for employee management
export const employeeManagementApi = {
  /**
   * Get all employees
   * @returns List of employees
   */
  getAllEmployees: async (): Promise<EmployeeResponse[]> => {
    return apiClient.get<EmployeeResponse[]>('employee');
  },

  /**
   * Create a new employee
   * @param employee Employee data
   * @returns Created employee
   */
  createEmployee: async (employee: Employee): Promise<EmployeeResponse> => {
    return apiClient.post<EmployeeResponse>('employee', employee);
  },

  /**
   * Get employee by ID
   * @param id Employee ID
   * @returns Employee data
   */
  getEmployeeById: async (id: string): Promise<EmployeeResponse> => { // Updated to string
    return apiClient.get<EmployeeResponse>(`employee/${id}`);
  },

  /**
   * Update employee
   * @param id Employee ID
   * @param employee Updated employee data
   * @returns Updated employee
   */
  updateEmployee: async (id: string, employee: Partial<Employee>): Promise<EmployeeResponse> => { // Updated to string
    return apiClient.put<EmployeeResponse>(`employee/${id}`, employee);
  },

  /**
   * Delete employee
   * @param id Employee ID
   * @returns Success message
   */
  deleteEmployee: async (id: string): Promise<{ message: string }> => {
    return apiClient.delete<{ message: string }>(`employee/${id}`);
  },

  /**
   * Submit leave request for an employee
   * @param employeeId Employee ID (UUID)
   * @param leaveRequest Leave request data
   * @returns Created leave request
   */
  submitLeaveRequest: async (employeeId: string, leaveRequest: LeaveRequest): Promise<LeaveResponse> => {
    // Fix: Changed from employee/ to employees/ to match the API endpoint
    return apiClient.post<LeaveResponse>(`employees/${employeeId}/leave-tracker`, leaveRequest);
  },

  /**
   * Get leave requests for an employee
   * @param employeeId Employee ID (UUID)
   * @returns List of leave requests
   */
  getEmployeeLeaveRequests: async (employeeId: string): Promise<LeaveResponse[]> => {
    // Fix: Changed from employee/ to employees/ to match the API endpoint
    return apiClient.get<LeaveResponse[]>(`employees/${employeeId}/leave-tracker`);
  },

  /**
   * Submit timesheet entry
   * @param employeeId Employee ID
   * @param timesheetData Timesheet entry data
   * @returns Submitted timesheet entry
   */
  submitTimesheet: async (employeeId: string, timesheetData: TimesheetEntry): Promise<TimesheetEntry> => {
    return apiClient.post<TimesheetEntry>(`employees/${employeeId}/timesheets`, timesheetData);
  }
}
