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
    class="menu-link"
    >{text}</a
  >
{/snippet}

<div
  class="mobile-menu"
  transition:slide
>
  <menu>
    {@render menuLink("/#about", "About")}
    {@render menuLink("/#schedule", "Schedule")}
    {@render menuLink("/discord", "Discord", "_blank")}
    {@render menuLink("/signup", "Sign up", "_blank")}
  </menu>
</div>

<style>
  .mobile-menu {
    position: absolute;
    width: 100%;
    background: rgba(10, 14, 13, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 255, 136, 0.2);
    box-shadow: 0 10px 30px rgba(0, 255, 136, 0.2);
  }

  menu {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .menu-link {
    display: block;
    padding: 1.5rem 2rem;
    color: #e8fff5;
    font-size: 1.2rem;
    font-weight: 600;
    font-family: 'Space Grotesk', sans-serif;
    border-bottom: 1px solid rgba(0, 255, 136, 0.1);
    transition: all 0.3s ease;
  }

  .menu-link:hover {
    background: rgba(0, 255, 136, 0.1);
    color: #00ff88;
    padding-left: 2.5rem;
  }

  @media (min-width: 768px) {
    .mobile-menu {
      display: none;
    }
  }
</style>
