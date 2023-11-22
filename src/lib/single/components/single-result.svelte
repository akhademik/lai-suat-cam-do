<script lang="ts">
  import type { TheAsset } from '$lib/types/pawn-shop'
  import { final_interest, final_money, number_to_string } from '$lib/utils/form-helper'

  export let asset: TheAsset

  $: normal_interest = final_interest(asset.pawn_money, asset.total_days, 0.05)
  $: discount_interest = final_interest(asset.pawn_money, asset.total_days, 0.045)
  $: money_normal = final_money(asset.pawn_money, normal_interest)
  $: money_discount = final_money(asset.pawn_money, discount_interest)
</script>

<div class="flex w-full flex-col justify-center gap-2 border border-white p-2">
  <h1 class="py-3 text-center text-2xl font-bold sm:text-3xl">CẦM ĐỒ NGỌC MAI</h1>
  {#if asset.pawn_money}
    <section class="flex justify-between sm:pt-16">
      <p>Tiền gốc:</p>
      <p class="font-bold">{asset.pawn_money}</p>
    </section>
    <section class="flex justify-between">
      <p>Lãi 5 %:</p>
      <p class="text-red-500">
        {money_normal && `(${number_to_string(normal_interest)})`}
        <span class="px-2 text-white">-</span>
        <span class="font-bold text-green-300">{money_normal}</span>
      </p>
    </section>
    <section class="flex justify-between">
      <p>Lãi 4,5 %:</p>
      <p class="text-red-500">
        {money_discount && `(${number_to_string(discount_interest)})`}
        <span class="px-2 text-white">-</span>
        <span class="font-bold text-green-300">{money_discount}</span>
      </p>
    </section>
  {/if}
</div>
