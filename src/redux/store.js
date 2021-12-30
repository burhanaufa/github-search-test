import { configureStore } from "@reduxjs/toolkit";
import repos from "./api";
const store = configureStore({
	reducer: {
		repos,
	},
});

export default store;
