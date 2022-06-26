import { createSlice } from "@reduxjs/toolkit";
import cookies from "utils/cookies";

const user = cookies.get("user");

const initialState = {
    id: null,
    firstName: null,
    lastName: null,
    login: null,
};

const userSlice = createSlice({
    name: "user",
    initialState: user || initialState,
    reducers: {
        setUser: (_, action) => {
            cookies.set("user", action.payload);

            return action.payload;
        },
        editUser: (state, action) => {
            const newUser =  {
                ...state,
                ...action,
            };
            cookies.set("user", newUser);

            return newUser;
        },
        removeUser: () => {
            cookies.remove("user");

            return initialState;
        },
    },
});

export const { setUser, removeUser, editUser } = userSlice.actions;

export default userSlice.reducer;
