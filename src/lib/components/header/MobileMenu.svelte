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
    class="block bg-black/95 px-8 py-4 text-emerald-300 transition-colors hover:bg-emerald-900/30 active:bg-emerald-800/40"
    style="border-bottom: 1px solid rgba(16, 185, 129, 0.2);"
    >{text}</a
  >
{/snippet}

<div
  class="absolute w-full drop-shadow-2xl select-none md:hidden"
  transition:slide
>
  <menu>
    {@render menuLink("/#about", "About")}
    {@render menuLink("/#schedule", "Schedule")}
    {@render menuLink("/#faq", "FAQ")}
    {@render menuLink("/signup", "Sign up!", "_blank")}
  </menu>
</div>
