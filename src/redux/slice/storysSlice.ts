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
    storyAll: Short[];
    commentsShort: Short[];
    subscriptionAllShorts: [];
    commentCount: number
    isSkeleton: boolean;
    isLoading: boolean;
}

const initialState: ShortState = {
    shorts: [],
    storyAll: [],
    commentCount: 0,
    commentsShort: [],
    subscriptionAllShorts: [],
    isSkeleton: false,
    isLoading: false,
};

interface ApiResponse<T = any> {
    status: boolean;
    data: T;
}

export const createStort = createAsyncThunk<AxiosResponse<ApiResponse<Short>>, any>(
    'story/storyCreate',
    async (payload: any) => {
        return apiInstance.post('story/storyCreate', payload);
    }
);
export const getStory = createAsyncThunk<AxiosResponse<ApiResponse<null>>, string>(
    'story/getStoryAll',
    async (id) => {
        return apiInstanceFetch.get(`story/getStoryAll/${id}`);
    }
);

export const storyAction = createAsyncThunk<AxiosResponse<ApiResponse<Short>>, any>(
    'story/storyAction',
    async (payload) => {
        return apiInstance.post(`story/storyAction`, payload);
    }
);


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

const storySlice = createSlice({
    name: 'storySlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getStory.pending, (state) => {
                state.isSkeleton = true;
            })
            .addCase(getStory.fulfilled, (state: any, action) => {
                console.log(action.payload);  // Check the response structure
                state.storyAll = action.payload?.data || [];
                state.isSkeleton = false;
            })
            .addCase(getStory.rejected, (state) => {
                state.isSkeleton = false;
            })


            .addCase(storyAction.pending, (state) => {
                state.isSkeleton = true;
            })
            .addCase(storyAction.fulfilled, (state: any, action: any) => {
                console.log(action.payload);
                const newStory = action.payload?.data;

                if (newStory) {
                    // Check if the story with the same _id exists in the state
                    const existingStoryIndex = state.storyAll.findIndex((item: any) => item._id === newStory._id);

                    if (existingStoryIndex !== -1) {
                        // Update the existing story
                        state.storyAll[existingStoryIndex] = newStory;
                    } else {
                        // Add the new story
                        state.storyAll.push(newStory);
                    }
                }
                state.isSkeleton = false;
            })
            .addCase(storyAction.rejected, (state) => {
                state.isSkeleton = false;
            })

            .addCase(getSubscriptionAllShortsByIds.pending, (state) => {
                state.isSkeleton = true;
            })
            .addCase(getSubscriptionAllShortsByIds.fulfilled, (state: any, action) => {
                console.log(action.payload);  // Check the response structure
                state.subscriptionAllShorts = action.payload.data || [];
                state.isSkeleton = false;
            })
            .addCase(getSubscriptionAllShortsByIds.rejected, (state) => {
                state.isSkeleton = false;
            })


            // .addCase(createCommentShort.pending, (state) => {
            //     state.isSkeleton = true;
            // })
            // .addCase(createCommentShort.fulfilled, (state: any, action: any) => {
            //     console.log(action.payload);  // Check the response structure
            //     state.commentCount = action.payload.commentCount || 0;
            //     state.shorts = state.shorts.unshift(action.payload?.short);
            //     state.isSkeleton = false;
            //     Success("Comment Add Successfully")
            // })
            // .addCase(createCommentShort.rejected, (state) => {
            //     state.isSkeleton = false;
            // })

            .addCase(getCommentForShort.pending, (state) => {
                state.isSkeleton = true;
            })
            .addCase(getCommentForShort.fulfilled, (state, action: any) => {
                console.log(action.payload);  // Check the response structure
                state.commentsShort = action.payload.comments || [];
                state.commentCount = action.payload.commentCount || 0;
                state.isSkeleton = false;
            })
            .addCase(getCommentForShort.rejected, (state) => {
                state.isSkeleton = false;
            })

            .addCase(createStort.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createStort.fulfilled, (state, action) => {
                if (action.payload.data.status) {
                    state.shorts.unshift(action.payload.data.data);
                    Success('Short Add Successfully');
                }
                state.isLoading = false;
            })
            .addCase(createStort.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(likeShort.pending, (state) => {
                state.isSkeleton = true;
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
                state.isSkeleton = false;
            })
            .addCase(likeShort.rejected, (state) => {
                state.isSkeleton = false;
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
                    const updatedShort = state.shorts.find(
                        (short) => short?._id === action.meta.arg.shortId
                    );

                    // Display appropriate notification
                    // if (updatedShort?.user?.userData?.followActive) {
                    //     Success("Short Followed Successfully");
                    // } else {
                    //     DangerRight("Short Unfollowed Successfully");
                    // }
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

export default storySlice.reducer;
