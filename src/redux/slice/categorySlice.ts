import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { apiInstance, apiInstanceFetch } from '../../components/utils/api/axiosApi';
import { DangerRight, Success } from '../../components/utils/toastServices';

// Define the banner type
interface Category {
    _id: string;
    isActive: boolean;
    [key: string]: any; // other properties can be included as needed
}

interface CategoryState {
    category: Category[];
    isLoading: boolean;
}

const initialState: CategoryState = {
    category: [],
    isLoading: false,
};

interface ApiResponse<T = any> {
    status: boolean;
    data: T;
}

export const getAllCategory = createAsyncThunk<ApiResponse<Category[]>>(
    'category/getCategory',
    async () => {
        return apiInstanceFetch.get<ApiResponse<Category[]>>(`category/getCategory`);
    }
);

export const createCategory = createAsyncThunk<AxiosResponse<ApiResponse<Category>>, Category>(
    'category/createCategory',
    async (data) => {
        return apiInstance.post('category/createCategory', data);
    }
);

export const updateShort = createAsyncThunk<AxiosResponse<ApiResponse<Category>>, Category>(
    'short/update',
    async (payload) => {
        return apiInstance.patch(`short/update`, payload);
    }
);

export const deleteShort = createAsyncThunk<AxiosResponse<ApiResponse<null>>, string>(
    'short/delete',
    async (id) => {
        return apiInstanceFetch.delete(`short/delete?bannerId=${id}`);
    }
);

const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllCategory.fulfilled, (state, action:any) => {
                console.log(action.payload);  // Check the response structure
                state.category = action.payload.data?.category || [];
                state.isLoading = false;
            })
            .addCase(getAllCategory.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(createCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                if (action.payload.data.status) {
                    state.category.unshift(action.payload.data.data);
                    Success('Category Add Successfully');
                }
                state.isLoading = false;
            })
            .addCase(createCategory.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(updateShort.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateShort.fulfilled, (state, action) => {
                if (action.payload.data.status) {
                    const shortIndex = state.category.findIndex(b => b._id === action.payload.data.data._id);
                    if (shortIndex !== -1) {
                        state.category[shortIndex] = { ...state.category[shortIndex], ...action.payload.data.data };
                    }
                    Success('Category Update Successfully');
                }
                state.isLoading = false;
            })
            .addCase(updateShort.rejected, (state) => {
                state.isLoading = false;
            })

            // .addCase(isActive.pending, (state) => {
            //     state.isLoading = true;
            // })
            // .addCase(isActive.fulfilled, (state, action) => {
            //     if (action.payload.data.status) {
            //         const updatedShort = action.payload.data.data;
            //         const shortIndex = state.shorts.findIndex(b => b._id === updatedShort._id);
            //         if (shortIndex !== -1) {
            //             state.shorts[shortIndex].isActive = updatedShort.isActive;
            //         }
            //         Success('Short Status Update Successfully');
            //     }
            //     state.isLoading = false;
            // })
            // .addCase(isActive.rejected, (state) => {
            //     state.isLoading = false;
            // })

            .addCase(deleteShort.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteShort.fulfilled, (state, action) => {
                if (action.payload.data.status) {
                    state.category = state.category.filter(b => b._id !== action.meta.arg);
                    Success('Short Delete Successfully');
                }
                state.isLoading = false;
            })
            .addCase(deleteShort.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export default categorySlice.reducer;
