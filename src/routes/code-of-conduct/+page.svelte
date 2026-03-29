<script>
  import { onMount } from "svelte";

  let visible = $state(false);

  onMount(() => {
    setTimeout(() => {
      visible = true;
    }, 100);
  });
</script>

<svelte:head>
  <title>Code of Conduct • Cam Hack 2025</title>
</svelte:head>

<section class="min-h-screen pt-32 pb-24">
  <div class="mx-auto max-w-3xl px-4 sm:px-8">
    <div class="content" class:visible>
      <h1 class="section-title text-gradient mb-8">Code of Conduct</h1>

      <div class="card p-8">
        <p class="mb-6 text-lg text-gray-300">
          Cam Hack is committed to providing a safe, inclusive, and welcoming
          experience for everyone. This code outlines our expectations for all
          participants and attendees.
        </p>

        <p class="mb-4 text-gray-300">
          We do not tolerate any form of harassment, discrimination, or
          exclusion of any form. In particular, we do not tolerate
          discrimination based on:
        </p>

        <ul class="mb-6 list-none space-y-3 pl-0">
          <li
            class="rule-item flex items-center gap-3 rounded-lg bg-white/5 p-4"
          >
            <span class="indicator"></span>
            <span class="text-gray-300">Race, ethnicity, or nationality</span>
          </li>
          <li
            class="rule-item flex items-center gap-3 rounded-lg bg-white/5 p-4"
          >
            <span class="indicator"></span>
            <span class="text-gray-300"
              >Gender identity, expression, or sexual orientation</span
            >
          </li>
          <li
            class="rule-item flex items-center gap-3 rounded-lg bg-white/5 p-4"
          >
            <span class="indicator"></span>
            <span class="text-gray-300">Age</span>
          </li>
          <li
            class="rule-item flex items-center gap-3 rounded-lg bg-white/5 p-4"
          >
            <span class="indicator"></span>
            <span class="text-gray-300">Disability or medical condition</span>
          </li>
          <li
            class="rule-item flex items-center gap-3 rounded-lg bg-white/5 p-4"
          >
            <span class="indicator"></span>
            <span class="text-gray-300">Physical appearance or body size</span>
          </li>
          <li
            class="rule-item flex items-center gap-3 rounded-lg bg-white/5 p-4"
          >
            <span class="indicator"></span>
            <span class="text-gray-300">Religion or belief system</span>
          </li>
        </ul>

        <p class="text-gray-300">
          If you feel you are being harassed by someone else at the hackathon,
          please come talk to a member of the committee and we will handle the
          situation accordingly. Participants who break these rules may be
          disqualified at the discretion of the committee.
        </p>
      </div>

      <div class="mt-8 text-center">
        <a href="/" class="btn-secondary inline-flex items-center gap-2">
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
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          Back to Home
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  .content {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .content.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: linear-gradient(135deg, #10b981, #06b6d4);
    flex-shrink: 0;
  }

  .rule-item {
    transition: all 0.3s ease;
  }

  .rule-item:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(8px);
  }
</style>
