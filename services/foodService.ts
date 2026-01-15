import { Platform } from 'react-native';

export interface Category {
  id: number;
  name: string;
  icon_name: string;
  color: string;
  icon_color: string;
  route: string;
}

export interface FoodItem {
  id: number;
  name: string;
  price: number;
  rating: number;
  image_url: string;
  prep_time: string;
  reviews_count: number;
  is_popular: boolean;
  category_id?: number;
}

// API Response Wrapper
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// --- CONFIGURATION ---
// 1. Android Emulator: Use 'http://10.0.2.2:5000/api/food'
// 2. iOS Simulator: Use 'http://localhost:5000/api/food'
// 3. Physical Device: Use your LAN IP, e.g., 'http://192.168.1.15:5000/api/food'

const DEV_IP = '10.0.2.2'; // Change this if testing on physical device
const PORT = '5000';

const BASE_URL = Platform.select({
  android: `http://${DEV_IP}:${PORT}/api/food`,
  ios: `http://localhost:${PORT}/api/food`,
  default: `http://localhost:${PORT}/api/food`,
});

// --- HELPER ---
async function fetchApi<T>(endpoint: string): Promise<T | null> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const result: ApiResponse<T> = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'API Error');
    }
    return result.data;
  } catch (error) {
    console.warn(`[API] Error fetching ${endpoint}:`, error);
    return null;
  }
}

// --- EXPORTS ---

export const getCategories = async (): Promise<Category[]> => {
  return (await fetchApi<Category[]>('/categories')) || [];
};

export const getPopularItems = async (): Promise<FoodItem[]> => {
  return (await fetchApi<FoodItem[]>('/popular')) || [];
};

export const getAllItems = async (): Promise<FoodItem[]> => {
  return (await fetchApi<FoodItem[]>('/all')) || [];
};

export const searchFood = async (query: string): Promise<FoodItem[]> => {
  if (!query) return [];
  return (await fetchApi<FoodItem[]>(`/search?query=${encodeURIComponent(query)}`)) || [];
};

export const getFoodById = async (id: number): Promise<FoodItem | null> => {
  return await fetchApi<FoodItem>(`/${id}`);
};

export const getFoodByCategory = async (categoryId: number): Promise<FoodItem[]> => {
  return (await fetchApi<FoodItem[]>(`/category/${categoryId}`)) || [];
};