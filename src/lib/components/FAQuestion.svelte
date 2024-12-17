<script>
    import { slide } from "svelte/transition";
    import Chevron from "./Chevron.svelte";
    /**
     * @typedef {Object} Props
     * @property {import('svelte').Snippet} [question]
     * @property {import('svelte').Snippet} [children]
     */

    /** @type {Props} */
    let { question, children } = $props();

    let expanded = $state(false);
</script>

<div class="mb-4">
    <button class="mb-2 font-bold cursor-pointer" onclick={() => (expanded = !expanded)}>
        {@render question()}
        <Chevron {expanded} />
    </button>
    {#if expanded}
        <div class="mb-2" transition:slide>
            {@render children()}
        </div>
    {/if}
</div>
