<template>
  <div>
    <div class="header">
      <h1 class="title"><b>Usuários</b></h1>
      <button v-show="!createUsuario" class="btn-primary" @click="close()">
        <span>Novo usuário</span>
      </button>
      <button v-show="createUsuario" class="btn-secondary" @click="close()">
        <span>Cancelar</span>
      </button>
    </div>
    <!-- Formulário -->
    <transition name="slide">
      <Formulario
          v-if="createUsuario"
          :usuario="usuario"
          :cargos="cargos"
          :editIndex="editIndex"
          @close-form="closeForm()"
        />
    </transition>
    
    <!-- Lista de Usuários -->
    <div class="list-usuarios">
      <ul>
        <li v-for="usuario in usuarios" :key="usuario.id" class="d-flex">
          <div class="style-list"></div>
          <div class="w-100 radius-5 card-usuario">
            <div class="d-flex justify-content-between">
              <div class="d-flex card-user-data">
                <div>
                  <img class="radius-5 card-avatar" :src="usuario.avatar" :alt="usuario.first_name">
                </div>
                <div class="card-text">
                  <p class="usuario-id">#{{ usuario.id }}</p>
                  <p class="usuario-name">{{ usuario.first_name + ' ' + usuario.last_name }}</p>
                  <p class="usuario-email">{{ usuario.email }}</p>
                </div>
              </div>
              <div class="d-flex card-icons">
                <div @click="edit(usuario)"><img src="@/assets/icons/edit.png" alt="edit"></div>
                <div @click="remove(usuario)"><img src="@/assets/icons/delete.png" alt="remove"></div>
                <img @click="view(usuario)" src="@/assets/icons/view.png" alt="view">
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <transition name="fade">
      <!-- Modal -->
      <div v-if="dialog" class="w-100 modal">

        <!-- Modal content -->
        <div v-if="dialog" class="radius-5 modal-content">
          <div class="d-flex justify-content-between align-item-center">
            <h1 class="modal-title">Editar Usuário</h1>
            <span class="close" @click="dialog = !dialog">&times;</span>
          </div>
          <hr>
          <Formulario
            :usuario="usuario"
            :cargos="cargos"
            :editIndex="editIndex"
            @close-form="closeForm()"
          />
        </div>

      </div>
    </transition>
  </div>
</template>

<script>
import Formulario from './Formulario.vue'

export default {
  name: "CrudUsuarios",
  components: { Formulario },
  data () {
    return {
      placeholder: 'Selecione a função',
      createUsuario: false,
      dialog: false,
      active: "",
      editIndex: -1,
      cargos: [
        'Desenvolvedor',
        'Gerente de Projetos',
        'Tech Lead',
        'UI/UX Designer'
      ],
      usuario: {
        id: 0,
        email: 'Selecione a função',
        first_name: "",
        last_name: "",
        avatar: "",
      }
    }
  },
  created(){
    this.$store.dispatch("getUsuariosReqres");
  },
  computed: {
    usuarios: {
      get() {
        return this.$store.getters.getUsuarios;
      },
      set(value) {
        return value;
      }
    }
  },
  methods: {
    edit(usuario) {
      this.usuario = Object.assign({},usuario);
      this.usuario.first_name = this.usuario.first_name + ' ' + this.usuario.last_name;
      this.editIndex = this.usuarios.indexOf(this.usuarios.find(u => u.id === this.usuario.id));
      this.dialog = true;
    },
    async remove(usuario) {
      await this.$store.dispatch("deleteUsuario", usuario);
      // const index = this.usuarios.indexOf(usuario) // utilizado antes de implementar o axios
      // this.usuarios.splice(index, 1); // utilizado antes de implementar o axios
    },
    close() {
      this.usuario = Object.assign({}, {
        id: 0,
        email: "Selecione a função",
        first_name: "",
        last_name: "",
        avatar: "",
      })
      this.createUsuario = !this.createUsuario
    },
    async view(usuario){
      await this.$store.dispatch("setUsuarioLocal", usuario);
      this.$router.push(`/usuarios/${usuario.id}`)
    },
    closeForm() {
      this.dialog = false;
      this.editIndex = -1;
      this.createUsuario = false;
    }
  }
};
</script>

<style scoped>
/* Animação transition */
.slide-enter, .slide-leave-to {
  opacity: 0;
}

.slide-enter-active {
  animation: slide 0.7s;
  transition: opacity 0.7s;
}

.slide-leave-active {
  animation: slide 0.7s reverse;
  transition: opacity 0.7s;
}

@keyframes slide {
  0% {
    transform: translateY(-100px);
  }
  100% {
    transform: translateY(0px);
  }
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
/* -------------- */

.title {
  margin: 0 6rem 0 0;
}

@media only screen and (max-width: 660px) {
  .header {
    display: block;
  }

  .title {
    margin-bottom: 12px;
  }
}

.usuario-id, .usuario-email {
  font-size: 16px;
}

.usuario-id, .usuario-email {
  line-height: 20px;
  color: #797979;
}

.list-usuarios {
  max-width: 588px;
}

ul {
  padding: 0;
  margin-top: 43px;
}

li {
  list-style: none;
}

.style-list {
  height: 20px;
  width: 4px;
  background-color: black;
  margin-top: 20px;
}

.card-usuario {
  height: 80px;
  max-width: 592px;
  margin-bottom: 15px;
  padding: 20px 27px 20px 30px;

  background: #F7F7F7;
}

.card-avatar {
  width: 80px;
  height: 80px;
  margin-right: 25px;
}


.card-text p {
  line-height: 28px;
  margin: 0;
}

.usuario-name {
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
}

.card-icons {
  align-self: center;
}

.card-icons img {
  height: 17px;
  padding: 5px;
  border-radius: 7px;
}

.card-icons img:hover {
  background-color: rgba(0,0,0, 0.1);
  cursor: pointer;
}

@media only screen and (max-width: 560px) {
  .card-usuario {
    height: 160px;
  }
  
  .card-user-data {
    display: block;
  }

  .card-icons {
    flex-direction: column;
    align-items: center;
  }

  .card-icons img {
    margin: 10px 0;
  }
}

hr {
  border-top: 0.5px #E5E5E5;
}

.modal {
  position: fixed;
  padding-top: 0;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #000;
  background-color: rgba(0,0,0,0.4);
}

.modal-title {
  font-weight: 700;
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  width: 80%;
  box-shadow: 0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12);
}

.close {
  color: #aaa;
  float: right;
  font-size: 34px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
