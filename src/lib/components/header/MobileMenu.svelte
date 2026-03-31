<script>
  import { navigating } from "$app/stores";
  import { slide } from "svelte/transition";

  let { expanded = $bindable(false) } = $props();

  const closeMenu = () => {
    expanded = false;
  };

  $effect(() => {
    if ($navigating) closeMenu();
  });
</script>

{#snippet menuLink(href, text, target = null)}
  <a
    onclick={closeMenu}
    {href}
    {target}
    class="block bg-black/90 backdrop-blur-md px-8 py-4 text-white transition-colors active:bg-emerald-600/30"
    >{text}</a
  >
{/snippet}

<div
  class="absolute w-full drop-shadow-2xl select-none md:hidden z-50"
  transition:slide
>
  <menu>
    {@render menuLink("/#about", "About")}
    {@render menuLink("/#schedule", "Schedule")}
    {@render menuLink("/#rules", "Rules")}
    {@render menuLink("/#faq", "FAQ")}
    {@render menuLink("/signup", "Sign up!", "_blank")}
  </menu>
</div>
