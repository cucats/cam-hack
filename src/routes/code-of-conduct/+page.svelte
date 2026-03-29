<script>
  import PageFooter from "$lib/components/PageFooter.svelte";
</script>

<svelte:head>
  <title>Code of Conduct • Cam Hack 2025</title>
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
        Code of Conduct
      </h1>

      <div class="glass-card space-y-6">
        <p class="text-dark-200 text-lg">
          Cam Hack is committed to providing a safe, inclusive, and welcoming
          experience for everyone. This code outlines our expectations for all
          participants and attendees.
        </p>

        <div class="rounded-xl border border-red-500/20 bg-red-500/10 p-6">
          <p class="text-dark-200 mb-4">
            We do not tolerate any form of harassment, discrimination, or
            exclusion of any form. In particular, we do not tolerate
            discrimination based on:
          </p>
          <ul class="space-y-2">
            <li class="text-dark-300 flex items-center gap-3">
              <span class="flex h-2 w-2 rounded-full bg-red-400"></span>
              Race, ethnicity, or nationality
            </li>
            <li class="text-dark-300 flex items-center gap-3">
              <span class="flex h-2 w-2 rounded-full bg-red-400"></span>
              Gender identity, expression, or sexual orientation
            </li>
            <li class="text-dark-300 flex items-center gap-3">
              <span class="flex h-2 w-2 rounded-full bg-red-400"></span>
              Age
            </li>
            <li class="text-dark-300 flex items-center gap-3">
              <span class="flex h-2 w-2 rounded-full bg-red-400"></span>
              Disability or medical condition
            </li>
            <li class="text-dark-300 flex items-center gap-3">
              <span class="flex h-2 w-2 rounded-full bg-red-400"></span>
              Physical appearance or body size
            </li>
            <li class="text-dark-300 flex items-center gap-3">
              <span class="flex h-2 w-2 rounded-full bg-red-400"></span>
              Religion or belief system
            </li>
          </ul>
        </div>

        <p class="text-dark-200">
          If you feel you are being harassed by someone else at the hackathon,
          please come talk to a member of the committee and we will handle the
          situation accordingly. Participants who break these rules may be
          disqualified at the discretion of the committee.
        </p>

        <div class="flex justify-center pt-4">
          <a
            href="mailto:camhack@cucats.org"
            class="from-primary-600 to-primary-500 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-6 py-3 font-semibold text-white transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
            Contact Us
          </a>
        </div>
      </div>
    </div>
  </section>

  <PageFooter />
</div>
