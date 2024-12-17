<script>
    import FAQuestion from "$lib/components/FAQuestion.svelte";
</script>

<div class="max-w-7xl mx-auto">
    <h2>FAQ</h2>
    <FAQuestion>
        {#snippet question()}
            <span> What is a hackathon?</span>
        {/snippet}
        A hackathon is an event where people collaborate to create new projects! It usually runs over
        a weekend and is a great way to learn new skills, meet new people, and have fun!
    </FAQuestion>
    <FAQuestion>
        {#snippet question()}
            <span>What are the hackathon tracks?</span>
        {/snippet}
        All projects submit to a main track, which aligns with the overall theme of the event (to be
        revealed on the day). Participants can optionally submit the same project to one or more secondary
        tracks, whose themes extend the main theme in some way. Participants who opt into secondary tracks
        are eligible for both the main track and secondary track prizes.
    </FAQuestion>
    <FAQuestion>
        {#snippet question()}
            <span>Can I participate remotely?</span>
        {/snippet}
        While online participation is not allowed, it's okay to leave the venue for some time to hack
        elsewhere. We hope to see you at the Computer Lab!
    </FAQuestion>
    <FAQuestion>
        {#snippet question()}
            <span>How much does it cost?</span>
        {/snippet}
        Entry is free and includes food, drinks, and of course, stash!
    </FAQuestion>
    <FAQuestion>
        {#snippet question()}
            <span>Where is it?</span>
        {/snippet}
        Cam Hack 2024 will be in the Computer Laboratory, also known as the
        <a href="https://maps.app.goo.gl/185n4bsvv7AXw3FM7" class="theme-hyperlink"
            >William Gates Building</a
        >.
    </FAQuestion>
    <FAQuestion>
        {#snippet question()}
            <span>I don't have a team!</span>
        {/snippet}
        If you don't have a team yet, don't hesitate to look around in our
        <a target="_blank" class="theme-hyperlink" href="/discord">Discord server</a>. It's also
        common to form teams at the event itself!
    </FAQuestion>
    <FAQuestion>
        {#snippet question()}
            <span>How do I sign up?</span>
        {/snippet}
        Fill out the
        <a target="_blank" href="/signup" class="theme-hyperlink">sign up form</a> by 23:59 24th October!
    </FAQuestion>
    <FAQuestion>
        {#snippet question()}
            <span>I've never hacked before!</span>
        {/snippet}
        That's completely fine! Teams often have hackers with a mix of experience, including beginners.
    </FAQuestion>
    <FAQuestion>
        {#snippet question()}
            <span>Will there be food?</span>
        {/snippet}
        Yes! We will provide meals, as well as lots of snacks throughout the event! Please let us know
        if you have any dietary requirements in the sign up form.
    </FAQuestion>
    <FAQuestion>
        {#snippet question()}
            <span>Can I submit to multiple tracks?</span>
        {/snippet}
        Yes, projects can be submitted to multiple tracks.
    </FAQuestion>
    <FAQuestion>
        {#snippet question()}
            <span>What can I win?</span>
        {/snippet}
        We have over £1000 worth of prizes to be won, including four Nintendo switches!
    </FAQuestion>
    <FAQuestion>
        {#snippet question()}
            <span>You didn't answer my questions!</span>
        {/snippet}
        You can ask us anything in our
        <a target="_blank" href="/discord" class="theme-hyperlink">Discord server</a>! You can also
        email us at
        <a href="mailto:help@camhack.org" class="theme-hyperlink">help@camhack.org</a>, or speak to
        us in person at the event, where we will be happy to answer.
    </FAQuestion>
</div>
