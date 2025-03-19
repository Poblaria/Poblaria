export interface UserData {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
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
  latitude: number;
  longitude: number;
  is_available?: boolean;
}
