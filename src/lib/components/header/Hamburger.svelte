<script>
  let { expanded = $bindable() } = $props();
</script>

<button
  class="group flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg transition-colors hover:bg-white/10 md:hidden"
  onclick={() => (expanded = !expanded)}
  aria-label="Toggle menu"
>
  <span
    class="block h-0.5 w-6 bg-emerald-400 transition-all duration-300 {expanded
      ? 'translate-y-2 rotate-45'
      : ''}"
  ></span>
  <span
    class="block h-0.5 w-6 bg-emerald-400 transition-all duration-300 {expanded
      ? 'opacity-0'
      : ''}"
  ></span>
  <span
    class="block h-0.5 w-6 bg-emerald-400 transition-all duration-300 {expanded
      ? '-translate-y-2 -rotate-45'
      : ''}"
  ></span>
</button>
