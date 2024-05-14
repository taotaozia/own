export default {
  namespace: "true",
  state() {
    return {
      routers: [],
      menus: []
    };
  },
  mutations: {
    setRouters(state, routers) {
      state.routers = routers;
    },
    setMenus(state, menus) {
      state.routers = menus;
    }
  }
};