<script>
  let { expanded } = $props();
</script>

<svg
  class="text-primary-400 h-5 w-5 shrink-0 transition-transform duration-300 {expanded
    ? 'rotate-180'
    : ''}"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M19 9l-7 7-7-7"
  ></path>
</svg>
