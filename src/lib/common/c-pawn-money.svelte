<script lang="ts">
  import { format_input_money } from '$lib/utils/form-helper'

  export let value: string

  $: value = format_input_money(value)
</script>

<section>
  <p>Số Tiền Cầm</p>
  <input
    bind:value
    type="text"
    class="w-full border border-white bg-slate-700 px-2 py-1 text-red-500 sm:h-12" />
</section>
