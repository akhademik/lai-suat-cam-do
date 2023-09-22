<script lang="ts">
  import CDateInput from '$lib/common/c-date-input.svelte';
  import CPawnMoney from '$lib/common/c-pawn-money.svelte';
  import type { TheAsset } from '$lib/types/pawn-shop';
  import { get_total_days } from '$lib/utils/formHelper';
  import SingleResult from './components/single-result.svelte';

  let first_of_month = new Date();
  first_of_month.setDate(1);

  const the_asset: TheAsset = {
    pawn_date: first_of_month,
    pawn_money: undefined,
    total_days: null,
    redemption_date: new Date()
  };

  $: the_asset.total_days = get_total_days(the_asset.pawn_date, the_asset.redemption_date);
</script>

<div class="flex flex-col w-full gap-4 sm:max-w-3xl sm:flex-row-reverse">
  <SingleResult value={the_asset} />
  <div class="flex flex-col w-full gap-3 sm:gap-4 sm:border sm:p-2">
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
  </div>
</div>
