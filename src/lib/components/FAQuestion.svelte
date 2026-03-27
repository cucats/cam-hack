<script>
  import { slide } from "svelte/transition";
  import Chevron from "$lib/components/Chevron.svelte";

  let { question, children } = $props();

  let expanded = $state(false);
</script>

<div class="faq-question-container mb-4">
  <button
    class="faq-button mb-2 cursor-pointer font-bold"
    onclick={() => (expanded = !expanded)}
    class:expanded
  >
    {@render question()}
    <Chevron {expanded} />
  </button>
  {#if expanded}
    <div class="faq-answer mb-2" transition:slide>
      {@render children()}
    </div>
  {/if}
</div>

<style>
  .faq-question-container {
    padding: 1rem;
    border-radius: 0.75rem;
    background: linear-gradient(to right, rgba(236, 253, 245, 0.5), rgba(240, 253, 244, 0.5));
    backdrop-filter: blur(4px);
    border: 2px solid rgba(16, 185, 129, 0.2);
    transition: all 0.3s ease;
  }

  .faq-question-container:hover {
    border-color: #34d399;
    box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.1), 0 4px 6px -2px rgba(16, 185, 129, 0.05);
  }

  .faq-button {
    width: 100%;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    color: #065f46;
    transition: color 0.3s ease;
  }

  .faq-button:hover {
    color: #059669;
  }

  .faq-button.expanded {
    color: #047857;
  }

  .faq-answer {
    padding: 1rem;
    color: #064e3b;
    line-height: 1.75;
  }
</style>
