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

    if (sectionRef) {
      observer.observe(sectionRef);
    }

    return () => observer.disconnect();
  });
</script>

<div bind:this={sectionRef} class="relative overflow-hidden py-24 sm:py-32">
  <div class="grid-pattern absolute inset-0 opacity-50"></div>

  <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
    <div class="grid gap-12 lg:grid-cols-2 lg:items-center">
      <div class:visible class="content-left">
        <h2 class="section-title text-gradient">About</h2>

        <p class="mb-6 text-lg leading-relaxed text-gray-300">
          Cam Hack is a 2 day hackathon for the innovative minds at the
          University of Cambridge. Over an action-packed weekend, students come
          together to design and build technology projects from the ground up.
          We welcome participants ranging from curious beginners to seasoned
          coders. Expect plenty of free stash, food, and mini-events throughout
          this hackathon.
        </p>

        <p class="text-lg leading-relaxed text-gray-300">
          For the winning team, each person will receive £200 and can choose
          from a range of prizes including: smartwatches, Steam vouchers, Amazon
          vouchers, or Sony XM4 headphones.
        </p>
      </div>

      <div class:visible class="content-right">
        <div class="grid gap-6 sm:grid-cols-2">
          <div class="card hover-lift stagger-1">
            <div class="text-gradient mb-3 text-4xl font-bold">2</div>
            <h4 class="text-gray-100">Days of Hacking</h4>
            <p class="text-sm text-gray-400">Lorem ipsum dolor sit amet</p>
          </div>

          <div class="card hover-lift stagger-2">
            <div class="text-gradient-purple mb-3 text-4xl font-bold">£200</div>
            <h4 class="text-gray-100">Prize per Winner</h4>
            <p class="text-sm text-gray-400">Consectetur adipiscing elit</p>
          </div>

          <div class="card hover-lift stagger-3">
            <div class="text-gradient mb-3 text-4xl font-bold">∞</div>
            <h4 class="text-gray-100">Free Food</h4>
            <p class="text-sm text-gray-400">Sed do eiusmod tempor</p>
          </div>

          <div class="card hover-lift stagger-4">
            <div class="text-gradient-purple mb-3 text-4xl font-bold">5</div>
            <h4 class="text-gray-100">Max Team Size</h4>
            <p class="text-sm text-gray-400">Incididunt ut labore</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .content-left {
    opacity: 0;
    transform: translateX(-40px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .content-left.visible {
    opacity: 1;
    transform: translateX(0);
  }

  .content-right {
    opacity: 0;
    transform: translateX(40px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    transition-delay: 0.2s;
  }

  .content-right.visible {
    opacity: 1;
    transform: translateX(0);
  }

  .content-right.visible .card {
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
