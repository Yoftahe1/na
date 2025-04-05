import Cookies from "js-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "@/constants/api";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: "include",
});

export interface UserI {
  first_name: string;
  last_name: string;
  phone_number: string;
  date_of_birth?: string;
  address?: string;
  xp: number;
}

export interface UsersI {
  users: UserI[];
  total: number;
  totalPages: number;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query<
      UsersI,
      { page: number; first_name: string; last_name: string }
    >({
      query: ({ page, first_name, last_name }) => {
        const accessToken = Cookies.get("access_token");
        return {
          url: `user/getAll?first_name=${first_name}&last_name=${last_name}&page=${page}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
