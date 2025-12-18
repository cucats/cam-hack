<script>
  import { onMount } from "svelte";
  import { gsap } from "gsap";

  let section;
  let scheduleItems;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.from(scheduleItems.children, {
              opacity: 0,
              x: 50,
              duration: 0.8,
              stagger: 0.1,
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
  });
</script>

<section bind:this={section} class="relative py-24 bg-gradient-to-b from-emerald-50/30 to-white">
  <div class="mx-auto max-w-7xl px-4 sm:px-8">
    <h2 class="mb-12 text-center text-5xl font-bold text-slate-800 sm:text-6xl">
      Schedule
    </h2>
    <div bind:this={scheduleItems} class="flex max-md:flex-col gap-8">
      <div class="flex-1 rounded-2xl bg-white p-8 shadow-lg">
        <h4 class="mb-6 text-3xl font-bold text-emerald-600">
          Saturday 1st November
        </h4>
        <ul class="space-y-4">
          <li class="flex items-center gap-3">
            <strong class="text-emerald-600">09:30</strong>
            <span class="text-slate-600">&bull;</span>
            <em class="text-slate-700">Breakfast</em>
          </li>
          <li class="flex items-center gap-3">
            <strong class="text-emerald-600">10:00</strong>
            <span class="text-slate-600">&bull;</span>
            <span class="text-slate-700">Opening Ceremony</span>
          </li>
          <li class="flex items-center gap-3">
            <strong class="text-emerald-600">10:30</strong>
            <span class="text-slate-600">&bull;</span>
            <span class="text-slate-700">Hacking begins!</span>
          </li>
          <li class="flex items-center gap-3">
            <strong class="text-emerald-600">13:00</strong>
            <span class="text-slate-600">&bull;</span>
            <em class="text-slate-700">Lunch</em>
          </li>
          <li class="flex items-center gap-3">
            <strong class="text-emerald-600">18:00</strong>
            <span class="text-slate-600">&bull;</span>
            <em class="text-slate-700">Dinner</em>
          </li>
        </ul>
      </div>
      <div class="mb-4 flex-1 rounded-2xl bg-white p-8 shadow-lg">
        <h4 class="mb-6 text-3xl font-bold text-emerald-600">
          Sunday 2nd November
        </h4>
        <ul class="space-y-4">
          <li class="flex items-center gap-3">
            <strong class="text-emerald-600">09:30</strong>
            <span class="text-slate-600">&bull;</span>
            <em class="text-slate-700">Breakfast</em>
          </li>
          <li class="flex items-center gap-3">
            <strong class="text-emerald-600">13:00</strong>
            <span class="text-slate-600">&bull;</span>
            <em class="text-slate-700">Lunch</em>
          </li>
          <li class="flex items-center gap-3">
            <strong class="text-emerald-600">16:30</strong>
            <span class="text-slate-600">&bull;</span>
            <span class="text-slate-700">Hacking ends!</span>
          </li>
          <li class="flex items-center gap-3">
            <strong class="text-emerald-600">17:00</strong>
            <span class="text-slate-600">&bull;</span>
            <em class="text-slate-700">Dinner</em>
          </li>
          <li class="flex items-center gap-3">
            <strong class="text-emerald-600">18:00</strong>
            <span class="text-slate-600">&bull;</span>
            <span class="text-slate-700">Judging ends</span>
          </li>
          <li class="flex items-center gap-3">
            <strong class="text-emerald-600">18:30</strong>
            <span class="text-slate-600">&bull;</span>
            <span class="text-slate-700">Closing ceremony</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>
