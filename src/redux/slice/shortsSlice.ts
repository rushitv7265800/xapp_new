import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { apiInstance, apiInstanceFetch } from '../../components/utils/api/axiosApi';
import { DangerRight, Success } from '../../components/utils/toastServices';

// Define the banner type
interface Short {
    _id: string;
    shortId: string,
    commentCount: number,
    isActive: boolean;
    [key: string]: any; // other properties can be included as needed
}

interface ShortState {
    shorts: Short[];
    commentsShort: Short[];
    subscriptionAllShorts: [];
    commentCount: number
    isLoading: boolean;
}

const initialState: ShortState = {
    shorts: [],
    commentCount: 0,
    commentsShort: [],
    subscriptionAllShorts: [],
    isLoading: false,
};

interface ApiResponse<T = any> {
    status: boolean;
    data: T;
}

export const getAllShort = createAsyncThunk<ApiResponse<Short[]>, { start: number; limit: number; userId: String }>(
    'short/getAllShort',
    async ({ start, limit, userId }) => {
        return apiInstanceFetch.get<ApiResponse<Short[]>>(`short/getAllShort?start=${start}&limit=${limit}&userId=${userId}`);
    }
);
export const getSubscriptionAllShortsByIds = createAsyncThunk<AxiosResponse<ApiResponse<Short>>, any>(
    'short/getSubscriptionAllShortsByIds',
    async (payload: any) => {
        return apiInstance.post('short/getSubscriptionAllShortsByIds', payload);
    }
);

export const createShort = createAsyncThunk<AxiosResponse<ApiResponse<Short>>, any>(
    'short/createShort',
    async (payload: any) => {
        return apiInstance.post('short/createShort', payload);
    }
);

export const toggleFollowShort = createAsyncThunk<AxiosResponse, any>(
    'short/followUserShort',
    async (payload: any) => {
        return apiInstance.post('short/followUserShort', payload);
    }
);

export const updateShort = createAsyncThunk<AxiosResponse<ApiResponse<Short>>, Short>(
    'short/update',
    async (payload) => {
        return apiInstance.patch(`short/update`, payload);
    }
);



export const likeShort = createAsyncThunk<AxiosResponse<ApiResponse<Short>>, { userId: any, shortId: any, like: boolean }>(
    'short/likeShort',
    async (payload) => {
        return apiInstance.post('short/likeShort', payload);
    }
);
export const deleteShort = createAsyncThunk<AxiosResponse<ApiResponse<null>>, string>(
    'short/delete',
    async (id) => {
        return apiInstanceFetch.delete(`short/delete?bannerId=${id}`);
    }
);

export const createCommentShort = createAsyncThunk<AxiosResponse<ApiResponse<Short>>, any>(
    'short/short/comments',
    async (payload) => {
        return apiInstance.post(`short/short/comments`, payload);
    }
);

export const getCommentForShort = createAsyncThunk<AxiosResponse<ApiResponse<Short>>, any>(
    'short/short/comments:shortId',
    async (payload) => {
        return apiInstance.get(`short/short/comments/${payload}`);
    }
);

// export const isActive = createAsyncThunk<AxiosResponse<ApiResponse<Banner>>, { id: string, data: Partial<Banner> }>(
//     'banner/isActive',
//     async (payload) => {
//         return apiInstanceFetch.put(`banner/isActive?id=${payload.id}`, payload.data);
//     }
// );

