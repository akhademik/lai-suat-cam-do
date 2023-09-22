<script lang="ts">
  import type { TheAsset } from '$lib/types/pawn-shop';
  import {
    format_number_to_string,
    get_final_money,
    get_redemption_money
  } from '$lib/utils/formHelper';

  export let value: TheAsset;

  $: money = value.pawn_money || '----';
  $: normal_interest = get_redemption_money(value.pawn_money, value.total_days) || '----';
  $: discount_interest = get_redemption_money(value.pawn_money, value.total_days, 0.045) || '----';
  $: final_value_normal = get_final_money(value.pawn_money, normal_interest);
  $: final_value_discount = get_final_money(value.pawn_money, discount_interest);
</script>

<div class="flex w-full flex-col justify-center gap-2 border border-white p-2">
  <h1 class="py-3 text-center text-2xl font-bold sm:text-3xl">CẦM ĐỒ NGỌC MAI</h1>
  {#if value.pawn_money}
    <section class="flex justify-between sm:pt-16">
      <p>Tiền gốc:</p>
      <p class="font-bold">{money}</p>
    </section>
    <section class="flex justify-between">
      <p>Lãi 5 %:</p>
      <p class="text-red-500">
        {final_value_normal ? `(${format_number_to_string(normal_interest)}) - ` : ''}
        <span class="font-bold text-white">{final_value_normal || '----'}</span>
      </p>
    </section>
    <section class="flex justify-between">
      <p>Lãi 4,5 %:</p>
      <p class="text-red-500">
        {final_value_discount ? `(${format_number_to_string(discount_interest)}) - ` : ''}
        <span class="font-bold text-white">{final_value_discount || '----'}</span>
      </p>
    </section>
  {/if}
</div>
