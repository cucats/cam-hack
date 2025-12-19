<script>
  import { slide } from "svelte/transition";

  let { expanded = $bindable() } = $props();

  function closeMenu() {
    expanded = false;
  }
</script>

<nav
  class="glass-dark absolute top-[70px] right-0 left-0 border-t border-emerald-500/20 px-4 py-6"
  transition:slide
>
  <div class="flex flex-col gap-4">
    <a
      class="rounded-lg px-4 py-3 text-lg font-semibold text-gray-300 transition-colors hover:bg-white/5 hover:text-emerald-400"
      href="/#about"
      onclick={closeMenu}
    >
      About
    </a>
    <a
      class="rounded-lg px-4 py-3 text-lg font-semibold text-gray-300 transition-colors hover:bg-white/5 hover:text-emerald-400"
      href="/#schedule"
      onclick={closeMenu}
    >
      Schedule
    </a>
    <a
      class="rounded-lg px-4 py-3 text-lg font-semibold text-gray-300 transition-colors hover:bg-white/5 hover:text-emerald-400"
      href="/#rules"
      onclick={closeMenu}
    >
      Rules
    </a>
    <a
      class="rounded-lg px-4 py-3 text-lg font-semibold text-gray-300 transition-colors hover:bg-white/5 hover:text-emerald-400"
      href="/#faq"
      onclick={closeMenu}
    >
      FAQ
    </a>
    <a
      class="mt-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 text-center text-lg font-semibold text-black"
      href="/signup"
      onclick={closeMenu}
    >
      Sign up!
    </a>
  </div>
</nav>
