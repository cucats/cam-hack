<script>
  import { slide } from "svelte/transition";
  import Chevron from "$lib/components/Chevron.svelte";

  let { question, children } = $props();

  let expanded = $state(false);
</script>

<div
  class="glass-card hover:border-primary-500/30 overflow-hidden transition-all duration-300"
>
  <button
    class="text-dark-100 hover:text-primary-400 flex w-full cursor-pointer items-center justify-between text-left font-semibold transition-colors"
    onclick={() => (expanded = !expanded)}
  >
    <span class="flex items-center gap-3">
      <span
        class="from-primary-500/20 to-accent-500/20 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br"
      >
        <span class="text-primary-400 text-sm">?</span>
      </span>
      {@render question()}
    </span>
    <Chevron {expanded} />
  </button>

  {#if expanded}
    <div
      class="text-dark-300 mt-4 border-t border-white/10 pt-4"
      transition:slide
    >
      {@render children()}
    </div>
  {/if}
</div>
