<script lang="ts">
  import CDateInput from '$lib/common/c-date-input.svelte';
  import CPawnMoney from '$lib/common/c-pawn-money.svelte';
  import type { TheAsset } from '$lib/types/pawn-shop';
  import { get_total_days, init_asset } from '$lib/utils/form-helper';
  import SingleResult from './components/single-result.svelte';

  let asset: TheAsset = init_asset();

  $: asset.total_days = get_total_days(asset.pawn_date, asset.redemption_date);
  $: sessionStorage.setItem('asset', JSON.stringify(asset));
</script>

<div class="flex w-full flex-col gap-4 sm:max-w-3xl sm:flex-row-reverse">
  <SingleResult {asset} />
  <div class="flex w-full flex-col gap-3 sm:gap-4 sm:border sm:p-2">
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
  </div>
</div>
