<script>
  import { onMount } from "svelte";
  import { gsap } from "gsap";

  let section;
  let content;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.from(content.children, {
              opacity: 0,
              x: -100,
              duration: 1,
              stagger: 0.2,
              ease: "power3.out",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (section) {
      observer.observe(section);
    }
  });
</script>

<section bind:this={section} class="relative py-24 bg-gradient-to-b from-white via-emerald-50/20 to-white">
  <div class="mx-auto max-w-7xl px-4 sm:px-8">
    <div bind:this={content}>
      <h2 class="mb-6 text-5xl font-bold text-slate-800 sm:text-6xl">
        About
      </h2>
      <p class="mb-4 text-xl text-slate-700">
        Cam Hack is a 2 day hackathon for the innovative minds at the University
        of Cambridge. Over an action-packed weekend, students come together to
        design and build technology projects from the ground up. We welcome
        participants ranging from curious beginners to seasoned coders. Expect
        plenty of free stash, food, and mini-events throughout this hackathon.
      </p>
      <p class="text-xl text-slate-700">
        For the winning team, each person will receive £200 and can choose from
        a range of prizes including: smartwatches, Steam vouchers, Amazon
        vouchers, or Sony XM4 headphones.
      </p>
    </div>
  </div>
</section>
