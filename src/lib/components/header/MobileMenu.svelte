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
  >{text}</a>
{/snippet}

<div class="mobile-menu" transition:slide>
  <menu class="menu-list">
    {@render menuLink("/#about", "About")}
    {@render menuLink("/#schedule", "Schedule")}
    {@render menuLink("/#rules", "Rules")}
    {@render menuLink("/#faq", "FAQ")}
    {@render menuLink("/signup", "Sign up!", "_blank")}
  </menu>
</div>

<style>
  .mobile-menu {
    position: absolute;
    width: 100%;
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 255, 136, 0.2);
    user-select: none;
  }

  @media (min-width: 768px) {
    .mobile-menu {
      display: none;
    }
  }

  .menu-list {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .menu-link {
    display: block;
    padding: 1rem 2rem;
    color: var(--color-text-light);
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    border-bottom: 1px solid rgba(0, 255, 136, 0.1);
    transition: all 0.3s ease;
  }

  .menu-link:hover {
    background: rgba(0, 255, 136, 0.1);
    color: var(--color-primary);
    padding-left: 2.5rem;
  }

  .menu-link:active {
    background: rgba(0, 255, 136, 0.2);
  }
</style>
