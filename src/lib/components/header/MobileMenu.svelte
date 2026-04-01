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
  >
    <span class="link-text">{text}</span>
    <span class="link-arrow">→</span>
  </a>
{/snippet}

<div class="mobile-menu" transition:slide={{ duration: 300 }}>
  <menu>
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
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(10, 15, 13, 0.98);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 255, 136, 0.2);
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.5),
      0 0 30px rgba(0, 255, 136, 0.1);
    z-index: 100;
  }

  @media (min-width: 768px) {
    .mobile-menu {
      display: none;
    }
  }

  menu {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .menu-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 2rem;
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    font-weight: 600;
    border-bottom: 1px solid rgba(0, 255, 136, 0.1);
    transition: all 0.3s ease;
  }

  .menu-link:last-child {
    border-bottom: none;
  }

  .menu-link:hover,
  .menu-link:active {
    background: rgba(0, 255, 136, 0.1);
    color: #00ff88;
  }

  .link-text {
    transition: transform 0.3s ease;
  }

  .menu-link:hover .link-text {
    transform: translateX(10px);
  }

  .link-arrow {
    color: #00ff88;
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
  }

  .menu-link:hover .link-arrow {
    opacity: 1;
    transform: translateX(0);
  }
</style>
