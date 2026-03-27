<script>
  import { page } from "$app/stores";
</script>

<div
  class="section-dark grid-bg flex min-h-screen items-center justify-center pt-20"
>
  <div class="mx-auto max-w-2xl px-4 text-center sm:px-8">
    <div class="glass neon-border rounded-2xl p-12">
      <div class="font-display mb-4 text-8xl font-bold">
        <span class="gradient-text text-glow-strong">{$page.status}</span>
      </div>
      <h1 class="font-display mb-6 text-2xl font-bold text-white">
        {$page.error?.message}
      </h1>
      <p class="mb-8 text-gray-400">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <a href="/" class="btn-glow inline-block rounded-lg"> Return Home </a>
    </div>
  </div>
</div>
