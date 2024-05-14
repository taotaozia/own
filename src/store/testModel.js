export default {
  namespace: "true",
  state() {
    return {
      username: "管理员aaa",
      count: 1
    };
  },
  getters: {
    newName(state) {
      return state.username + " 您好！";
    }
  },
  mutations: {
    updateName(state) {
      state.username = "李四";
    },
    addCount(state, number) {
      state.count += number;
    }
  },
  actions: {
    increateAsync(context, payload) {
      axios({ url: "https://api.kekc.cn/api/yien" }).then(res => {
        if (res) {
          context.commit("addCount", payload);
        }
      });
    }
  }
};

import axios from "axios";
