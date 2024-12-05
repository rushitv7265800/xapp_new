import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { apiInstance, apiInstanceFetch } from '../../components/utils/api/axiosApi';
import { DangerRight, Success } from '../../components/utils/toastServices';
import { userData_ } from '../../components/utils/config';
import { AxiosResponse } from "axios";

// Types for the state and payloads
// interface UserProfile {
//   _id?: string;
//   fullName?: string;
//   email?: string;
//   uniqueId?: number; // Change this to optional
//   userImg?: string;
//   userName?: string;
//   followData:any;
//   follow?: boolean; // Change this to optional
//   birthDate?: string; // Change this to optional
//   password?: string; // Change this to optional
// }

interface AuthState {
  userProfile: any;
  userSubscriptionData: any;
  userFollowData: any,
  isAuth: boolean;
  isLoading: boolean;
}

interface LoginResponse {
  token: string;
  flag: boolean;
  status: boolean;
  message?: string;
}

interface SignUpResponse {
  status: boolean;
}

const initialState: AuthState = {
  userProfile: {},
  userSubscriptionData: [],
  userFollowData: {},
  isAuth: false,
  isLoading: false,
};

// Async actions (thunks)
export const createUser = createAsyncThunk<SignUpResponse, { name: string; email: string; password: string }>(
  "user/createUser",
  async (payload) => {
    return apiInstance.post("user/createUser", payload);
  }
);

export const loginUser = createAsyncThunk<LoginResponse, { email: string; password: string }>(
  "user/loginUser",
  async (payload) => {
    return apiInstance.post("user/loginUser", payload);
  }
);

export const createfollowUser = createAsyncThunk<AxiosResponse, any>(
  'user/followUser',
  async (payload: any) => {
    return apiInstance.post('user/followUser', payload);
  }
);

export const getUserProfile = createAsyncThunk<any, string>(
  "user/getUserProfile",
  async (userId) => {
    const response = await apiInstance.get<any>(`user/getUserProfile/${userId}`);
    return response.data; // Ensure this matches the type you expect
  }
);


export const getUserSubscription = createAsyncThunk<any, string>(
  "user/getUserSubscription",
  async (userId) => {
    const response = await apiInstance.get<any>(`user/getUserSubscription/${userId}`);
    return response.data; // Ensure this matches the type you expect
  }
);



export const getUserFollow = createAsyncThunk<any, string>(
  "user/getUserFollow",
  async (userId) => {
    const response = await apiInstance.get<any>(`user/getUserFollow/${userId}`);
    return response.data; // Ensure this matches the type you expect
  }
);

export const updateProfileUser = createAsyncThunk(
  "user/updateUser",
  async (payload: any) => {
    return apiInstance.patch(`user/updateUser/${payload?.userId}`, payload?.data);
  }
);
// Redux Slice
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setOldAdmin(state, action: any) {
      // const token_ = jwtDecode<JwtPayload & any>(action.payload.token);  // Cast the decoded token
      state.isAuth = true;
      // setToken(action.payload.token);
    },
    setLoader(state, action: PayloadAction<{ isLoading: boolean }>) {
      state.isLoading = action.payload.isLoading;
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("admin_");
      localStorage.removeItem("key");
      localStorage.removeItem("isAuth");
      state.userProfile = {};
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loginUser.fulfilled, (state, action: any) => {
      if (action.payload && action.payload.status !== false) {
        const token_ = jwtDecode<JwtPayload & any>(action.payload.token);  // Cast the decoded token
        state.userProfile = {
          fullName: token_?.fullName,
          email: token_?.email,
          userImg: token_?.image,
          _id: token_?._id,
          uniqueId: token_?.uniqueId,
          birthDate: token_?.birthDate,
          userName: token_?.userName,
          followData: token_?.followData
        };
        console.log("token_", token_)
        state.isAuth = true;
        // setToken(action.payload.token);
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(token_));
        localStorage.setItem("isAuth", "true");
        Success("Login successfully");
        window.location.href = "/user/home"
      } else {
        DangerRight(action?.payload?.message);
      }
      state.isLoading = false;
    });


    builder.addCase(loginUser.rejected, (state) => {
      state.isLoading = false;
    });

    // builder.addCase(getAdmin.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.admin = {
    //     ...state.admin,
    //     _id: action.payload?.admin?._id,
    //     flag: action.payload?.admin?.flag,
    //     name: action.payload?.admin?.name,
    //     email: action.payload?.admin?.email,
    //     image: action.payload?.admin?.image,
    //   };
    // });

    // builder.addCase(getAdmin.rejected, (state) => {
    //   state.isLoading = false;
    // });
    builder.addCase(updateProfileUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(updateProfileUser.fulfilled, (state, action: any) => {
      state.isLoading = false;
      localStorage.setItem(("user"), JSON.stringify(action.payload?.data))
      state.userProfile = {
        ...state.userProfile,
        fullName: action.payload?.data?.fullName,
        email: action.payload?.data?.email,
        userImg: action.payload?.data?.image,
        _id: action.payload?.data?._id,
        uniqueId: action.payload?.data?.uniqueId,
        birthDate: action.payload?.data?.birthDate,
        userName: action.payload?.data?.userName
      };
      Success("User Updated Successfully");
    });

    builder.addCase(updateProfileUser.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createUser.fulfilled, (state, action) => {
      if (action?.payload?.status) {
        Success("User Create Successfully");
      }
      state.isLoading = false;
    });

    builder.addCase(createUser.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getUserProfile.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload
      state.isLoading = false;
    });

    builder.addCase(getUserProfile.rejected, (state) => {
      state.isLoading = false;
    })
    builder.addCase(getUserSubscription.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getUserSubscription.fulfilled, (state, action) => {
      state.userSubscriptionData = action.payload
      state.isLoading = false;
    });

    builder.addCase(getUserSubscription.rejected, (state) => {
      state.isLoading = false;
    })

      .addCase(createfollowUser.pending, (state) => {
        state.isLoading = true;
      })
      // .addCase(createfollowUser.fulfilled, (state, action: any) => {
      //     const updatedData = {
      //       ...state.userFollowData, // Copy the original data
      //       follow: action.payload.data.followCount, // Update follow count to match action.payload.data
      //     };
      //     // state.userFollowData = updatedData
      //     console.log("updatedData", updatedData);
      //     Success(`follow status updated successfully`);
      //   state.isLoading = false;
      // })

      .addCase(createfollowUser.fulfilled, (state, action: any) => {
        // Extract new data to be added
        const newFollowData = {
          notification: action.payload.data.followData.notification,
          userData: action.payload.data.followData.userData,
        };

        // Update the followData array
        state.userFollowData.followData = state.userFollowData.followData.filter(
          (data: any) => data.userData.userId !== action.payload.data.followData.userData.userId
        );

        // Add the new data
        state.userFollowData.followData.push(newFollowData);

        // Update the follow count if needed
        const updatedData = {
          ...state.userFollowData,
          follow: action.payload.data.followCount,
        };
        state.userFollowData = updatedData
        if (action.payload.follow === true) {
          Success(action.payload.message);
        } else {
          DangerRight(action.payload.message);
        }
        state.isLoading = false;
      })
      .addCase(createfollowUser.rejected, (state) => {
        state.isLoading = false;
      })
    builder.addCase(getUserFollow.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getUserFollow.fulfilled, (state, action) => {
      state.userFollowData = action.payload
      state.isLoading = false;
    });

    builder.addCase(getUserFollow.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default authSlice.reducer;
export const { setOldAdmin, logout, setLoader } = authSlice.actions;
