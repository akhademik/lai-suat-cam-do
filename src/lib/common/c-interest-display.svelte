<script lang="ts">
  import type { InterestRate } from '../config/interest-rates'

  export let label: string
  export let interest: string
  export let finalAmount: string
  export let isTotal = false
</script>

<section class={isTotal ? 'grid grid-cols-[20%_80%] items-center' : 'grid grid-cols-[12%_48%_40%]'}>
  {#if isTotal}
    <span class="text-center">{label}</span>
    <span class="text-xl font-bold text-green-300">{finalAmount}</span>
  {:else}
    <p class="text-end">{label}</p>
    <p class="text-red-400 text-end">({interest})</p>
    <p class="font-bold text-end">{finalAmount}</p>
  {/if}
</section>