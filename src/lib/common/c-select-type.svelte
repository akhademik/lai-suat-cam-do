<script lang="ts">
  type Choice = 'single' | 'multiple'
  import { createEventDispatcher } from 'svelte'

  export let choice: Choice
  const dispatch = createEventDispatcher()
  const css_selected = 'bg-slate-50 text-slate-700 border-2 border-red-500'

  $: is_single = choice === 'single'
</script>

<form class=" flex select-none items-center justify-center gap-3">
  <label
    class="relative w-32 cursor-pointer border px-3 py-1 text-center {is_single && css_selected}"
    >Một Món <input
      type="radio"
      name="type_select"
      value="single"
      class="invisible absolute"
      on:change={() => dispatch('change', (choice = 'single'))}
      checked={is_single} /></label>
  <label
    class="relative w-32 cursor-pointer border px-3 py-1 text-center {!is_single && css_selected}"
    >Nhiều Món <input
      type="radio"
      name="type_select"
      value="multiple"
      class="invisible absolute"
      on:change={() => dispatch('change', (choice = 'multiple'))}
      checked={!is_single} /></label>
</form>
