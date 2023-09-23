<script lang="ts">
  import CSelectType from '../lib/common/c-select-type.svelte';
  import Multiple from '../lib/multiple/multiple.svelte';
  import Single from '../lib/single/single.svelte';
  import { selected_type } from './store';
</script>

<main
  class="mx-auto flex h-screen max-w-7xl flex-col items-center gap-5 p-5 pt-[10%] font-roboto text-white">
  <CSelectType />
  {#if $selected_type === 'single'}
    <Single />
  {:else}
    <Multiple />
  {/if}
</main>
