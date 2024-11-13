import { create } from "zustand";
import { createAuthSlice } from "./authSlice"; 

const useBoundStore = create((...a) => ({
  ...createAuthSlice(...a),
}));

export default useBoundStore;
