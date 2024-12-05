import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { apiInstance, apiInstanceFetch } from '../../components/utils/api/axiosApi';
import { DangerRight, Success } from '../../components/utils/toastServices';
import { userData_ } from '../../components/utils/config';

// Define the banner type
interface Video {
    _id: string;
    isActive: boolean;
    videoOneData: any,
    followData: any,
    [key: string]: any; // other properties can be included as needed
}

interface VideoState {
    videosDataAll: Video[];
    followData: {},
    videoOneData: any
    isLoading: boolean;
}

const initialState: VideoState = {
    videosDataAll: [],
    videoOneData: {},
    followData: {},
    isLoading: false,
};

interface ApiResponse<T = any> {
    status: boolean;
    videoData?: T;
    payload: any,
    data: T;
}

export const getAllVideos = createAsyncThunk<ApiResponse<Video[]>, { start: number; limit: number }>(
    'video/getAllVideos',
    async ({ start, limit }) => {
        return apiInstanceFetch.get<ApiResponse<Video[]>>(`video/getAllVideos?start=${start}&limit=${limit}`);
    }
);

export const getVideoIdToVideo = createAsyncThunk<ApiResponse<Video[]>, { videoId: string }>(
    'video/getVideIdToVideo',
    async ({ videoId }) => {
        return apiInstanceFetch.get<ApiResponse<Video[]>>(`video/getVideIdToVideo/${videoId}`);
    }
);


export const likeVideo = createAsyncThunk<AxiosResponse<ApiResponse<Video>>, { userId: any, videoId: any, like: boolean }>(
    'video/likeVideo',
    async (payload) => {
        return apiInstance.post('video/likeVideo', payload);
    }
);

export const createCommentVideo = createAsyncThunk<AxiosResponse<ApiResponse<Video>>, any>(
    'video/video/comments',
    async (payload) => {
        return apiInstance.post(`video/video/comments`, payload);
    }
);


export const createVideo = createAsyncThunk<AxiosResponse<ApiResponse<Video>>, any>(
    'video/createVideo',
    async (payload: any) => {
        return apiInstance.post('video/createVideo', payload);
    }
);



export const updateShort = createAsyncThunk<AxiosResponse<ApiResponse<Video>>, Video>(
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

// export const isActive = createAsyncThunk<AxiosResponse<ApiResponse<Banner>>, { id: string, data: Partial<Banner> }>(
//     'banner/isActive',
//     async (payload) => {
//         return apiInstanceFetch.put(`banner/isActive?id=${payload.id}`, payload.data);
//     }
// );

const videoSlice = createSlice({
    name: 'videoSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllVideos.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllVideos.fulfilled, (state, action) => {
                console.log(action.payload);  // Check the response structure
                state.videosDataAll = action.payload.data || [];
                state.isLoading = false;
            })
            .addCase(getAllVideos.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getVideoIdToVideo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getVideoIdToVideo.fulfilled, (state, action) => {
                console.log("action.payload", action.payload?.data);
                state.videoOneData = action.payload.data || [];
                state.isLoading = false;
            })
            .addCase(getVideoIdToVideo.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(likeVideo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(likeVideo.fulfilled, (state, action: any) => {
                console.log(action.payload);
                state.videoOneData = action.payload?.videoData || {};
                const checkLikeFilter = action.payload?.videoData?.likeData?.filter((item: any) => item?.userId === userData_?._id);
                const checkLike = checkLikeFilter && checkLikeFilter.length > 0 ? checkLikeFilter[0]?.like : false;
                if (checkLike) {
                    Success("Like successfully")
                } else {
                    DangerRight("Deslike successfully")
                }
                state.isLoading = false;
            })
            .addCase(likeVideo.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(createCommentVideo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCommentVideo.fulfilled, (state, action: any) => {
                console.log(action.payload);
                state.videoOneData = action.payload?.video || {};
                Success(action.payload?.message)
                state.isLoading = false;
            })
            .addCase(createCommentVideo.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(createVideo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createVideo.fulfilled, (state: any, action) => {
                if (action.payload.status) {
                    state.videosDataAll.unshift(action.payload.data);
                }
                Success('Video Add Successfully');
                state.isLoading = false;
            })
            .addCase(createVideo.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(updateShort.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateShort.fulfilled, (state, action) => {
                if (action.payload.data.status) {
                    const shortIndex = state.videosDataAll.findIndex(b => b._id === action.payload.data.data._id);
                    if (shortIndex !== -1) {
                        state.videosDataAll[shortIndex] = { ...state.videosDataAll[shortIndex], ...action.payload.data.data };
                    }
                    Success('Short Update Successfully');
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
                    state.videosDataAll = state.videosDataAll.filter(b => b._id !== action.meta.arg);
                    Success('Short Delete Successfully');
                }
                state.isLoading = false;
            })
            .addCase(deleteShort.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export default videoSlice.reducer;
