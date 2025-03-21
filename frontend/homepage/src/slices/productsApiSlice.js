// // src/slices/productsApiSlice.js
// import { PRODUCTS_URL } from '../constants';
// import { apiSlice } from './apiSlice';

// export const productsApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getProducts: builder.query({
//       query: () => ({
//         url: PRODUCTS_URL,
//       }),
//       providesTags: ['Product'],
//       keepUnusedDataFor: 5,
//     }),
//     getProductDetails: builder.query({
//       query: (productId) => ({
//         url: `${PRODUCTS_URL}/${productId}`,
//       }),
//       keepUnusedDataFor: 5,
//     }),
//     createProduct: builder.mutation({
//       query: () => ({
//         url: `${PRODUCTS_URL}`,
//         method: 'POST',
//       }),
//       invalidatesTags: ['Product'],
//     }),
//     updateProduct: builder.mutation({
//       query: (data) => ({
//         url: `${PRODUCTS_URL}/${data.productId}`,
//         method: 'PUT',
//         body: data,
//       }),
//       invalidatesTags: ['Product'],
//     }),
//     uploadProductImage: builder.mutation({
//       query: (data) => ({
//         url: `/api/upload`,
//         method: 'POST',
//         body: data,
//       }),
//     }),
//     deleteProduct: builder.mutation({
//       query: (productId) => ({
//         url: `${PRODUCTS_URL}/${productId}`,
//         method: 'DELETE',
//       }),
//       providesTags: ['Product'],
//     }),
//   }),
// });

// export const {
//   useGetProductsQuery,
//   useGetProductDetailsQuery,
//   useCreateProductMutation,
//   useUpdateProductMutation,
//   useUploadProductImageMutation,
//   useDeleteProductMutation,
// } = productsApiSlice;

// src/slices/productsApiSlice.js
import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: PRODUCTS_URL }),
      providesTags: ['Product'],
    }),
    getProductDetails: builder.query({
      query: (productId) => ({ url: `${PRODUCTS_URL}/${productId}` }),
      providesTags: (result, error, productId) => [{ type: 'Product', id: productId }],
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
      providesTags: ['Product'],
    }),

    // ✅ Renamed endpoint key to 'addProductReview'
    addProductReview: builder.mutation({
      query: ({ productId, rating, comment }) => ({
        url: `${PRODUCTS_URL}/${productId}/reviews`,
        method: 'POST',
        body: { rating, comment },
      }),
      invalidatesTags: (result, error, { productId }) => [{ type: 'Product', id: productId }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  // ✅ Matches the endpoint key: 'addProductReview'
  useAddProductReviewMutation,
} = productsApiSlice;
