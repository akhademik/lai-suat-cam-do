<script lang="ts">
  import CDateInput from '$lib/common/c-date-input.svelte';
  import CPawnMoney from '$lib/common/c-pawn-money.svelte';
  import type { TheAsset, TheAssetItem } from '$lib/types/pawn-shop';
  import { get_total_days } from '$lib/utils/formHelper';
  import MultipleResult from './components/multiple-result.svelte';

  let first_of_month = new Date();
  first_of_month.setDate(1);

  const asset: TheAsset = {
    pawn_date: first_of_month,
    pawn_money: '',
    total_days: 0,
    redemption_date: new Date()
  };

  let asset_array: TheAssetItem[] = [];

  const on_add_click = () => {
    if (!asset.pawn_money) return;
    asset_array = [
      ...asset_array,
      {
        id: crypto.randomUUID(),
        pawn_money: asset.pawn_money,
        total_days: asset.total_days
      }
    ];

    asset.pawn_money = '';
  };

  $: asset.total_days = get_total_days(asset.pawn_date, asset.redemption_date);
</script>

<div class="flex w-full flex-col gap-4 sm:max-w-4xl sm:flex-row-reverse">
  <MultipleResult {asset_array} />
  <div class="flex w-full flex-col gap-3 sm:justify-center sm:gap-4 sm:border sm:p-2">
    <CPawnMoney bind:value={asset.pawn_money} />
    <CDateInput
      name="Ngày Cầm"
      bind:value={asset.pawn_date} />
    <CDateInput
      name="Ngày Chuộc"
      bind:value={asset.redemption_date} />
    <div class="flex flex-col gap-1">
      <p>Số Ngày Cầm</p>
      <input
        class="border border-white bg-slate-600 px-2 py-1 font-bold tracking-widest text-yellow-300 sm:h-12"
        disabled
        type="text"
        value={asset.total_days} />
    </div>
    <div class="flex items-center justify-center gap-3">
      <button
        on:click={() => (asset_array = [])}
        class="w-20 border border-white px-3 py-1 text-lg font-bold">Xoá</button>
      <button
        on:click={on_add_click}
        class="w-20 border border-white px-3 py-1 text-lg font-bold">Thêm</button>
    </div>
  </div>
</div>
