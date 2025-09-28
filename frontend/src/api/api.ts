export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3333";
import type {
    UserData,
    LoginData,
    HousingData,
    JobData,
    HousingDataWithImage,
    HousingImageData
} from "./data";

// POST /register
export async function registerUser(userData: UserData): Promise<UserData> {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    });
    if (!response.ok) {
        throw new Error("Registration failed");
    }
    return response.json();
}

// POST /login
export async function loginUser(
    credentials: LoginData
): Promise<unknown /*FIXME*/> {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
    });
    if (!response.ok) {
        throw new Error("Login failed");
    }
    return response.json();
}

// POST /logout
export async function logoutUser(): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
        throw new Error("Logout failed");
    }
    return response.json();
}

// GET /housings
export async function fetchHousings(): Promise<HousingDataWithImage[]> {
    const response = await fetch(`${API_BASE_URL}/housings`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch housings");
    }

    const housings = await response.json();

    // Fetch images for each house
    return Promise.all(
        housings.map(async (house: HousingData) => {
            if (house.imageId) {
                try {
                    const imageResponse = await fetch(
                        `${API_BASE_URL}/housing-images/${house.imageId}`
                    );
                    if (imageResponse.ok)
                        return {
                            ...house,
                            image: `data:image/jpeg;base64,${await imageResponse.json()}`
                        };
                } catch {
                    // TODO: handle error
                }
            }
            return {
                ...house,
                image: "/images/Torre-Caballe-Catalonia-Olivers-Travels1.jpg"
            };
        })
    );
}

// GET /housings/:id
export async function fetchHousingById(
    id: number | string
): Promise<HousingData> {
    const response = await fetch(`${API_BASE_URL}/housings/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch housing with id: ${id}`);
    }
    return response.json();
}

// POST /housings
export async function createHousing(
    housingData: HousingDataWithImage
): Promise<HousingData> {
    const response = await fetch(`${API_BASE_URL}/housings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(housingData)
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
): Promise<HousingData> {
    const response = await fetch(`${API_BASE_URL}/housings/${id}`, {
        method: "PUT", // or "PATCH"
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(housingData)
    });
    if (!response.ok) {
        throw new Error(`Failed to update housing with id: ${id}`);
    }
    return response.json();
}

// DELETE /housings/:id
export async function deleteHousing(id: number | string) {
    const response = await fetch(`${API_BASE_URL}/housings/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
        throw new Error(`Failed to delete housing with id: ${id}`);
    }
}

export async function uploadHousingImage(
    id: number | string,
    imageFile: File
): Promise<HousingImageData> {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(`${API_BASE_URL}/housing-images/${id}`, {
        method: "PUT",
        body: formData
    });

    if (!response.ok) {
        throw new Error(`Failed to upload image for housing with id: ${id}`);
    }

    return response.json();
}

// GET /jobs
export async function fetchJobs(): Promise<JobData[]> {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch jobs");
    }
    return response.json();
}

// GET /jobs/:id
export async function fetchJobById(id: number | string): Promise<JobData> {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch job with id: ${id}`);
    }
    return response.json();
}

// POST /jobs
export async function createJob(jobData: JobData): Promise<JobData> {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData)
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
): Promise<JobData> {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
        method: "PUT", // or "PATCH"
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData)
    });
    if (!response.ok) {
        throw new Error(`Failed to update job with id: ${id}`);
    }
    return response.json();
}

// DELETE /jobs/:id
export async function deleteJob(id: number | string) {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
        throw new Error(`Failed to delete job with id: ${id}`);
    }
}

// GET /housing-conditions
export async function fetchHousingConditions(): Promise<
    { id: number; name: string }[]
> {
    const response = await fetch(`${API_BASE_URL}/housing-conditions`);
    if (!response.ok) {
        throw new Error("Failed to fetch housing conditions");
    }
    return response.json();
}

// GET /housing-offer-types
export async function fetchHousingOfferTypes(): Promise<
    { id: number; name: string }[]
> {
    const response = await fetch(`${API_BASE_URL}/housing-offer-types`);
    if (!response.ok) {
        throw new Error("Failed to fetch housing offer types");
    }
    return response.json();
}

// GET /housing-types
export async function fetchHousingTypes(): Promise<
    { id: number; name: string }[]
> {
    const response = await fetch(`${API_BASE_URL}/housing-types`);
    if (!response.ok) {
        throw new Error("Failed to fetch housing types");
    }
    return response.json();
}

// GET /job-types
export async function fetchJobTypes(): Promise<{ id: number; name: string }[]> {
    const response = await fetch(`${API_BASE_URL}/job-types`);
    if (!response.ok) throw new Error("Failed to fetch job types");
    return response.json();
}

// GET /job-industries
export async function fetchJobIndustries(): Promise<
    { id: number; name: string }[]
> {
    const response = await fetch(`${API_BASE_URL}/job-industries`);
    if (!response.ok) throw new Error("Failed to fetch job industries");
    return response.json();
}
