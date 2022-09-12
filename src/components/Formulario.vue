<template>
  <div class="form-usuario">
    <div class="form-name">
      <div class="form-label"><label>Nome do usuário</label></div>
      <input type="text" v-model="usuarioLocal.first_name">
    </div>
    <div class="radius-5 form-function">
      <div class="form-label">
        <label>Função do usuário</label>
      </div>
      <div class="d-flex w-100 select-box">
        <div :class="'options-container' + active">
          <div v-for="cargo in cargos" :key="cargo" 
            class="option" 
            @click="selectJob(cargo)"
          >
            <input type="radio" class="radio" :id="cargo" name="cargos"/>
            <label class="label-cargos" :for="cargo">{{ cargo }}</label>
          </div>
        </div>
        <div :class="selectedClass()" @click="active === '' ? active = ' active' : active = ''">
          {{ usuarioLocal.email }}
        </div>
      </div>
    </div>
    <div>
      <button class="btn-primary w-100" @click="save()">Salvar dados do usuário</button>
    </div>
  </div>
</template>

<script>
import urls from './../config/config'

export default {
  name: "FormularioUsuario",
  props: {
    usuario: {
      require: true,
      type: Object,
      default: () => ({
        id: 0,
        email: 'Selecione a função',
        first_name: "",
        last_name: "",
        avatar: ""
      })
    },
    cargos: {
      require: true,
      type: Array,
      default: () => []
    },
    editIndex: {
      require: true,
      type: Number,
      default: -1
    }
  },
  data () {
   return {
    active: "",
    usuarioLocal: Object.assign({}, this.usuario)
   }
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
    confgName(){
      let first_name = "";
      let last_name = "";
      let name = this.usuarioLocal.first_name.split(' ')

      if(name.length === 1) {
        first_name = name[0];
      } else if (name.length > 1) {
        first_name = name[0];
        for (let index = 1; index < name.length; index++) {
          last_name += name[index] + ' ';
          last_name.substring(0, last_name.length - 1);
        }
      }

      this.usuarioLocal.first_name = first_name;
      this.usuarioLocal.last_name = last_name;
    },
    selectJob(cargo) {
      this.usuarioLocal.email = cargo;
      this.active = "";
    },
    selectedClass() {
      let classe = "";
      classe = this.usuarioLocal.email === 'Selecione a função' ? 'selected ' + 'disabled' : 'selected'
      return classe
    },
    async save() {
      this.confgName();
      if(this.editIndex === -1) {
        this.usuarioLocal.id = this.usuarios[this.usuarios.length - 1].id + 1;
        this.usuarioLocal.avatar = `${urls.servidorNetlifyURL}/assets/img/avatar.png`;
        await this.$store.dispatch("createUsuario", this.usuarioLocal);
        // this.usuarios.push(Object.assign({}, this.usuario)); // utilizado antes de implementar o axios
      } else {
        await this.$store.dispatch("editUsuario", this.usuarioLocal);
        // this.usuarios.splice(this.editIndex, 1, Object.assign({}, this.usuario)); // utilizado antes de implementar o axios
      }
      this.usuarioLocal = Object.assign({}, {
        id: 0,
        email: "Selecione a função",
        first_name: "",
        last_name: "",
        avatar: "",
      })
      this.$emit('close-form');
    }
  }
}
</script>

<style scoped>
.form-usuario label {
  font-size: 16px !important;
}

.form-usuario {
  margin-top: 43px;
}

.form-label {
  margin-bottom: 12px;
}

.form-usuario label {
  font-weight: 600;
  line-height: 20px;
}

.form-usuario input{
  box-sizing: border-box;
  width: 100%;
  height: 55px;
  border: 1px solid #E5E5E5;
  border-radius: 5px;
}

.form-name {
  margin-bottom: 24px;
}

.form-name input {
  line-height: 18px;
  flex: 1;
  padding: 0 20px;
}

.form-function {
  overflow: hidden;
  margin-bottom: 24px;
}

.select-box {
  flex-direction: column;
}

.select-box .options-container {
  background: #fff;
  max-height: 0;
  width: 100%;
  opacity: 0;
  transition: all 0.4s;
  border: 1px solid #E5E5E5;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.05);
  order: 1;
}

.disabled  {
  color: #797979 !important;
}

.selected {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  line-height: 18px;
  background: transparent;
  color: #000;
  box-sizing: border-box;
  height: 55px;
  border: 1px solid #E5E5E5;
  border-radius: 5px;
  order: 0;
}

.select-box .options-container.active {
  max-height: 140px;
  opacity: 1;
  overflow-y: scroll;
}

.select-box .options-container.active + .selected::after {
  transform: rotateX(180deg);
  top: 0px;
}

.select-box .options-container::-webkit-scrollbar {
  width: 8px;
  background: #797979;
  border-radius: 0 5px 5px 0;
}

.select-box .options-container::-webkit-scrollbar-thumb {
  background: #000;
  border-radius: 0 5px 5px 0;
}

.label-cargos {
  font-weight: 400 !important;
  line-height: 18px !important;
}

.select-box .option,
.selected {
  padding: 12px 24px;
  cursor: pointer;
}

.option {
  padding: 11.18px 24px !important;
}

.select-box .option:hover {
  background: #F7F7F7;
}

.select-box label {
  cursor: pointer;
}

.select-box .option .radio {
  display: none;
}

.disabled  {
  color: #797979 !important;
}
</style>