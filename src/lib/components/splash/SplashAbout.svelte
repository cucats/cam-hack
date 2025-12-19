<script>
  import { onMount } from 'svelte';

  let visible = $state(false);
  let sectionEl;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible = true;
        });
      },
      { threshold: 0.2 }
    );
    if (sectionEl) observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<section id="about" bind:this={sectionEl} class="relative py-24 px-4 sm:px-8">
  <div class="max-w-5xl mx-auto">
    <div class="text-center mb-16 opacity-0 {visible ? 'animate-slide-up' : ''}">
      <h2 class="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
        <span class="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent glow-text">
          About
        </span>
      </h2>
      <div class="w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-300 mx-auto rounded-full"></div>
    </div>

    <div class="glass-card p-8 sm:p-12 opacity-0 {visible ? 'animate-scale-in delay-200' : ''}">
      <p class="text-lg sm:text-xl text-gray-300 leading-relaxed mb-6">
        Cam Hack is a 2 day hackathon for the innovative minds at the University of
        Cambridge. Over an action-packed weekend, students come together to design
        and build technology projects from the ground up. We welcome participants
        ranging from curious beginners to seasoned coders. Expect plenty of free
        stash, food, and mini-events throughout this hackathon.
      </p>
      <p class="text-lg sm:text-xl text-gray-300 leading-relaxed">
        For the winning team, each person will receive £200 and can choose from a
        range of prizes including: smartwatches, Steam vouchers, Amazon vouchers, or
        Sony XM4 headphones.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      <div class="glass-card-hover p-6 text-center opacity-0 {visible ? 'animate-slide-up delay-300' : ''}">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="font-display text-xl font-bold text-emerald-300 mb-2">48 Hours</h3>
        <p class="text-gray-400">Lorem ipsum dolor sit amet</p>
      </div>

      <div class="glass-card-hover p-6 text-center opacity-0 {visible ? 'animate-slide-up delay-400' : ''}">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </div>
        <h3 class="font-display text-xl font-bold text-emerald-300 mb-2">Teams of 5</h3>
        <p class="text-gray-400">Lorem ipsum dolor sit amet</p>
      </div>

      <div class="glass-card-hover p-6 text-center opacity-0 {visible ? 'animate-slide-up delay-500' : ''}">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="font-display text-xl font-bold text-emerald-300 mb-2">£200 Prize</h3>
        <p class="text-gray-400">Lorem ipsum dolor sit amet</p>
      </div>
    </div>
  </div>
</section>
