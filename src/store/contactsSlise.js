import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contacts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://62a5d470b9b74f766a3ff7fd.mockapi.io/api/v1/',
  }),
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => '/contacts',
      providesTags: ['Contacts'],
    }),
    getContactById: builder.query({
      query: id => `/contacts/${id}`,
      providesTags: ['Contacts'],
    }),
  }),
});
export const { useGetContactsQuery, useGetContactByIdQuery } = contactsApi;
