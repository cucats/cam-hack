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
    class="block border-b border-emerald-500/20 bg-slate-900/95 px-8 py-4 text-lg font-semibold text-emerald-200 backdrop-blur-md transition-colors active:bg-emerald-500/20"
    >{text}</a
  >
{/snippet}

<div
  class="absolute w-full select-none shadow-2xl shadow-emerald-500/10 md:hidden"
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
