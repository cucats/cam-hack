<script>
  import { slide } from "svelte/transition";

  let { expanded = $bindable() } = $props();

  function closeMenu() {
    expanded = false;
  }
</script>

<nav
  transition:slide
  class="absolute top-[60px] right-0 left-0 z-50 border-b border-zinc-800 bg-black/95 backdrop-blur-xl md:hidden"
>
  <div class="flex flex-col space-y-2 p-4">
    <a
      class="rounded-xl px-4 py-3 text-zinc-300 transition-all hover:bg-zinc-800/50 hover:text-emerald-400"
      href="/#about"
      onclick={closeMenu}
    >
      About
    </a>
    <a
      class="rounded-xl px-4 py-3 text-zinc-300 transition-all hover:bg-zinc-800/50 hover:text-emerald-400"
      href="/#schedule"
      onclick={closeMenu}
    >
      Schedule
    </a>
    <a
      class="rounded-xl px-4 py-3 text-zinc-300 transition-all hover:bg-zinc-800/50 hover:text-emerald-400"
      href="/#rules"
      onclick={closeMenu}
    >
      Rules
    </a>
    <a
      class="rounded-xl px-4 py-3 text-zinc-300 transition-all hover:bg-zinc-800/50 hover:text-emerald-400"
      href="/#faq"
      onclick={closeMenu}
    >
      FAQ
    </a>
    <a
      class="rounded-xl border border-emerald-500/50 bg-emerald-500/20 px-4 py-3 text-center text-emerald-300 transition-all hover:bg-emerald-500/30"
      href="/signup"
      onclick={closeMenu}
    >
      Sign up!
    </a>
  </div>
</nav>
