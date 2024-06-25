import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../interface";
import axios from "axios";

const user: User[] = [];

// hàm lấy tất cả user
export const getUser: any = createAsyncThunk(
    "users/getAllUser",
    async () => {
        const response = await axios.get("http://localhost:8080/users");
        return response.data;
    }
);

// hàm thêm mới User
export const addUser: any = createAsyncThunk(
    "users/addUser",
    async (user) => {
        const add = await axios.post("http://localhost:8080/users", user);
        return add.data;
    }
);

// hàm đi xóa user
export const deleteUser: any = createAsyncThunk(
    "users/deleteUser",
    async (id) => {
        await axios.delete(`http://localhost:8080/users/${id}`);
        return id; // return the deleted user ID
    }
);

// hàm sửa user
export const updateUser: any = createAsyncThunk(
    "users/updateUser",
    async (user: User) => {
        const response = await axios.put(`http://localhost:8080/users/${user.id}`, user);
        return response.data;
    }
);

const userReducer = createSlice({
    name: "user",
    initialState: {
        user: user,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // trạng thái chờ lấy dữ liệu
            .addCase(getUser.pending, (state, action) => {})
            // trạng thái lấy dữ liệu thành công
            .addCase(getUser.fulfilled, (state: any, action: any) => {
                state.user = action.payload;
            })
            // trạng thái lấy dữ liệu thất bại
            .addCase(getUser.rejected, (state, action) => {})
            // trạng thái thêm dữ liệu
            .addCase(addUser.fulfilled, (state: any, action: any) => {
                state.user.push(action.payload);
            })
            .addCase(deleteUser.fulfilled, (state: any, action: any) => {
                state.user = state.user.filter((item: any) => item.id !== action.payload);
            })
            .addCase(updateUser.fulfilled, (state: any, action: any) => {
                const index = state.user.findIndex((item: any) => item.id === action.payload.id);
                if (index !== -1) {
                    state.user[index] = action.payload;
                }
            });
    },
});

export default userReducer.reducer;
