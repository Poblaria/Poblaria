export interface UserData {
  fullName: string | null;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface HousingData {
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
}

export interface HousingImageData {
  image: string; // base64
}

export interface JobData {
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
}
