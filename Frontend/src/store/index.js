import { createStore } from "vuex";
import { auth } from "/src/store/auth.module.js";

const store = createStore({
  modules: {
    auth,
  },
});

export default store;
