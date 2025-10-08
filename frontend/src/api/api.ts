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
export async function registerUser(userData: UserData) {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    });
    if (!response.ok) {
        throw new Error("Registration failed");
    }
    return (await response.json()) as UserData;
}

// POST /login
export async function loginUser(credentials: LoginData) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
    });
    if (!response.ok) {
        throw new Error("Login failed");
    }
    return (await response.json()) as unknown /*FIXME*/;
}

// POST /logout
export async function logoutUser() {
    const response = await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
        throw new Error("Logout failed");
    }
    return (await response.json()) as { message: string };
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

    const housings = (await response.json()) as HousingData[];

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
export async function fetchHousingById(id: number | string) {
    const response = await fetch(`${API_BASE_URL}/housings/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch housing with id: ${id}`);
    }
    return (await response.json()) as HousingData;
}

// POST /housings
export async function createHousing(housingData: HousingDataWithImage) {
    const response = await fetch(`${API_BASE_URL}/housings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(housingData)
    });
    if (!response.ok) {
        throw new Error("Failed to create housing");
    }
    return (await response.json()) as HousingData;
}

// PUT /housings/:id and PATCH /housings/:id
export async function updateHousing(
    id: number | string,
    housingData: Required<HousingData> // Required with PUT, Partial with PATCH
) {
    const response = await fetch(`${API_BASE_URL}/housings/${id}`, {
        method: "PUT", // or "PATCH"
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(housingData)
    });
    if (!response.ok) {
        throw new Error(`Failed to update housing with id: ${id}`);
    }
    return (await response.json()) as HousingData;
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

export async function uploadHousingImage(id: number | string, imageFile: File) {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(`${API_BASE_URL}/housing-images/${id}`, {
        method: "PUT",
        body: formData
    });

    if (!response.ok) {
        throw new Error(`Failed to upload image for housing with id: ${id}`);
    }

    return (await response.json()) as HousingImageData;
}

// GET /jobs
export async function fetchJobs() {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch jobs");
    }
    return (await response.json()) as JobData[];
}

// GET /jobs/:id
export async function fetchJobById(id: number | string) {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch job with id: ${id}`);
    }
    return (await response.json()) as JobData;
}

// POST /jobs
export async function createJob(jobData: JobData) {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData)
    });
    if (!response.ok) {
        throw new Error("Failed to create job");
    }
    return (await response.json()) as JobData;
}

// PUT /jobs/:id and PATCH /jobs/:id
export async function updateJob(
    id: number | string,
    jobData: Required<JobData> // Required with PUT, Partial with PATCH
) {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
        method: "PUT", // or "PATCH"
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData)
    });
    if (!response.ok) {
        throw new Error(`Failed to update job with id: ${id}`);
    }
    return (await response.json()) as JobData;
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
export async function fetchHousingConditions() {
    const response = await fetch(`${API_BASE_URL}/housing-conditions`);
    if (!response.ok) {
        throw new Error("Failed to fetch housing conditions");
    }
    return (await response.json()) as { id: number; name: string }[];
}

// GET /housing-offer-types
export async function fetchHousingOfferTypes() {
    const response = await fetch(`${API_BASE_URL}/housing-offer-types`);
    if (!response.ok) {
        throw new Error("Failed to fetch housing offer types");
    }
    return (await response.json()) as { id: number; name: string }[];
}

// GET /housing-types
export async function fetchHousingTypes() {
    const response = await fetch(`${API_BASE_URL}/housing-types`);
    if (!response.ok) {
        throw new Error("Failed to fetch housing types");
    }
    return (await response.json()) as { id: number; name: string }[];
}

// GET /job-types
export async function fetchJobTypes() {
    const response = await fetch(`${API_BASE_URL}/job-types`);
    if (!response.ok) throw new Error("Failed to fetch job types");
    return (await response.json()) as { id: number; name: string }[];
}

// GET /job-industries
export async function fetchJobIndustries() {
    const response = await fetch(`${API_BASE_URL}/job-industries`);
    if (!response.ok) throw new Error("Failed to fetch job industries");
    return (await response.json()) as { id: number; name: string }[];
}
