<script>
    const projects = [
      {
        title: "EcoSense AI",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        tech: ["Python", "TensorFlow", "IoT"]
      },
      {
        title: "GreenChain",
        desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
        tech: ["Solidity", "React", "Web3"]
      },
      {
        title: "BioHack Interface",
        desc: "Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.",
        tech: ["C++", "OpenCV", "BioSensors"]
      },
      {
        title: "Verdant VR",
        desc: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
        tech: ["Unity", "C#", "Oculus"]
      }
    ];
  </script>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto p-4">
    {#each projects as project}
      <div class="group relative overflow-hidden rounded-xl bg-black/50 border border-green-500/50 p-6 hover:bg-green-900/20 transition-all duration-300">
        <div class="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <h3 class="text-2xl font-bold text-green-400 mb-2 font-mono group-hover:translate-x-2 transition-transform">{project.title}</h3>
        <p class="text-green-100/80 mb-4">{project.desc}</p>
        <div class="flex gap-2 flex-wrap">
          {#each project.tech as t}
            <span class="px-2 py-1 text-xs font-mono bg-green-500/20 text-green-300 rounded border border-green-500/30">
              {t}
            </span>
          {/each}
        </div>
      </div>
    {/each}
  </div>
