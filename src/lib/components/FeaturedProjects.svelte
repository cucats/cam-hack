<script>
  import { onMount } from "svelte";
  import { gsap } from "gsap";

  let section;
  let projects = [
    {
      title: "Unintended Behaviour",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
      image: "/unintended.png",
      link: "https://cam-hack-2025.devpost.com",
    },
    {
      title: "Lorem Ipsum Project",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.",
      image: "/cam-hack-theme.png",
      link: "#",
    },
    {
      title: "Dolor Sit Amet",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
      image: "/cam-hack-theme.png",
      link: "#",
    },
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".project-card");
            gsap.from(cards, {
              opacity: 0,
              y: 100,
              rotationX: -90,
              duration: 1,
              stagger: 0.2,
              ease: "power3.out",
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

    const cards = section?.querySelectorAll(".project-card");
    if (cards) {
      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            rotationY: 5,
            rotationX: -5,
            duration: 0.3,
            ease: "power2.out",
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }
  });
</script>

<section bind:this={section} class="relative py-24 overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-b from-white via-emerald-50/30 to-white"></div>

  <div class="relative mx-auto max-w-7xl px-4 sm:px-8">
    <h2 class="mb-4 text-center text-5xl font-bold text-slate-800 sm:text-6xl">
      Featured Projects
    </h2>
    <div class="mb-16 text-center text-xl text-slate-600">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </div>

    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {#each projects as project}
        <a
          href={project.link}
          target="_blank"
          class="project-card group relative block overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl"
          style="transform-style: preserve-3d;"
        >
          <div class="relative h-64 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            ></div>
          </div>
          <div class="p-6">
            <h3
              class="mb-3 text-2xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors"
            >
              {project.title}
            </h3>
            <p class="text-slate-600">{project.description}</p>
          </div>
          <div
            class="absolute bottom-0 left-0 h-1 w-0 bg-emerald-500 transition-all duration-500 group-hover:w-full"
          ></div>
        </a>
      {/each}
    </div>
  </div>
</section>
