<script>
  let { expanded = $bindable() } = $props();
</script>

<button
  class="flex cursor-pointer flex-col gap-1.5 p-2 md:hidden"
  onclick={() => (expanded = !expanded)}
  aria-label="Toggle menu"
>
  <span
    class="bg-cyber-green h-0.5 w-6 transition-all duration-300 {expanded
      ? 'translate-y-2 rotate-45'
      : ''}"
  ></span>
  <span
    class="bg-cyber-green h-0.5 w-6 transition-all duration-300 {expanded
      ? 'opacity-0'
      : ''}"
  ></span>
  <span
    class="bg-cyber-green h-0.5 w-6 transition-all duration-300 {expanded
      ? '-translate-y-2 -rotate-45'
      : ''}"
  ></span>
</button>
