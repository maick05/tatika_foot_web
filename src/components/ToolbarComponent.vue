<template>
  <q-toolbar>
    <div class="flex-container">
      <q-btn flat round dense icon="menu" class="q-mr-sm" />
      <q-toolbar-title>{{ title }}</q-toolbar-title>
      <q-btn
        v-if="showFilterButton"
        fab
        icon="tune"
        @click="toggleFilter()"
        class="q-mb-md btn-filter"
      >
        <q-tooltip> Filtros </q-tooltip>
      </q-btn>
    </div>
  </q-toolbar>
</template>

<script lang="ts">
import 'src/css/pages/list/filter.css';
import 'src/css/components/toolbar.css';
import { EntitySchema } from 'src/interface/schema/FormResponse';
import { ToolbarService } from 'src/services/pages/ToolbarService';

import { onMounted, ref } from 'vue';

export default {
  name: 'ToolbarComponent',
  props: {
    showFilterButton: {
      type: Boolean,
      default: false,
    },
    entity: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
  },
  methods: {
    toggleFilter() {
      this.$emit('toggle-filter');
    },
  },

  setup(props) {
    const title = ref('');
    const service = new ToolbarService(props.entity);
    const metaValues = ref<Partial<EntitySchema>>({
      translations: {
        entityLabel: '',
        itemLabel: '',
        entityDescription: '',
      },
    });

    onMounted(async () => {
      const entitySchema = await service.loadMeta();
      metaValues.value = {
        translations: entitySchema.translations,
      };
      title.value = service.actionTitle(
        props.action,
        entitySchema.translations
      );
    });

    return {
      metaValues,
      title,
    };
  },
};
</script>
