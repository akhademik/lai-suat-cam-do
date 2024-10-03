<script lang="ts">
  import CDateInput from '$lib/common/c-date-input.svelte'
  import CPawnMoney from '$lib/common/c-pawn-money.svelte'
  import { init_pawn_item_array, pawn_record_init, total_pawn_days } from '$lib/utils/form-helper'
  import MultipleResult from './components/multiple-result.svelte'

  const pawn_record = pawn_record_init()
  let pawn_item_array = init_pawn_item_array()

  const handle_add = () => {
    if (!pawn_record.pawn_money) return
    pawn_item_array = [
      ...pawn_item_array,
      {
        id: crypto.randomUUID(),
        pawn_money: pawn_record.pawn_money,
        total_days: pawn_record.total_days,
      },
    ]

    pawn_record.pawn_money = ''
  }

  const handle_delete = (event: CustomEvent<number>) => {
    const item_index = event.detail
    pawn_item_array.splice(item_index, 1)
    pawn_item_array = pawn_item_array
  }

  $: pawn_record.total_days = total_pawn_days(pawn_record.pawn_date, pawn_record.redemption_date)
  $: sessionStorage.setItem('pawn-item-array', JSON.stringify(pawn_item_array))
</script>

<div class="flex w-full flex-col gap-4 sm:max-w-4xl sm:flex-row-reverse">
  <MultipleResult
    asset_array={pawn_item_array}
    on:delete={handle_delete} />
  <div class="flex w-full flex-col gap-3 sm:justify-center sm:gap-4 sm:border sm:p-2">
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
    <div class="flex items-center justify-center gap-3">
      <button
        on:click={() => (pawn_item_array = [])}
        class="w-20 border border-white px-3 py-1 text-lg font-bold">Xoá</button>
      <button
        on:click={handle_add}
        class="w-20 border border-white px-3 py-1 text-lg font-bold">Thêm</button>
    </div>
  </div>
</div>
