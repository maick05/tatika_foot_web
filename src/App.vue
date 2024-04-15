<template>
  <q-layout>
    <q-header>
      <!-- Seu código para o cabeçalho aqui -->
    </q-header>

    <q-drawer>
      <!-- Seu código para a gaveta (sidebar) aqui -->
    </q-drawer>

    <q-page-container>
      <!-- As páginas do seu aplicativo serão injetadas aqui -->
      <router-view></router-view>
    </q-page-container>

    <q-footer>
      <!-- Seu código para o rodapé aqui -->
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'App',
}; //
</script>

<style>
.custom-loading {
  background: rgba(255, 255, 255, 0.35);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10.5px);
  -webkit-backdrop-filter: blur(13.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.flex-container {
  display: flex;
  align-items: center;
  width: 100%;
}
</style>
