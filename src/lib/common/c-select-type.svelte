<script lang="ts">
  import { handle_select } from '$lib/utils/select-logic';
  import { selected_type } from '../../routes/store';

  $: is_single = $selected_type === 'single';
  const css_selected = 'bg-slate-50 text-slate-700';
</script>

<form class="flex select-none items-center justify-center gap-3">
  <label
    class="relative w-32 cursor-pointer border px-3 py-1 text-center {is_single && css_selected}"
    >Một Ngày <input
      type="radio"
      name="type_select"
      value="single"
      class="invisible absolute"
      on:change={handle_select}
      checked={is_single} /></label>
  <label
    class="relative w-32 cursor-pointer border px-3 py-1 text-center {!is_single && css_selected}"
    >Nhiều Ngày <input
      type="radio"
      name="type_select"
      value="multiple"
      class="invisible absolute"
      on:change={handle_select}
      checked={!is_single} /></label>
</form>
