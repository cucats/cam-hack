<script>
  import { onMount } from "svelte";

  let container;
  let isVisible = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible = true;
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  });
</script>

<div bind:this={container} class="scroll-reveal" class:visible={isVisible}>
  <slot />
</div>

<style>
  .scroll-reveal {
    opacity: 0;
    transform: translateY(50px) scale(0.95);
    transition:
      opacity 1s ease-out,
      transform 1s ease-out;
  }

  .scroll-reveal.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
</style>
