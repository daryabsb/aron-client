<template>

  <Grid rows="4" cols="4" gap="2" class="w-full sm:max-w-md sm:h-auto sm:my-3 p-3 bg-inherit">

    <Button v-for="money in moneys" :key="money" class="col-span-2" variant="transparent" @click="addCash(money)">{{
        priceFormat(money)
    }}</Button>

  </Grid>
</template>
<script>
import Button from "@/components/shared/Button.vue";
import Grid from "@/components/shared/Grid.vue";
import { useOrderStore } from "@/Orders/ordersStore";
export default {
  name: "Moneys",
  components: { Button, Grid },
  setup() {
    const store = useOrderStore();
    const moneys = store.useMoneys();

    const addCash = store.addCash;
    const priceFormat = store.priceFormat

    return {
      moneys,
      addCash,
      priceFormat,
    };
  },
};
</script>
