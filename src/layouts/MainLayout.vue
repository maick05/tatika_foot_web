<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-item-label>{{ output }}</q-item-label>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { PassService } from '../services/actions/pass/PassService';
import { MatchFieldFactory } from '../../test/mocks/MatchFieldFactory';
import { MatchFieldService } from 'src/services/field/MatchFieldService';
import { PassDestinationService } from 'src/services/actions/pass/PassDestinationService';

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    const output = ref('');
    const zone = 'BIG_AREA';
    const isAttacking = true;
    // const actionDecision = generatePlayerDecision(zone, isAttacking);
    // const destiny = escolherDestinatarioPasse([1, 4], 'T1');

    const matchFieldService = new MatchFieldService(
      MatchFieldFactory.buildMatchFieldToPass()
    );

    const passDestService = new PassDestinationService(matchFieldService);
    const resultPassDest = passDestService.chooseDestinationPlayer(
      MatchFieldFactory.buildPassPlayer(),
      2
    );

    console.log(resultPassDest);

    // const passService = new PassService(matchFieldService);
    // const resultadoPasse = passService.executePass(
    //   MatchFieldFactory.buildPassPlayer(),
    //   MatchFieldFactory.buildDestinationPlayer()
    // );

    // console.log(resultadoPasse);

    // output.value = !resultadoPasse.success ? 'ERROU' : 'PASSE SUCESSO';
    return { output };
  },
});
</script>
src/soccer/actions/passDestinysrc/soccer/actions/pass/passDestiny
