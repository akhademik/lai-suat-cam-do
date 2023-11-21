<script lang="ts">
  import CSelectType from '$lib/common/c-select-type.svelte'
  import Multiple from '$lib/multiple/multiple.svelte'
  import Single from '$lib/single/single.svelte'

  type Choice = 'single' | 'multiple'
  let choice: Choice = 'single'
</script>

<main
  class="mx-auto flex h-screen max-w-7xl flex-col items-center gap-5 p-5 pt-[10%] font-roboto text-white">
  <CSelectType
    {choice}
    on:change={event => (choice = event.detail)} />
  {#if choice === 'single'}
    <Single />
  {:else}
    <Multiple />
  {/if}
</main>
