export default {
  namespace: "true",
  state() {
    return {
      admin: {
        id: 0,
        uuid: "",
        adminID: "",
        name: "",
        identity: "",
        faculty: "",
        department: "",
        post: "",
        password: "",
        createtime: "",
        updatetime: "",
        token: ""
      }
    };
  },
  mutations: {
    setUser(state, user) {
      state.admin = user;
    }
  }
};