<script>
  import { slide } from "svelte/transition";

  let { question, children } = $props();

  let expanded = $state(false);
</script>

<div
  class="glass-card overflow-hidden rounded-xl border border-zinc-800 transition-all duration-300 hover:border-emerald-500/30"
>
  <button
    class="flex w-full cursor-pointer items-center justify-between px-6 py-4 text-left transition-colors hover:bg-zinc-800/30"
    onclick={() => (expanded = !expanded)}
  >
    <span class="pr-4 font-semibold text-white">
      {@render question()}
    </span>
    <span
      class="text-emerald-400 transition-transform duration-300 {expanded
        ? 'rotate-180'
        : ''}"
    >
      <svg
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </span>
  </button>
  {#if expanded}
    <div class="px-6 pb-4 text-zinc-300" transition:slide>
      {@render children()}
    </div>
  {/if}
</div>
