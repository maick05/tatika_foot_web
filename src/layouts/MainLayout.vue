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
import { ChooseCrossingDestinationService } from 'src/services/actions/crossing/ChooseCrossingDestinationService';
import { AerialInterceptationService } from 'src/services/actions/crossing/AerialInterceptationService';
import { EventZoneEnum } from 'src/enums/ActionDecisionEnum';

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
      // MatchFieldFactory.buildMatchFieldToPass()
      MatchFieldFactory.buildMatchFieldToCross()
    );

    // const passDestService = new PassDestinationService(matchFieldService);
    // const resultPassDest = passDestService.chooseDestinationPlayer(
    //   MatchFieldFactory.buildPassPlayer(),
    //   2
    // );

    // console.log(resultPassDest);

    // const passService = new PassService(matchFieldService);
    // const resultadoPasse = passService.execute(
    //   MatchFieldFactory.buildPassPlayer(),
    //   9
    // );

    // console.log(resultadoPasse);

    const crossChooseService = new ChooseCrossingDestinationService(
      matchFieldService
    );
    const crossingChoose = crossChooseService.chooseCrossingDestination(
      MatchFieldFactory.buildCrossPlayer()
    );

    const aerialInterceptService = new AerialInterceptationService(
      matchFieldService
    );
    let result;
    for (let i = 0; i <= 10000; i++) {
      result = aerialInterceptService.tryAerialInterceptation(
        MatchFieldFactory.buildCrossPlayer(),
        20,
        crossingChoose
      );
      if (result.eventResulted === EventZoneEnum.PENALTY) break;
    }

    console.log(result);

    output.value = !result.success ? 'ERROU' : 'SUCESSO';
    return { output };
  },
});
</script>
src/soccer/actions/passDestinysrc/soccer/actions/pass/passDestiny
