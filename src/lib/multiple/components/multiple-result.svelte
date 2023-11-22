<script lang="ts">
  import type { TheAssetItem } from '$lib/types/pawn-shop'
  import {
    final_interest,
    final_money,
    final_money_no_format,
    number_to_string,
  } from '$lib/utils/form-helper'
  import { createEventDispatcher } from 'svelte'

  export let asset_array: TheAssetItem[]

  const dispatch = createEventDispatcher()
  const total_sum_normal = (value: TheAssetItem[], rate: number) => {
    let result = 0
    for (let i = 0; i < value.length; i++) {
      const interest = final_interest(value[i].pawn_money, value[i].total_days, rate)
      const amount = final_money_no_format(value[i].pawn_money, interest)
      result = result + amount!
    }
    return result
  }

  $: final_total_normal = total_sum_normal(asset_array, 0.05)
  $: final_total_discount = total_sum_normal(asset_array, 0.045)
</script>

<div class="flex flex-col justify-center w-full gap-2 p-2 border border-white">
  <h1 class="py-3 text-2xl font-bold text-center sm:text-3xl">CẦM ĐỒ NGỌC MAI</h1>
  {#if asset_array.length}
    <ul class="flex flex-col gap-3 sm:pt-12">
      {#each asset_array as { total_days, id, pawn_money }, item_index (id)}
        {@const normal_interest = final_interest(pawn_money, total_days, 0.05)}
        {@const discount_interest = final_interest(pawn_money, total_days, 0.045)}
        {@const money_normal = final_money(pawn_money, normal_interest)}
        {@const money_discount = final_money(pawn_money, discount_interest)}

        <li>
          <section class="grid grid-cols-[20%_40%_40%]">
            <span
              ><button
                class="underline hover:text-red-500 hover:line-through"
                on:click={() => dispatch('delete', item_index)}
                >Món {item_index + 1}:
              </button></span>
            <span class="text-end">{total_days} ngày</span>
            <span class="text-end">{pawn_money}</span>
          </section>
          <section class="grid grid-cols-[12%_48%_40%]">
            <p class="text-end">5 %</p>
            <p class="text-red-400 text-end">({number_to_string(normal_interest)})</p>
            <p class="font-bold text-end">{money_normal}</p>
          </section>
          <section class="grid grid-cols-[12%_48%_40%]">
            <p class="text-end">4,5 %</p>
            <p class="text-red-400 text-end">({number_to_string(discount_interest)})</p>
            <p class="font-bold text-end">{money_discount}</p>
          </section>
        </li>
      {/each}

      <hr />
      <section class="grid grid-cols-2">
        <p>Tổng:</p>
        <section class="text-end">
          <section class="grid grid-cols-[20%_80%] items-center">
            <span class="text-end">5%</span>
            <span class="text-xl font-bold text-green-300"
              >{number_to_string(final_total_normal)}</span>
          </section>
          <section class="grid grid-cols-[20%_80%] items-center">
            <span class="text-center">4,5%</span>
            <span class="text-xl font-bold text-green-300"
              >{number_to_string(final_total_discount)}</span>
          </section>
        </section>
      </section>
    </ul>
  {/if}
</div>
