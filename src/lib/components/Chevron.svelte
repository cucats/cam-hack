<script>
    let { expanded = false } = $props();
</script>

<i class="chevron" class:up={expanded}></i>

<style>
    .chevron {
        margin-left: 0.5em;
        border: medium solid currentColor;
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 0.2em;
        transition: transform 0.15s;
        transform: translateY(-4px) rotate(45deg);
    }

    .chevron.up {
        transform: rotate(-135deg);
    }
</style>
