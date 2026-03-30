<script>
  import { onMount } from "svelte";

  let visible = $state(false);
  let sectionRef;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = true;
          }
        });
      },
      { threshold: 0.2 },
    );

    if (sectionRef) observer.observe(sectionRef);

    return () => observer.disconnect();
  });

  const stats = [
    { value: "2", label: "Days" },
    { value: "£200", label: "Prize Pool" },
    { value: "5", label: "Max Team Size" },
  ];
</script>

<div bind:this={sectionRef} class="mx-auto max-w-7xl py-20">
  <div class="grid items-center gap-12 lg:grid-cols-2">
    <div class="space-y-6" class:animate-slide-in={visible}>
      <h2 class="text-4xl font-bold sm:text-5xl md:text-6xl">
        <span class="gradient-text">About</span>
      </h2>

      <div class="space-y-4 text-lg leading-relaxed text-gray-300">
        <p>
          Cam Hack is a 2 day hackathon for the innovative minds at the
          University of Cambridge. Over an action-packed weekend, students come
          together to design and build technology projects from the ground up.
        </p>
        <p>
          We welcome participants ranging from curious beginners to seasoned
          coders. Expect plenty of free stash, food, and mini-events throughout
          this hackathon.
        </p>
        <p>
          For the winning team, each person will receive £200 and can choose
          from a range of prizes including: smartwatches, Steam vouchers, Amazon
          vouchers, or Sony XM4 headphones.
        </p>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4" class:animate-fade-up={visible}>
      {#each stats as stat, i}
        <div class="card py-8 text-center" style="animation-delay: {i * 0.1}s">
          <div class="neon-text mb-2 text-4xl font-bold sm:text-5xl">
            {stat.value}
          </div>
          <div class="text-sm tracking-wider text-gray-400 uppercase">
            {stat.label}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  @keyframes slide-in {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slide-in {
    animation: slide-in 0.8s ease-out forwards;
  }

  .animate-fade-up {
    animation: fade-up 0.8s ease-out forwards;
  }
</style>
