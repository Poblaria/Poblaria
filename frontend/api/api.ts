export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3333";
import { UserData, LoginData, HousingData, JobData } from "./data";

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
  try {
    const response = await fetch(`${API_BASE_URL}/housings`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch housings");
    }

    const housings = await response.json();

    // Fetch images in parallel but handle failures gracefully
    const housingsWithImages = await Promise.all(
      housings.map(async (house: any) => {
        if (house.image_id) {
          try {
            const imageResponse = await fetch(`${API_BASE_URL}/housing-images/${house.image_id}`);
            if (imageResponse.ok) {
              const imageData = await imageResponse.json();
              if (imageData.image) {
                return { ...house, image: `data:image/jpeg;base64,${imageData.image}` };
              }
            }
          } catch (error) {
            console.error(`Failed to fetch image for house ID ${house.id}:`, error);
          }
        }
        return { ...house, image: "/images/default-house.png" }; // Placeholder image
      })
    );

    return housingsWithImages;
  } catch (error) {
    console.error("Error fetching housings:", error);
    return [];
  }
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
export async function updateHousing(
  id: number | string,
  housingData: Required<HousingData> // Required with PUT, Partial with PATCH
): Promise<any> {
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

// GET /housing-images/:id
export async function fetchHousingImage(id: number | string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/housing-images/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch image for housing with id: ${id}`);
  }

  const data = (await response.json()) as HousingData;

  return `data:image/jpeg;base64,${data.image}`;
}

export async function uploadHousingImage(
  id: number | string,
  imageFile: File
): Promise<any> {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(`${API_BASE_URL}/housing-images/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload image for housing with id: ${id}`);
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
export async function updateJob(
  id: number | string,
  jobData: Required<JobData> // Required with PUT, Partial with PATCH
): Promise<any> {
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
