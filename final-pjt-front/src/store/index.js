import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    popularMovies: null,
    recommendMovies: null,
    releasedMovies: null,
    scoreMovies: null,
    actors: [],
    directors: [],
    jwtToken: localStorage.getItem("jwt"),
    username: localStorage.getItem("username"),
    profileImg: localStorage.getItem("profile_path"),
    allmovies: [],
  },
  mutations: {
    SET_TOKEN: function (state, token) {
      state.jwtToken = token
      localStorage.setItem("jwt", token);
    },
    EXP_TOKEN: function (state) {
      localStorage.removeItem("jwt")
      state.jwtToken = null
    },
    GET_ALL_MOVIE_LIST: function (state, allMovieList) {
      state.allmovies = allMovieList
    },
    GET_POPULAR_MOVIE_LIST: function (state, popularMovieList) {
      state.popularMovies = popularMovieList
    },
    GET_RECOMMEND_MOVIE_LIST: function (state, recommendMovieList) {
      state.recommendMovies = recommendMovieList
    },
    GET_RELEEASED_MOVIE_LIST: function (state, releasedMovieList) {
      state.releasedMovies = releasedMovieList
    },
    GET_SCORE_MOVIE_LIST: function (state, scoreMovieList) {
      state.scoreMovies = scoreMovieList
    },
    GET_ACTORLIST: function (state, res) {
      state.actors = res.data
    },
    GET_DIRECTORLIST: function (state, res) {
      state.directors = res.data
    },
    SET_USERNAME: function (state, username) {
      localStorage.setItem("username", username);
      state.username = username
    },
    SET_PROFILE_IMG: function (state, profileImg) {
      localStorage.setItem("profile_path", profileImg)
      state.profileImg = profileImg
    },
    EXP_PROFILE_IMG: function (state, profileImg) {
      localStorage.removeItem("profile_path", profileImg)
      state.profileImg = null
    },
    EXP_USERNAME: function (state) {
      localStorage.removeItem("username")
      state.username = null
    }
  },
  actions: {
    login: function ({ commit }, credentials) {
      axios({
        method: "post",
        url: `${process.env.VUE_APP_SERVER_URL}/api/v2/api-token-auth/`,
        data: credentials,
      })
        .then(res => {
          commit("SET_TOKEN", res.data.token)
          router.go()
        })
        .catch(err => {
          Vue.notify({
            group: 'auth_notify',
            title: '유효하지 않는 계정',
            text: '아이디 또는 비밀번호를 확인하세요!',
            type: 'error'
          });
          console.log(err)

        })
    },
    logout: function ({ commit }) {
      commit("EXP_TOKEN")
      commit("EXP_USERNAME")
      commit("EXP_PROFILE_IMG")
    },
    setUsername: function ({ commit }, username) {
      commit('SET_USERNAME', username)
    },
    setProfileImg: function ({ commit, state }, credit) {
      axios({
        method: "put",
        url: `http://127.0.0.1:8000/api/v2/${state.username}/profile/`,
        data: credit,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `JWT ${state.jwtToken}`
        }
      })
        .then((res) => {
          commit('SET_USERNAME', res.data)
          commit('SET_PROFILE_IMG', res.data)
        })
        .catch((err) => {
          Vue.notify({
            group: 'auth_notify',
            title: '수정 실패!',
            text: '형식에 문제가 있습니다',
            type: 'error'
          });
          console.log(err)
        })
    },
    getAllMovies: function ({ commit }) {
      axios({
        method: "get",
        url: `${process.env.VUE_APP_SERVER_URL}/api/v1/movies/all/`,
      })
        .then((res) => {
          commit('GET_ALL_MOVIE_LIST', res.data)
        })
        .catch((err) => {
          console.log(err)
        });
    },
    getPopularMovies: function ({ commit }) {
      axios({
        method: "get",
        url: `${process.env.VUE_APP_SERVER_URL}/api/v1/movies/popularity/`,
      })
        .then((res) => {
          commit('GET_POPULAR_MOVIE_LIST', res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getRecommendMovies: function ({ commit }, data) {
      commit('GET_RECOMMEND_MOVIE_LIST', data)
    },
    getReleasedMovies: function ({ commit }) {
      axios({
        method: "get",
        url: `${process.env.VUE_APP_SERVER_URL}/api/v1/movies/release_date/`,
      })
        .then((res) => {
          commit('GET_RELEEASED_MOVIE_LIST', res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getScoreMovies: function ({ commit }) {
      axios({
        method: "get",
        url: `${process.env.VUE_APP_SERVER_URL}/api/v1/movies/score/`,
      })
        .then((res) => {
          commit('GET_SCORE_MOVIE_LIST', res.data)
        })
        .catch((err) => {
          console.log(err);
        });

    },
    getPeople: function ({ commit }) {

      // 감독 리스트 가져오기
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/v1/people/directors/',
      }).then(res => {
        commit('GET_DIRECTORLIST', res)
      }).catch(err => { console.log(err) })

      // 배우 리스트 가져오기
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/v1/people/actors/',
      }).then(res => {
        commit('GET_ACTORLIST', res)
      }).catch(err => { console.log(err) })
    },
  },
  getters: {
    isLogin: function (state) {
      return state.jwtToken ? true : false
    },
    config: function (state) {
      return {
        Authorization: `JWT ${state.jwtToken}`
      }
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