const shortSlice = createSlice({
    name: 'shortSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllShort.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllShort.fulfilled, (state: any, action) => {
                console.log(action.payload);  // Check the response structure
                state.shorts = action.payload.data || [];
                state.isLoading = false;
            })
            .addCase(getAllShort.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(getSubscriptionAllShortsByIds.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSubscriptionAllShortsByIds.fulfilled, (state: any, action) => {
                console.log(action.payload);  // Check the response structure
                state.subscriptionAllShorts = action.payload.data || [];
                state.isLoading = false;
            })
            .addCase(getSubscriptionAllShortsByIds.rejected, (state) => {
                state.isLoading = false;
            })


            .addCase(createCommentShort.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCommentShort.fulfilled, (state: any, action: any) => {
                console.log(action.payload);  // Check the response structure
                
                // Find the index of the short to update
                const index = state.shorts.findIndex(short => short._id === action.payload.short._id);
                
                if (index !== -1) {
                    // Replace the existing short with the updated one
                    state.shorts[index] = action.payload.short;
                } else {
                    // Optionally, add it to the start if it doesn't exist
                    state.shorts?.unshift(action.payload.short);
                }
            
                state.commentCount = action.payload.commentCount || 0;
                state.isLoading = false;
                Success("Comment Added Successfully");
            })
            .addCase(createCommentShort.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(getCommentForShort.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCommentForShort.fulfilled, (state, action: any) => {
                console.log(action.payload);  // Check the response structure
                state.commentsShort = action.payload.comments || [];
                state.commentCount = action.payload.commentCount || 0;
                state.isLoading = false;
            })
            .addCase(getCommentForShort.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(createShort.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createShort.fulfilled, (state, action) => {
                if (action.payload.data.status) {
                    state.shorts.unshift(action.payload.data.data);
                }
                Success('Short Add Successfully');
                state.isLoading = false;
            })
            .addCase(createShort.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(likeShort.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(likeShort.fulfilled, (state, action: any) => {
                const updatedShort = action.payload.shortData; // The updated short data from the API
                const shorts = state.shorts;

                // Find the index of the short that matches the updated one
                const shortIndex = shorts.findIndex((short: any) => short?._id === updatedShort?._id);

                if (shortIndex !== -1) {
                    // Update the existing short
                    shorts[shortIndex] = updatedShort;
                } else {
                    // If not found, add the new short data
                    shorts.push(updatedShort);
                }

                // Update the state
                state.shorts = shorts;
                if (action.meta.arg?.like) {
                    Success("Like Successfully")
                } else {
                    DangerRight("DisLike Successfully")
                }
                state.isLoading = false;
            })
            .addCase(likeShort.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(updateShort.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateShort.fulfilled, (state, action) => {
                if (action.payload.data.status) {
                    const shortIndex = state.shorts.findIndex(b => b._id === action.payload.data.data._id);
                    if (shortIndex !== -1) {
                        state.shorts[shortIndex] = { ...state.shorts[shortIndex], ...action.payload.data.data };
                    }
                    Success('Short Update Successfully');
                }
                state.isLoading = false;
            })
            .addCase(updateShort.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(toggleFollowShort.pending, (state) => {
                state.isLoading = true;
            })
            // .addCase(toggleFollowShort.fulfilled, (state, action) => {
            //     if (action.payload.status) {
            //         const shortIndex = state.shorts.findIndex(b => b?._id === action.meta.arg.shortId);
            //         if (shortIndex !== -1) {
            //             state.shorts[shortIndex] = { ...state.shorts[shortIndex], ...action?.payload?.data?.short };
            //         }
            //         console.log("state.shorts[shortIndex]",state.shorts[shortIndex]?.user?.userData?.followActive)
            //         Success('Short Update Successfully');
            //     }
            //     state.isLoading = false;
            // })

            // .addCase(toggleFollowShort.fulfilled, (state, action) => {
            //     if (action.payload.status) {
            //         const shortIndex = state.shorts.findIndex(b => b?._id === action.meta.arg.shortId);
            //         if (shortIndex !== -1) {
            //             // Perform a deep update of the specific short
            //             state.shorts[shortIndex] = {
            //                 ...state.shorts[shortIndex],
            //                 ...action.payload?.data?.short,
            //                 user: {
            //                     ...state.shorts[shortIndex]?.user,
            //                     userData: {
            //                         ...state.shorts[shortIndex]?.user?.userData,
            //                         ...action.payload?.data?.short?.user?.userData,
            //                     }
            //                 }
            //             };
            //         }
            //         console.log("state.shorts",state.shorts[shortIndex])
            //         if( state.shorts[shortIndex]?.user?.userData?.followActive){
            //             Success('Short Followed Successfully');
            //         }else{
            //             DangerRight('Short Unfollow Successfully');
            //         }
            //     }
            //     state.isLoading = false;
            // })
            .addCase(toggleFollowShort.fulfilled, (state, action) => {
                if (action.payload.status) {
                    // Extract the updated user data
                    const updatedUserData = action.payload?.data?.short?.user?.userData;
                    const userIdToUpdate = action.meta.arg.userId;

                    // Update all shorts that have the same user.userId
                    state.shorts.forEach((short, index) => {
                        if (short?.user?.userId === userIdToUpdate) {
                            state.shorts[index] = {
                                ...short,
                                user: {
                                    ...short?.user,
                                    userData: {
                                        ...short?.user?.userData,
                                        ...updatedUserData,
                                    },
                                },
                            };
                        }
                    });

                    // Find the specific short that triggered the update
                }
                const updatedShort = state.shorts.find(
                    (short) => short?._id === action.meta.arg.shortId
                );

                // Display appropriate notification
                if (updatedShort?.user?.userData?.followActive) {
                    Success("Short Followed Successfully");
                } else {
                    DangerRight("Short Unfollowed Successfully");
                }
                state.isLoading = false;
            })
            .addCase(toggleFollowShort.rejected, (state) => {
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
                    state.shorts = state.shorts.filter(b => b._id !== action.meta.arg);
                    Success('Short Delete Successfully');
                }
                state.isLoading = false;
            })
            .addCase(deleteShort.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export default shortSlice.reducer;
