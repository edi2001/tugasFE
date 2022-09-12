import Vue from "vue";
import Vuex from "vuex";

import axios from "./../../axios"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuarios: [],
    usuario: {},
    support: {}
  },
  mutations: {
    setUsuarios(state, value) {
      state.usuarios = value;
    },
    setUsuario(state, value) {
      state.usuario = value;
    },
    newUsuario(state, value) {
      state.usuarios.push(Object.assign({},value));
    },
    setSupport(state, value) {
      state.support = value;
    },
    updateUsuario(state, value) {
      const index = state.usuarios.indexOf(state.usuarios.find(u => u.id === value.id));
      if(index !== -1) state.usuarios.splice(index, 1, Object.assign({},value));
    },
    removeUsuario(state, value) {
      const index = state.usuarios.indexOf(value);
      if(index !== -1) state.usuarios.splice(index, 1);
    }
  },
  actions: {
    getUsuariosReqres({commit}) {
      axios.get(`/users`)
      .then(response => {
        commit('setUsuarios', response.data.data);
      })
      .catch(error => console.error(error))
    },
    getUsuarioReqres({commit}, id) {
      axios.get(`/users/${id}`)
      .then(response => {
        commit('setUsuario', response.data.data);
        commit('setSupport', response.data.support);
      })
      .catch(error => console.error(error))
    },
    setUsuarioLocal({commit}, usuario) {
      commit('setUsuario', usuario);
    },
    createUsuario({commit}, usuario) {
      axios.post('/users', {name: usuario.name, job: usuario.email})
        .then(response => {
          console.log(response.data)
          commit('newUsuario', usuario);

          // Esse seria o caso de uma implementação real do cadastro de usuario
          // ===================================
          // commit('newUsuario', response.data);
          // ===================================
        })
        .catch(error => console.error(error))
    },
    editUsuario({commit}, usuario) {
      axios.post(`/users/${usuario.id}`, {name: usuario.name, job: usuario.email})
        .then(response => {
          console.log(response.data)
          commit('updateUsuario', usuario);

          // Esse seria o caso de uma implementação real da atualização de usuario,
          // caso retorne update_at. Em outros casos que retorna boolean faria a validação
          // antes de fazer um commit atualizando o state.usuarios, ou fazer um splice dentro do próprio componente
          // ===================================
          // if(response.data) commit('updateUsuario', response.data);
          // ===================================
        })
        .catch(error => console.error(error))
    },
    deleteUsuario({commit}, usuario) {
      axios.delete(`/users/${usuario.id}`)
        .then(response => {
          console.log(response)
          commit('removeUsuario', usuario);

          // Esse seria o caso de uma implementação real da remoção de um usuário,
          // caso retorne um boolean ou um objeto do usuário removido faria a validação e
          // somente nessa confirmação executaria o commit
          // ===================================
          // if(response.data) commit('removeUsuario', usuario.id);
          // ===================================
        })
        .catch(error => console.error(error))
    }
    // BONUS =============================================================================
    // Poderia unificar em um único action CREATE e UPDATE,
    // passando no component this.usuario._method = 'PUT' caso seja update
    // dessa forma o próprio back do laravel já faz a tratativa
    // ===================================
    // saveUsuario({commit}, usuario) {
    //   axios.post(`/users`, usuario)
    //     .then(response => {
    //       console.log(response.data)
    //       usuario._method === 'PUT' ? commit('updateUsuario', response.data) : commit('newUsuario', response.data);
    //     })
    //     .catch(error => console.error(error))
    // }
    // ===================================
  },
  getters: {
    getUsuarios(state) {
      return state.usuarios;
    },
    getUsuario(state) {
      return state.usuario;
    },
    getSupport(state) {
      return state.support;
    }
  },
  modules: {},
});
