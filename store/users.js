import axios from 'axios'

export const state = () => ({
  list: [],
  currentUser: {},
})

export const mutations = {
  setUsersList(state, list) {
    state.list = list
  },
  setCurrentUser(state, user) {
    state.currentUser = user
  },
  setCurrentUserPosts(state, posts) {
    state.currentUser = { ...state.currentUser, posts }
  },
  setCurrentUserTodos(state, todos) {
    state.currentUser = { ...state.currentUser, todos }
  },
  setCurrentUserAlbums(state, albums) {
    state.currentUser = { ...state.currentUser, albums }
  },
}

export const actions = {
  async getAll({ commit }) {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users')
      commit('setUsersList', response.data)
    } catch (e) {
      throw e
    }
  },
  async getOne({ commit }, userId) {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      commit('setCurrentUser', response.data)
    } catch (e) {
      throw e
    }
  },
  async getPostsFromUser({ commit }, userId) {
    try {
      const intUserId = parseInt(userId)
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
      const postsByUser = response.data.filter(post => post.userId === intUserId)

      const commentsReponse = await axios.get(`https://jsonplaceholder.typicode.com/comments/`)
      const postsByUserWithComments = postsByUser.map(post => {
        return {
          ...post,
          comments: commentsReponse.data.filter(comment => comment.postId === post.id)
        }
      })

      commit('setCurrentUserPosts', postsByUserWithComments)
    } catch (e) {
      throw e
    }
  },
  async getTodosFromUser({ commit }, userId) {
    try {
      const intUserId = parseInt(userId)
      const response = await axios.get(`https://jsonplaceholder.typicode.com/todos`)
      const todosByUser = response.data.filter(post => post.userId === intUserId)
      commit('setCurrentUserTodos', todosByUser)
    } catch (e) {
      throw e
    }
  },
  async getAlbumsFromUser({ commit }, userId) {
    try {
      const intUserId = parseInt(userId)
      const response = await axios.get(`https://jsonplaceholder.typicode.com/albums`)
      const albumsByUser = response.data.filter(post => post.userId === intUserId)
      commit('setCurrentUserAlbums', albumsByUser)
    } catch (e) {
      throw e
    }
  },
}