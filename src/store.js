import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    articles: [],
    modalActive: false
  },
  mutations: {
    getArticles(state) {
      axios
      .get('http://www.json-generator.com/api/json/get/cqzZnadQde?indent=2').then(response => {
        state.articles = response.data.posts
      })
      .catch(error => alert(error + "\nProbably the server is unavailable"));
    },
    removeArticle(state, remId) {
      state.articles = state.articles.filter(article => article.postId != remId)
    },
    updateState(state, newState) {
      state.articles = newState;
    }
  },
  actions: {

  },

})
