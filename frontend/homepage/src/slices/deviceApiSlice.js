// src/slices/deviceApiSlice.js
import { apiSlice } from "./apiSlice";

export const deviceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyDevices: builder.query({
      query: () => ({
        url: "/api/devices/mine",
      }),
      providesTags: ["Device"],
    }),
  }),
});

export const { useGetMyDevicesQuery } = deviceApiSlice;