<script>
  import { slide } from "svelte/transition";
  import { onMount } from "svelte";
  import Chevron from "$lib/components/Chevron.svelte";

  let { question, children, delay = 0 } = $props();

  let expanded = $state(false);
  let visible = $state(false);
  let questionRef;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = true;
          }
        });
      },
      { threshold: 0.2 }
    );

    if (questionRef) {
      observer.observe(questionRef);
    }

    return () => observer.disconnect();
  });
</script>

<div
  bind:this={questionRef}
  class="faq-item"
  class:visible
  class:expanded
  style="--delay: {delay}s"
>
  <button class="faq-button" onclick={() => (expanded = !expanded)}>
    <span class="question-text">
      {@render question?.()}
    </span>
    <div class="chevron-wrapper" class:rotated={expanded}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  </button>

  {#if expanded}
    <div class="answer" transition:slide={{ duration: 300 }}>
      <div class="answer-content">
        {@render children?.()}
      </div>
    </div>
  {/if}

  <div class="item-glow"></div>
</div>

<style>
  .faq-item {
    position: relative;
    background: rgba(0, 255, 136, 0.02);
    border: 1px solid rgba(0, 255, 136, 0.1);
    border-radius: 16px;
    overflow: hidden;
    opacity: 0;
    transform: translateY(20px);
    transition:
      opacity 0.6s ease,
      transform 0.6s ease,
      border-color 0.3s ease,
      background 0.3s ease;
    transition-delay: var(--delay);
  }

  .faq-item.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .faq-item:hover {
    border-color: rgba(0, 255, 136, 0.2);
    background: rgba(0, 255, 136, 0.04);
  }

  .faq-item.expanded {
    border-color: rgba(0, 255, 136, 0.3);
    background: rgba(0, 255, 136, 0.05);
  }

  .faq-item:hover .item-glow,
  .faq-item.expanded .item-glow {
    opacity: 1;
  }

  .faq-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    color: inherit;
    font-family: inherit;
    font-size: 1rem;
  }

  .question-text {
    font-weight: 600;
    color: #00ffcc;
    transition: color 0.3s ease;
  }

  .faq-button:hover .question-text {
    color: #00ff88;
  }

  .chevron-wrapper {
    flex-shrink: 0;
    color: #00ff88;
    transition: transform 0.3s ease;
  }

  .chevron-wrapper.rotated {
    transform: rotate(180deg);
  }

  .answer {
    border-top: 1px solid rgba(0, 255, 136, 0.1);
  }

  .answer-content {
    padding: 1.25rem 1.5rem;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.7;
  }

  .answer-content :global(p) {
    margin: 0;
  }

  .item-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at top left,
      rgba(0, 255, 136, 0.05) 0%,
      transparent 50%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }
</style>
