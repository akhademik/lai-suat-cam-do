<script lang="ts">
  import CDateInput from '$lib/common/c-date-input.svelte';
  import CPawnMoney from '$lib/common/c-pawn-money.svelte';
  import type { TheAsset, TheAssetItem } from '$lib/types/pawn-shop';
  import { get_total_days } from '$lib/utils/formHelper';
  import MultipleResult from './components/multiple-result.svelte';

  let first_of_month = new Date();
  first_of_month.setDate(1);

  const the_asset: TheAsset = {
    pawn_date: first_of_month,
    pawn_money: undefined,
    total_days: null,
    redemption_date: new Date()
  };

  let the_asset_array: TheAssetItem[] = [];

  const on_add_click = () => {
    if (!the_asset.pawn_money) return;
    the_asset_array = [
      ...the_asset_array,
      {
        id: crypto.randomUUID(),
        pawn_money: the_asset.pawn_money,
        total_days: the_asset.total_days
      }
    ];

    the_asset.pawn_money = undefined;
  };

  $: the_asset.total_days = get_total_days(the_asset.pawn_date, the_asset.redemption_date);
</script>

<div class="flex flex-col w-full gap-4 sm:max-w-4xl sm:flex-row-reverse">
  <MultipleResult value={the_asset_array} />
  <div class="flex flex-col w-full gap-3 sm:justify-center sm:gap-4 sm:border sm:p-2">
    <CPawnMoney bind:value={the_asset.pawn_money} />
    <CDateInput
      name="Ngày Cầm"
      bind:value={the_asset.pawn_date} />
    <CDateInput
      name="Ngày Chuộc"
      bind:value={the_asset.redemption_date} />
    <div class="flex flex-col gap-1">
      <p>Số Ngày Cầm</p>
      <input
        class="px-2 py-1 font-bold tracking-widest text-yellow-300 border border-white bg-slate-600 sm:h-12"
        disabled
        type="text"
        value={the_asset.total_days} />
    </div>
    <div class="flex items-center justify-center gap-3">
      <button
        on:click={() => (the_asset_array = [])}
        class="w-20 px-3 py-1 text-lg font-bold border border-white">Xoá</button>
      <button
        on:click={on_add_click}
        class="w-20 px-3 py-1 text-lg font-bold border border-white">Thêm</button>
    </div>
  </div>
</div>
