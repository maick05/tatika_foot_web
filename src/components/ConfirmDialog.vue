<template>
  <q-dialog v-model="showing">
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="warning" color="primary" text-color="white" />
        <span class="q-ml-sm">{{ message }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" @click="cancel" />
        <q-btn flat label="Confirmar" color="negative" @click="confirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    modelValue: Boolean,
    message: {
      type: String,
      default: 'Você tem certeza?',
    },
  },
  emits: ['update:modelValue', 'confirm'],
  computed: {
    showing: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      },
    },
  },
  methods: {
    confirm() {
      this.$emit('confirm');
      this.showing = false;
    },
    cancel() {
      this.showing = false;
    },
  },
};
</script>
