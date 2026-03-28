<script>
  import { slide } from "svelte/transition";
  import Chevron from "$lib/components/Chevron.svelte";

  let { question, children } = $props();

  let expanded = $state(false);
</script>

<div class="group mb-4 overflow-hidden rounded-xl border border-emerald-500/20 bg-slate-900/50 backdrop-blur-sm transition-all hover:border-emerald-400/50">
  <button
    class="flex w-full cursor-pointer items-center justify-between p-6 text-left text-xl font-bold text-emerald-300 transition-colors hover:text-emerald-200"
    onclick={() => (expanded = !expanded)}
  >
    <span>
      {@render question()}
    </span>
    <Chevron {expanded} />
  </button>
  {#if expanded}
    <div class="px-6 pb-6 text-lg text-slate-200" transition:slide>
      {@render children()}
    </div>
  {/if}
</div>
