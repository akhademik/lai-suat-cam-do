<script lang="ts">
  import type { Choice } from '$lib/types/pawn-shop'

  import Multiple from '$lib/multiple/multiple.svelte'
  import Single from '$lib/single/single.svelte'

  let choice: Choice = 'single'
  const option: Choice[] = ['single', 'multiple']

  const style_if_selected = 'bg-slate-50 text-slate-700 border-2 border-red-500'
</script>

<main
  class="mx-auto flex h-screen max-w-7xl flex-col items-center gap-5 p-5 pt-[10%] font-roboto text-white">
  <form class=" flex select-none items-center justify-center gap-3">
    {#each option as type}
      <label
        class="relative w-32 cursor-pointer border px-3 py-1 text-center
        {choice === type && style_if_selected}">
        {type === 'single' ? 'Một Món' : 'Nhiều Món'}
        <input
          type="radio"
          name="type_select"
          value={type}
          class="invisible absolute"
          checked={choice === type}
          on:change={() => (choice = type)} />
      </label>
    {/each}
  </form>

  {#if choice === 'single'}
    <Single />
  {:else}
    <Multiple />
  {/if}
</main>
