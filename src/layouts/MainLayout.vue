<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <br />
      <q-list bordered class="rounded-borders">
        <q-item v-for="(texto, index) in matchLogs" :key="index" clickable>
          <q-item-section>
            {{ texto }}
          </q-item-section>
        </q-item>
      </q-list>
      <br />
      <q-item-label>{{ output }}</q-item-label>
      <q-item-label>Vezes: {{ times }}</q-item-label>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { PassService } from '../services/actions/pass/PassService';
import { MatchFieldFactory } from '../../test/mocks/MatchFieldFactory';
import { MatchFieldService } from 'src/services/field/MatchFieldService';
import { PassDestinationService } from 'src/services/actions/pass/PassDestinationService';
import { ChooseCrossingDestinationService } from 'src/services/actions/crossing/ChooseCrossingDestinationService';
import { AerialInterceptationService } from 'src/services/actions/crossing/AerialInterceptationService';
import { SituationEnum } from 'src/enums/ActionDecisionEnum';
import { CrossingService } from 'src/services/actions/crossing/CrossingService';

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    const matchLogs = ref([]);
    const times = ref(0);
    const output = ref('');

    const matchFieldService = new MatchFieldService(
      // MatchFieldFactory.buildMatchFieldToPass()
      MatchFieldFactory.buildMatchFieldToCross()
    );

    const crossingService = new CrossingService(matchFieldService);

    let result;
    let count = 0;
    for (let i = 0; i < 1; i++) {
      count++;
      result = crossingService.execute(MatchFieldFactory.buildCrossPlayer());
      if (result.situation && result.situation.type === SituationEnum.FREE_KICK)
        break;
      // break;
    }

    times.value = count;

    console.log(result);

    matchLogs.value = count > 1 ? [] : matchFieldService.matchLogs;

    output.value = !result.success ? 'ERROU' : 'SUCESSO';
    return { output, matchLogs, times };
  },
});
</script>
src/soccer/actions/passDestinysrc/soccer/actions/pass/passDestiny
