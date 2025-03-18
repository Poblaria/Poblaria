export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export interface UserData {
  username: string;
  password: string;
  // Add additional fields as needed (e.g., email, fullName, etc.)
}

export interface LoginData {
  username: string;
  password: string;
}

export interface HousingData {
  title: string;
  description?: string;
  price: number;
  type_id: number;
  offer_type_id: number;
  rooms: number;
  bathrooms: number;
  area: number;
  land_area?: number;
  address: string;
  latitude: number;
  longitude: number;
  is_available?: boolean;
}

export interface JobData {
  title: string;
  description?: string;
  company: string;
  address?: string;
  salary?: number;
  type_id: number;
  is_remote?: boolean;
  is_available?: boolean;
}

// POST /register
export async function registerUser(userData: UserData): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Registration failed");
  }
  return response.json();
}

// POST /login
export async function loginUser(credentials: LoginData): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  return response.json();
}

// POST /logout
export async function logoutUser(): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Logout failed");
  }
  return response.json();
}

// GET /housings
export async function fetchHousings(): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/housings`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch housings");
  }
  return response.json();
}

// GET /housings/:id
export async function fetchHousingById(id: number | string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/housings/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch housing with id: ${id}`);
  }
  return response.json();
}

// POST /housings
export async function createHousing(housingData: HousingData): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/housings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(housingData),
  });
  if (!response.ok) {
    throw new Error("Failed to create housing");
  }
  return response.json();
}

// PUT /housings/:id and PATCH /housings/:id
export async function updateHousing(id: number | string, housingData: Partial<HousingData>): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/housings/${id}`, {
    method: "PUT", // or "PATCH"
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(housingData),
  });
  if (!response.ok) {
    throw new Error(`Failed to update housing with id: ${id}`);
  }
  return response.json();
}

// DELETE /housings/:id
export async function deleteHousing(id: number | string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/housings/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Failed to delete housing with id: ${id}`);
  }
  return response.json();
}

// GET /jobs
export async function fetchJobs(): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/jobs`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }
  return response.json();
}

// GET /jobs/:id
export async function fetchJobById(id: number | string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch job with id: ${id}`);
  }
  return response.json();
}

// POST /jobs
export async function createJob(jobData: JobData): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jobData),
  });
  if (!response.ok) {
    throw new Error("Failed to create job");
  }
  return response.json();
}

// PUT /jobs/:id and PATCH /jobs/:id
export async function updateJob(id: number | string, jobData: Partial<JobData>): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
    method: "PUT", // or "PATCH"
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jobData),
  });
  if (!response.ok) {
    throw new Error(`Failed to update job with id: ${id}`);
  }
  return response.json();
}

// DELETE /jobs/:id
export async function deleteJob(id: number | string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Failed to delete job with id: ${id}`);
  }
  return response.json();
}