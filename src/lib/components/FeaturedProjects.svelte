<script>
  import { onMount } from "svelte";

  let visible = $state(false);
  let sectionRef;

  const projects = [
    {
      title: "Unintended Behaviour",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
      image: "/unintended.png",
      link: "https://cam-hack-2025.devpost.com",
      gradient: "from-emerald-500/20 to-cyan-500/20",
      borderColor: "border-emerald-500/30",
      featured: true,
    },
    {
      title: "Project Alpha",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
      image: "/cam-hack-theme.png",
      link: "https://cam-hack-2025.devpost.com/project-gallery",
      gradient: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
    },
    {
      title: "Project Beta",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "/cam-hack-theme.png",
      link: "https://cam-hack-2025.devpost.com/project-gallery",
      gradient: "from-cyan-500/20 to-blue-500/20",
      borderColor: "border-cyan-500/30",
    },
    {
      title: "Project Gamma",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
      image: "/cam-hack-theme.png",
      link: "https://cam-hack-2025.devpost.com/project-gallery",
      gradient: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30",
    },
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

<section id="projects" class="section-padding relative" bind:this={sectionRef}>
  <div
    class="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"
  ></div>

  <div class="relative z-10 mx-auto max-w-7xl">
    <div
      class="mb-16 text-center {visible
        ? 'animate-slide-up opacity-0-initial'
        : 'opacity-0'}"
    >
      <h2 class="text-gradient mb-4">Featured Projects</h2>
      <p class="mx-auto max-w-2xl text-lg text-zinc-400">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod
      </p>
    </div>

    {#if projects[0].featured}
      <a
        href={projects[0].link}
        target="_blank"
        class="group mb-12 block {visible
          ? 'animate-slide-up stagger-1 opacity-0-initial'
          : 'opacity-0'}"
      >
        <div
          class="glass-card relative overflow-hidden rounded-3xl border {projects[0]
            .borderColor} transition-all duration-500 hover:scale-[1.02] hover:border-emerald-400/50"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br {projects[0]
              .gradient} opacity-50"
          ></div>
          <div
            class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
          ></div>

          <img
            src={projects[0].image}
            alt={projects[0].title}
            class="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div class="absolute right-0 bottom-0 left-0 p-8">
            <div class="mb-4 flex items-center gap-3">
              <span
                class="rounded-full border border-emerald-500/50 bg-emerald-500/30 px-3 py-1 font-mono text-sm text-emerald-300"
                >Featured</span
              >
            </div>
            <h3 class="mb-2 text-3xl text-white">{projects[0].title}</h3>
            <p class="text-zinc-300/80">{projects[0].description}</p>
          </div>

          <div
            class="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
          >
            <svg
              class="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        </div>
      </a>
    {/if}

    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      {#each projects.slice(1) as project, i}
        <a
          href={project.link}
          target="_blank"
          class="group {visible
            ? 'animate-slide-up opacity-0-initial'
            : 'opacity-0'}"
          style="animation-delay: {0.2 + i * 0.1}s;"
        >
          <div
            class="glass-card relative overflow-hidden rounded-2xl border {project.borderColor} hover:border-opacity-70 h-full transition-all duration-500 hover:scale-[1.03]"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br {project.gradient} opacity-30"
            ></div>

            <div class="relative aspect-video overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
              ></div>
            </div>

            <div class="relative p-6">
              <h4
                class="mb-2 text-white transition-colors group-hover:text-emerald-300"
              >
                {project.title}
              </h4>
              <p class="text-sm text-zinc-400">{project.description}</p>
            </div>

            <div
              class="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
            >
              <svg
                class="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          </div>
        </a>
      {/each}
    </div>

    <div
      class="mt-12 text-center {visible
        ? 'animate-fade-in stagger-5 opacity-0-initial'
        : 'opacity-0'}"
    >
      <a
        href="https://cam-hack-2025.devpost.com/project-gallery"
        target="_blank"
        class="inline-flex items-center gap-2 rounded-xl border border-zinc-600/50 bg-zinc-800/50 px-6 py-3 font-medium text-zinc-300 transition-all duration-300 hover:border-zinc-500 hover:bg-zinc-700/50 hover:text-white"
      >
        <span>View All Projects</span>
        <svg
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    </div>
  </div>
</section>
