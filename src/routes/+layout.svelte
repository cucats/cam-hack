<script>
  import "../app.css";
  import SplashHeader from "$lib/components/header/SplashHeader.svelte";
  import { page } from "$app/state";

  let { children } = $props();

  const isHomePage = $derived(page.url.pathname === "/");
</script>

{#if isHomePage}
  <SplashHeader />
{:else}
  <header class="glass-panel border-b border-neon-green/20 sticky top-0 z-50">
    <div class="mx-auto max-w-7xl px-4 sm:px-8">
      <div class="flex h-16 items-center justify-between">
        <a href="/" class="flex items-center gap-3 select-none group">
          <img
            src="/cam-hack-logo-text.png"
            alt="Cam Hack Logo"
            class="h-10 transition-transform duration-300 group-hover:scale-110"
          />
          <span class="text-lg font-bold text-white">
            Cam Hack <span class="neon-text">2025</span>
          </span>
        </a>
        <a
          href="/"
          class="text-gray-400 hover:text-neon-green transition-colors duration-300"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  </header>
{/if}

<main class="flex-1 relative z-10">
  {@render children()}
</main>
