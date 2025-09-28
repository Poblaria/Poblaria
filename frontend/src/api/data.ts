export type UserData = {
    fullName: string | null;
    email: string;
    password: string;
};

export type LoginData = {
    email: string;
    password: string;
};

export type HousingData = {
    title: string;
    description?: string | null;
    image?: string; // base64
    price: number;
    type_id: number;
    offer_type_id: number;
    rooms: number;
    bathrooms: number;
    area: number;
    land_area?: number | null;
    address: string;
    latitude: number;
    longitude: number;
    is_available?: boolean;
};

export type HousingImageData = {
    image: string; // base64
};

export type JobData = {
    title: string;
    description?: string | null;
    company: string;
    address?: string | null;
    salary?: number | null;
    type_id: number;
    is_remote?: boolean;
    latitude?: number | null;
    longitude?: number | null;
    is_available?: boolean;
};
