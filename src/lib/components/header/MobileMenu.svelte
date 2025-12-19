<script>
  import { slide } from "svelte/transition";

  let { expanded = $bindable() } = $props();
</script>

<div
  transition:slide={{ duration: 300 }}
  class="bg-cyber-dark/95 border-cyber-border absolute top-[70px] right-0 left-0 border-b backdrop-blur-lg md:hidden"
>
  <nav class="flex flex-col gap-4 p-6">
    <a
      class="hover:text-cyber-green border-cyber-border border-b py-3 text-xl text-gray-300 transition-colors"
      href="/#about"
      onclick={() => (expanded = false)}
    >
      About
    </a>
    <a
      class="hover:text-cyber-green border-cyber-border border-b py-3 text-xl text-gray-300 transition-colors"
      href="/#schedule"
      onclick={() => (expanded = false)}
    >
      Schedule
    </a>
    <a
      class="hover:text-cyber-green border-cyber-border border-b py-3 text-xl text-gray-300 transition-colors"
      href="/#rules"
      onclick={() => (expanded = false)}
    >
      Rules
    </a>
    <a
      class="hover:text-cyber-green border-cyber-border border-b py-3 text-xl text-gray-300 transition-colors"
      href="/#faq"
      onclick={() => (expanded = false)}
    >
      FAQ
    </a>
    <a
      class="cyber-button font-display mt-4 rounded-lg px-6 py-4 text-center text-xl tracking-wider"
      href="/signup"
      onclick={() => (expanded = false)}
    >
      <span>SIGN UP</span>
    </a>
  </nav>
</div>
