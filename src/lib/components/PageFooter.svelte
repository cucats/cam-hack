<script>
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

  let footerElement;

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      footerElement,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: footerElement,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      },
    );
  });
</script>

<footer bind:this={footerElement} class="relative overflow-hidden py-16">
  <div
    class="from-dark-950 via-dark-900/50 absolute inset-0 bg-gradient-to-t to-transparent"
  ></div>

  <div class="relative mx-auto max-w-7xl px-4">
    <div
      class="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8"
    >
      <a
        href="mailto:camhack@cucats.org"
        class="text-dark-400 hover:text-primary-400 flex items-center gap-2 transition-colors"
      >
        <svg
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          ></path>
        </svg>
        Contact
      </a>
      <span class="text-dark-600 hidden sm:inline">•</span>
      <a
        href="/code-of-conduct"
        class="text-dark-400 hover:text-primary-400 flex items-center gap-2 transition-colors"
      >
        <svg
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          ></path>
        </svg>
        Code of Conduct
      </a>
      <span class="text-dark-600 hidden sm:inline">•</span>
      <a
        href="/discord"
        target="_blank"
        class="text-dark-400 hover:text-primary-400 flex items-center gap-2 transition-colors"
      >
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
          />
        </svg>
        Discord
      </a>
    </div>

    <div class="text-center">
      <div class="mb-4 inline-flex items-center gap-4">
        <img
          src="/cam-hack-logo-text.png"
          alt="Cam Hack"
          class="h-10 w-10 opacity-50"
        />
        <span class="text-dark-500 text-sm">×</span>
        <img
          src="/cucats-logo-gradient-full.png"
          alt="CUCaTS"
          class="h-8 opacity-50"
        />
      </div>
      <p class="text-dark-500 text-sm">Copyright © Cam Hack 2025</p>
      <p class="text-dark-600 mt-1 text-xs">Art by Gwen Sellers</p>
    </div>
  </div>

  <div
    class="via-primary-500/30 absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent to-transparent"
  ></div>
</footer>
