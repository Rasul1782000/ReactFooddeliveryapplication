import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '@/lib/config';

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

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const foodApi = createApi({
  reducerPath: 'foodApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => '/categories',
      transformResponse: (response: ApiResponse<Category[]>) => response.data,
    }),
    getPopularItems: builder.query<FoodItem[], void>({
      query: () => '/popular',
      transformResponse: (response: ApiResponse<FoodItem[]>) => response.data,
    }),
    getAllFood: builder.query<FoodItem[], void>({
      query: () => '/all',
      transformResponse: (response: ApiResponse<FoodItem[]>) => response.data,
    }),
    getFoodById: builder.query<FoodItem, string>({
      query: (id) => `/${id}`,
      transformResponse: (response: ApiResponse<FoodItem>) => response.data,
    }),
  }),
});

export const { 
  useGetCategoriesQuery, 
  useGetPopularItemsQuery, 
  useGetAllFoodQuery,
  useGetFoodByIdQuery 
} = foodApi;
