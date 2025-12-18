<script>
  import { onMount } from "svelte";

  let visible = $state(false);
  let sectionRef;

  const stats = [
    { value: "2", label: "Days", icon: "📅" },
    { value: "£200", label: "Per Winner", icon: "🏆" },
    { value: "5", label: "Max Team Size", icon: "👥" },
    { value: "∞", label: "Possibilities", icon: "✨" },
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = true;
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef) {
      observer.observe(sectionRef);
    }

    return () => observer.disconnect();
  });
</script>

<section id="about" class="section-padding relative" bind:this={sectionRef}>
  <div
    class="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-transparent to-purple-900/10"
  ></div>

  <div class="relative z-10 mx-auto max-w-7xl">
    <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
      <div
        class={visible
          ? "animate-slide-in-left opacity-0-initial"
          : "opacity-0"}
      >
        <h2 class="text-gradient mb-6">About</h2>
        <div class="space-y-6 text-lg leading-relaxed text-zinc-300">
          <p>
            Cam Hack is a 2 day hackathon for the innovative minds at the
            University of Cambridge. Over an action-packed weekend, students
            come together to design and build technology projects from the
            ground up. We welcome participants ranging from curious beginners to
            seasoned coders. Expect plenty of free stash, food, and mini-events
            throughout this hackathon.
          </p>
          <p>
            For the winning team, each person will receive £200 and can choose
            from a range of prizes including: smartwatches, Steam vouchers,
            Amazon vouchers, or Sony XM4 headphones.
          </p>
        </div>
      </div>

      <div
        class="grid grid-cols-2 gap-4 {visible
          ? 'animate-slide-in-right opacity-0-initial'
          : 'opacity-0'}"
      >
        {#each stats as stat, i}
          <div
            class="glass-card rounded-2xl border border-emerald-500/20 p-6 text-center transition-all duration-500 hover:scale-105 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/10"
            style="animation-delay: {0.1 * i}s;"
          >
            <div class="mb-3 text-4xl">{stat.icon}</div>
            <div
              class="text-gradient-green mb-2 font-mono text-3xl font-bold sm:text-4xl"
            >
              {stat.value}
            </div>
            <div class="text-sm tracking-wider text-zinc-400 uppercase">
              {stat.label}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
