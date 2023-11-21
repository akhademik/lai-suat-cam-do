<script lang="ts">
  import CDateInput from '$lib/common/c-date-input.svelte';
  import CPawnMoney from '$lib/common/c-pawn-money.svelte';
  import type { TheAsset, TheAssetItem } from '$lib/types/pawn-shop';
  import { get_total_days, init_asset, init_asset_array } from '$lib/utils/form-helper';
  import MultipleResult from './components/multiple-result.svelte';

  const asset: TheAsset = init_asset();
  let asset_array: TheAssetItem[] = init_asset_array();

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

  const handle_delete = (event: CustomEvent<number>) => {
    const item_index = event.detail;
    asset_array.splice(item_index, 1);
    asset_array = asset_array;
  };

  $: asset.total_days = get_total_days(asset.pawn_date, asset.redemption_date);
  $: sessionStorage.setItem('asset-array', JSON.stringify(asset_array));
</script>

<div class="flex w-full flex-col gap-4 sm:max-w-4xl sm:flex-row-reverse">
  <MultipleResult
    {asset_array}
    on:delete={handle_delete} />
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
