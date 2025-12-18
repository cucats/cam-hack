<script>
  let { expanded = $bindable() } = $props();
</script>

<button
  class="p-2 text-zinc-300 transition-colors hover:text-emerald-400 md:hidden"
  onclick={() => (expanded = !expanded)}
  aria-label="Toggle menu"
>
  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    {#if expanded}
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    {:else}
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    {/if}
  </svg>
</button>
