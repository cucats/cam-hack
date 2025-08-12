<script>
  import { sponsors, organizers } from "./sponsors-data.js";
</script>

<div class="mx-auto max-w-7xl">
  <h3 class="text-center sm:text-3xl">Sponsored by</h3>
  <grid class="mb-10 grid grid-cols-4 text-center max-sm:grid-cols-2 sm:mb-12">
    {#each sponsors as sponsor}
      <a class="inline-block" target="_blank" href={sponsor.url}>
        <span class="inline-block h-full align-middle"></span>
        <img
          class="inline-block h-auto align-middle {sponsor.className}"
          src={sponsor.logo}
          alt={sponsor.name}
        />
      </a>
    {/each}
  </grid>
  <div class="mb-4 flex text-center max-sm:flex-col">
    <div class="mb-8 inline-block flex-1">
      <h3 class="mb-2 sm:text-3xl">{organizers.runBy.title}</h3>
      <a target="_blank" href={organizers.runBy.url}>
        <span class="inline-block h-full align-middle"></span>
        <img
          class="inline-block h-auto align-middle {organizers.runBy.className}"
          src={organizers.runBy.logo}
          alt={organizers.runBy.name}
        />
      </a>
    </div>
    <div class="mb-8 inline-block flex-1">
      <h3 class="mb-2 sm:text-3xl">{organizers.collaboratingWith.title}</h3>
      <a target="_blank" href={organizers.collaboratingWith.url}>
        <span class="inline-block h-full align-middle"></span>
        <img
          class="inline-block h-auto align-middle {organizers.collaboratingWith
            .className}"
          src={organizers.collaboratingWith.logo}
          alt={organizers.collaboratingWith.name}
        />
      </a>
    </div>
  </div>
</div>
