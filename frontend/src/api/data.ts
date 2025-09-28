export type UserData = {
    id: number;
    fullName: string | null;
    email: string;
    password: string;
};

export type LoginData = {
    email: string;
    password: string;
};

type HousingDataBase = {
    id: number;
    title: string;
    description?: string | null;
    price: number;
    typeId: number;
    offerTypeId: number;
    conditionId: number;
    rooms: number;
    bathrooms: number;
    area: number;
    landArea?: number | null;
    address: string;
    latitude: number;
    longitude: number;
    isAvailable?: boolean;
};

export type HousingData = HousingDataBase & {
    imageId?: number;
};

export type HousingDataWithImage = HousingDataBase & {
    image?: string; // base64
};

export type HousingImageData = {
    id: number;
    image: string; // base64
};

export type JobData = {
    id: number;
    title: string;
    description?: string | null;
    company: string;
    address?: string | null;
    salary?: number | null;
    typeId: number;
    industryId: number;
    isRemote?: boolean;
    latitude?: number | null;
    longitude?: number | null;
    isAvailable?: boolean;
};
