<script>
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { sponsors } from "./sponsors-data.js";

  let section;
  let logos;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.from(logos.children, {
              opacity: 0,
              scale: 0.5,
              rotation: -180,
              duration: 0.8,
              stagger: 0.1,
              ease: "back.out(1.7)",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (section) {
      observer.observe(section);
    }

    if (logos) {
      Array.from(logos.children).forEach((logo) => {
        logo.addEventListener("mouseenter", () => {
          gsap.to(logo, {
            rotation: 360,
            scale: 1.2,
            duration: 0.6,
            ease: "back.out(1.7)",
          });
        });
        logo.addEventListener("mouseleave", () => {
          gsap.to(logo, {
            rotation: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        });
      });
    }
  });
</script>

<section bind:this={section} class="relative py-24 bg-gradient-to-b from-white to-emerald-50/30">
  <div class="mx-auto max-w-7xl px-4 sm:px-8">
    <h2 class="mb-12 text-center text-5xl font-bold text-slate-800 sm:text-6xl">
      Sponsors
    </h2>
    <div
      bind:this={logos}
      class="flex flex-wrap items-center justify-center gap-12"
    >
      {#each sponsors as sponsor}
        <a
          href={sponsor.url}
          target="_blank"
          class="group flex items-center justify-center transition-transform hover:scale-110"
        >
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            class="max-h-20 object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
            class:sponsor.className
          />
        </a>
      {/each}
    </div>
  </div>
</section>
