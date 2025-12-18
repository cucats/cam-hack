<script>
  const FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLScyyLCcd9LJAo_x2Ly0jvNgAI6-dqp3AmKYoFbca5mxLVvtCQ/viewform";
</script>

<svelte:head>
  <title>Sign up • Cam Hack 2025</title>
</svelte:head>

<div class="section-dark min-h-screen pt-24">
  <div class="mx-auto max-w-5xl px-4 py-12 sm:px-8">
    <div class="glass neon-border overflow-hidden rounded-2xl">
      <div class="p-8 sm:p-12">
        <h2 class="font-display mb-6 text-3xl font-bold sm:text-4xl">
          <span class="gradient-text text-glow">Sign up</span>
        </h2>
        <div class="neon-line mb-8 w-24"></div>

        <p class="mb-4 text-gray-300">
          The deadline for signing up is 23:59 24th October!
        </p>
        <p class="mb-6 text-gray-400">
          Not loading? Open the form directly <a
            target="_blank"
            href={FORM_URL}
            class="text-emerald-400 underline transition-colors hover:text-emerald-300"
            >here</a
          >.
        </p>
      </div>

      <div class="bg-white">
        <iframe
          title="Sign up form"
          src="{FORM_URL}?embedded=true"
          class="h-[800px] w-full"
          frameborder="0"
        >
        </iframe>
      </div>
    </div>

    <div class="mt-8 text-center">
      <a href="/" class="btn-neon inline-block rounded-lg"> Back to Home </a>
    </div>
  </div>
</div>
