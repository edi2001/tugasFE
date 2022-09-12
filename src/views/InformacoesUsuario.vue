<template>
  <div class="container">
    <div class="header">
      <h1 class="title">#{{ usuario.id }}</h1>
      <router-link to="/">
        <button class="btn-secondary">
          <span>Voltar</span>
        </button>
      </router-link>
    </div>
    <div class="d-flex align-item-center">
      <div class="usario-avatar">
        <img :src="usuario.avatar" :alt="usuario.first_name">
      </div>
      <div class="usario-first-name">
        <p class="label">Primeiro nome</p>
        <p class="data">{{ usuario.first_name }}</p>
      </div>
      <div class="usario-last-name">
        <p class="label">Último nome</p>
        <p class="data">{{ usuario.last_name }}</p>
      </div>
    </div>
    <div>
      <div class="information">
        <p class="label">Endereço de e-mail</p>
        <p class="data">{{ usuario.email }}</p>
      </div>
      <div class="information">
        <p class="label">Link do avatar</p>
        <p class="data">{{ usuario.avatar }}</p>
      </div>
      <div class="information">
        <p class="label">Link de suporte</p>
        <p class="data">{{ support.url }}</p>
      </div>
      <div class="information">
        <p class="label">Descrição do usuário</p>
        <p class="data">{{ support.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InformacoesUsuario",
  created() {
    // if(this.usuario)
    if(this.usuario.avatar === undefined) {
      this.$store.dispatch("getUsuarioReqres", this.$route.params.id)
    } else {
      this.usuario = this.$store.getters.getUsuarios.find(u => u.id === parseInt(this.$route.params.id));
      if(this.usuario.avatar.split('/')[this.usuario.avatar.split('/').length - 1] !== 'avatar.png') {
        this.$store.dispatch("getUsuarioReqres", this.$route.params.id);
      }
    }
  },
  computed: {
    usuario: {
      get() {
        return this.$store.getters.getUsuario;
      },
      set(value) {
        return value;
      }
    },
    support: {
      get() {
        return this.$store.getters.getSupport;
      },
      set(value) {
        return value;
      }
    }
  }
}
</script>

<style scoped>
img {
  width: 120px;
  height: 120px;
  border-radius: 5px;
}

.usario-first-name {
  margin-left: 34px;
}

.usario-last-name {
  margin-left: 46px;
}

.label {
  font-size: 14px;
  line-height: 17px;
  color: #797979;
}

.data {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
}
</style>
