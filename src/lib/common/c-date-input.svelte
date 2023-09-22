<script lang="ts">
  import { vi } from 'date-fns/locale';
  import { DateInput, localeFromDateFnsLocale } from 'date-picker-svelte';

  export let name: string;
  export let value: Date | null;

  let one_year_ago = new Date();
  one_year_ago.setFullYear(one_year_ago.getFullYear() - 1);
</script>

<section>
  <p>{name}</p>
  <div class="border border-white outline-none sm:[&>div>input]:h-12">
    <DateInput
      bind:value
      format="dd-MM-yyyy"
      min={one_year_ago}
      locale={localeFromDateFnsLocale(vi)}
      closeOnSelection={true} />
  </div>
</section>

<style>
  :root {
    --date-input-width: 100%;
    --date-picker-background: rgb(51 65 85);
    --date-picker-foreground: white;
  }
</style>
