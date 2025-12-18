<script>
  import { onMount } from "svelte";

  let { endDateUtc = "2025-11-02" } = $props();

  let days = $state(0);

  const compute = () => {
    const [y, m, d] = endDateUtc.split("-").map((n) => Number(n));
    const end = Date.UTC(y, m - 1, d);
    const now = new Date();
    const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    days = Math.max(0, Math.floor((today - end) / 86400000));
  };

  onMount(() => {
    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  });
</script>

<span class="tabular-nums">{days}</span>
