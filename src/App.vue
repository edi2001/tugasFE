<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app, input, .btn-primary, .btn-secondary {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  letter-spacing: 0.2px;
}

.container {
  max-width: 592px;
  margin: 0 auto;
  margin-top: 99px;
}

.title {
  font-weight: 700;
  font-size: 50px;
  line-height: 61px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-secondary {
  width: 185px;
  height: 55px;
  cursor: pointer;
  background: #F7F7F7;
  border-color: transparent;
  border-radius: 5px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
}

.btn-secondary:hover {
  background: #e5e5e5;
}

.btn-primary {
  width: 185px;
  height: 55px;
  font-weight: 600;
  line-height: 18px;
  cursor: pointer;
  color: #FFFFFF;
  background: #000000;
  border-radius: 5px;
}

.btn-primary:hover {
  background: #000000;
  opacity: 0.9;
}

.d-flex {
  display: flex;
}

.justify-content-center {
  justify-content: center;
}

.justify-content-between {
  justify-content: space-between;
}

.align-item-center {
  align-items: center;
}

.w-100 {
  width: 100%;
}

.radius-5 {
  border-radius: 5px;
}

.selected::after {
  display: flex;
  align-items: center;
  content: url("assets/icons/arrow-down.png");
  position: absolute;
  height: 100%;
  width: 17px;
  right: 21px;
  top: 0px;
  transition: all 0.4s;
}
</style>
