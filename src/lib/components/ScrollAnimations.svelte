<script>
  import { onMount } from "svelte";

  onMount(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
      section.classList.add("animate-section");
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  });
</script>

<style>
  :global(.animate-section) {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
                transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  :global(.animate-section.animate-in) {
    opacity: 1;
    transform: translateY(0);
  }

  :global(section:first-child) {
    opacity: 1;
    transform: translateY(0);
  }
</style>
