<script lang="ts">
  import CDateInput from '$lib/common/c-date-input.svelte'
  import CPawnMoney from '$lib/common/c-pawn-money.svelte'
  import { pawn_record_init, total_pawn_days } from '$lib/utils/form-helper'
  import SingleResult from './components/single-result.svelte'

  let pawn_record = pawn_record_init()

  $: pawn_record.total_days = total_pawn_days(pawn_record.pawn_date, pawn_record.redemption_date)
  $: sessionStorage.setItem('pawn-item', JSON.stringify(pawn_record))
</script>

<div class="flex w-full flex-col gap-4 sm:max-w-3xl sm:flex-row-reverse">
  <SingleResult asset={pawn_record} />
  <div class="flex w-full flex-col gap-3 sm:gap-4 sm:border sm:p-2">
    <CPawnMoney bind:value={pawn_record.pawn_money} />
    <CDateInput
      name="Ngày Cầm"
      bind:value={pawn_record.pawn_date} />
    <CDateInput
      name="Ngày Chuộc"
      bind:value={pawn_record.redemption_date} />
    <div class="flex flex-col gap-1">
      <p>Số Ngày Cầm</p>
      <input
        class="border border-white bg-slate-600 px-2 py-1 font-bold tracking-widest text-yellow-300 sm:h-12"
        disabled
        type="text"
        value={pawn_record.total_days} />
    </div>
  </div>
</div>
