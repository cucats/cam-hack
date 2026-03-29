<script>
  import PageFooter from "$lib/components/PageFooter.svelte";

  const FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLScyyLCcd9LJAo_x2Ly0jvNgAI6-dqp3AmKYoFbca5mxLVvtCQ/viewform";
</script>

<svelte:head>
  <title>Sign up • Cam Hack 2025</title>
</svelte:head>

<div class="bg-dark-950 min-h-screen">
  <nav class="bg-dark-900/50 border-b border-white/10 backdrop-blur-xl">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
      <a
        href="/"
        class="flex items-center gap-3 transition-opacity hover:opacity-80"
      >
        <img src="/cam-hack-logo-text.png" alt="Cam Hack" class="h-10 w-10" />
        <span class="text-primary-400 font-bold">Cam Hack 2025</span>
      </a>
      <a
        href="/"
        class="text-dark-400 hover:text-primary-400 flex items-center gap-2 transition-colors"
      >
        <svg
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        Back
      </a>
    </div>
  </nav>

  <section class="py-16">
    <div class="mx-auto max-w-4xl px-4">
      <h1
        class="glow-text from-primary-400 to-accent-400 mb-8 bg-gradient-to-r bg-clip-text text-center text-transparent"
      >
        Sign Up
      </h1>

      <div class="glass-card mb-8 text-center">
        <div
          class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/20"
        >
          <svg
            class="h-8 w-8 text-yellow-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <p class="text-dark-200 mb-2 text-lg">
          The deadline for signing up is <strong class="text-yellow-400"
            >23:59 24th October</strong
          >!
        </p>
        <p class="text-dark-400">
          Not loading? Open the form directly <a
            target="_blank"
            href={FORM_URL}
            class="theme-hyperlink">here</a
          >.
        </p>
      </div>

      <div class="glass-card overflow-hidden !p-0">
        <iframe
          title="Sign up form"
          src="{FORM_URL}?embedded=true"
          class="h-[800px] w-full bg-white"
          frameborder="0"
        >
        </iframe>
      </div>
    </div>
  </section>

  <PageFooter />
</div>
