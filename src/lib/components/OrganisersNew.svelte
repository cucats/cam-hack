<script>
  import { onMount } from "svelte";

  let visible = $state(false);
  let sectionRef;

  const organisers = [
    { name: "James Leung", image: "/james.png" },
    { name: "Uliana Ronska", image: "/uliana.jpg" },
    { name: "Athena Eng", image: "/athena.jpg" },
    { name: "Oliver Greenwood", image: "/oliver.png" },
    { name: "Jadon Mensah", image: "/jadon.png" },
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
      { threshold: 0.2 },
    );

    if (sectionRef) {
      observer.observe(sectionRef);
    }

    return () => observer.disconnect();
  });
</script>

<div bind:this={sectionRef} class="relative overflow-hidden py-24 sm:py-32">
  <div class="grid-pattern absolute inset-0 opacity-30"></div>

  <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
    <div class="title-container mb-16 text-center" class:visible>
      <h2 class="section-title text-gradient mx-auto">Organising Committee</h2>
    </div>

    <div class="organisers-grid" class:visible>
      <div class="flex flex-wrap justify-center gap-8 sm:gap-12">
        {#each organisers as organiser, index}
          <div
            class="organiser-card group text-center"
            style="animation-delay: {index * 0.1}s"
          >
            <div
              class="image-container relative mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full sm:h-40 sm:w-40"
            >
              <img
                src={organiser.image}
                alt={organiser.name}
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div class="image-border absolute inset-0 rounded-full"></div>
              <div class="image-glow absolute inset-0 rounded-full"></div>
            </div>
            <h4
              class="organiser-name text-lg font-semibold text-gray-100 transition-colors"
            >
              {organiser.name}
            </h4>
          </div>
        {/each}
      </div>
    </div>

    <div class="contact-section mt-20 text-center" class:visible>
      <div class="card mx-auto inline-block px-12 py-8">
        <p class="mb-4 text-gray-300">
          <a
            href="mailto:camhack@cucats.org"
            class="contact-link transition-colors">Contact</a
          >
          <span class="mx-4 text-gray-600">•</span>
          <a href="/code-of-conduct" class="contact-link transition-colors"
            >Code of Conduct</a
          >
        </p>
        <p class="text-sm text-gray-500">
          Copyright © Cam Hack 2025.<br />
          Art by Gwen Sellers
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  .section-title::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .title-container,
  .organisers-grid,
  .contact-section {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .visible.title-container,
  .visible.organisers-grid,
  .visible.contact-section {
    opacity: 1;
    transform: translateY(0);
  }

  .organiser-card {
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
  }

  .visible .organiser-card {
    animation: fadeInUp 0.6s ease-out forwards;
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

  .image-container {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.3s ease;
  }

  .image-container:hover {
    box-shadow: 0 10px 40px rgba(16, 185, 129, 0.2);
  }

  .image-border {
    border: 2px solid transparent;
    transition: border-color 0.3s ease;
  }

  .organiser-card:hover .image-border {
    border-color: rgba(16, 185, 129, 0.5);
  }

  .image-glow {
    background: linear-gradient(to top, rgba(16, 185, 129, 0.2), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .organiser-card:hover .image-glow {
    opacity: 1;
  }

  .organiser-card:hover .organiser-name {
    color: #10b981;
  }

  .contact-link {
    color: #10b981;
  }

  .contact-link:hover {
    color: #34d399;
  }
</style>
