<script>
  import { slide } from "svelte/transition";
  import Chevron from "$lib/components/Chevron.svelte";

  let { question, children } = $props();

  let expanded = $state(false);
</script>

<div class="faq-item">
  <button
    class="faq-button"
    onclick={() => (expanded = !expanded)}
  >
    {@render question()}
    <Chevron {expanded} />
  </button>
  {#if expanded}
    <div class="faq-content" transition:slide>
      {@render children()}
    </div>
  {/if}
</div>

<style>
  .faq-item {
    margin-bottom: 1rem;
    padding: 1rem;
    background: rgba(26, 26, 26, 0.5);
    border: 1px solid rgba(0, 255, 136, 0.1);
    border-radius: 0.5rem;
    transition: all 0.3s ease;
  }

  .faq-item:hover {
    border-color: rgba(0, 255, 136, 0.3);
  }

  .faq-button {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0;
    background: transparent;
    border: none;
    color: var(--color-text-light);
    font-weight: 600;
    font-size: 1rem;
    text-align: left;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .faq-button:hover {
    color: var(--color-primary);
  }

  .faq-content {
    padding-top: 1rem;
    color: var(--color-text-muted);
    line-height: 1.6;
  }
</style>
