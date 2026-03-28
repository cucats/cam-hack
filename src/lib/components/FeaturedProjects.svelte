<script>
  const projects = [
    { title: "Packet Royale", url: "https://devpost.com/software/packet-royale" },
    { title: "CRLF Trading", url: "https://devpost.com/software/crlf-trading" },
    { title: "Lock3d1n", url: "https://devpost.com/software/lock3d1n" },
    { title: "ArtiCal", url: "https://devpost.com/software/calflix" },
    { title: "Tic Tac Tone", url: "https://devpost.com/software/tic-tac-tone" },
    { title: "ClipScribe", url: "https://devpost.com/software/clipscribe" },
    { title: "Shatter", url: "https://devpost.com/software/shatter-producing-images-using-windows" },
    { title: "Precursor", url: "https://devpost.com/software/precursor" },
    { title: "Clash Royale for Digit Recognition", url: "https://devpost.com/software/clash-royale-for-digit-recognition" },
    { title: "Chess with Google Calendar", url: "https://devpost.com/software/chess-with-google-calendar" },
    { title: "InCel Engine", url: "https://devpost.com/software/incel-engine" },
    { title: "EXCEL-lent Games", url: "https://devpost.com/software/excel-lent-games" }
  ];

  const move = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-py * 7).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * 9).toFixed(2)}deg`);
  };

  const leave = (e) => {
    const el = e.currentTarget;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };
</script>

<div class="projects">
  {#each projects as project, i}
    <a
      class="card"
      href={project.url}
      target="_blank"
      rel="noreferrer"
      style={`--i:${i}`}
      on:pointermove={move}
      on:pointerleave={leave}
    >
      <span class="tilt">
        <span class="title">{project.title}</span>
      </span>
      <span class="glow"></span>
    </a>
  {/each}
</div>

<style>
  .projects {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 14px;
  }

  .card {
    position: relative;
    grid-column: span 12;
    overflow: hidden;
    border-radius: 18px;
    padding: 18px 18px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.6));
    border: 1px solid rgba(255, 255, 255, 0.55);
    box-shadow:
      0 20px 60px rgba(1, 20, 10, 0.22),
      0 8px 18px rgba(1, 20, 10, 0.12);
    backdrop-filter: blur(14px);
    transform: translateY(10px) scale(0.98);
    opacity: 0;
    animation: in 900ms cubic-bezier(0.2, 0.9, 0.1, 1) forwards;
    animation-delay: calc(80ms * var(--i));
    transition:
      transform 450ms cubic-bezier(0.2, 0.9, 0.1, 1),
      box-shadow 450ms cubic-bezier(0.2, 0.9, 0.1, 1);
  }

  .card:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow:
      0 28px 90px rgba(1, 20, 10, 0.28),
      0 12px 24px rgba(1, 20, 10, 0.16);
  }

  .tilt {
    position: relative;
    z-index: 2;
    display: block;
    transform: perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateZ(0);
    transition: transform 160ms cubic-bezier(0.2, 0.9, 0.1, 1);
    will-change: transform;
  }

  .title {
    position: relative;
    display: block;
    font-weight: 800;
    letter-spacing: -0.02em;
    font-size: 18px;
    color: rgb(4 28 16);
    text-wrap: balance;
  }

  .glow {
    position: absolute;
    inset: -40px;
    background:
      radial-gradient(600px 240px at 10% 25%, rgba(34, 197, 94, 0.55), transparent 60%),
      radial-gradient(600px 260px at 90% 70%, rgba(134, 230, 198, 0.55), transparent 60%);
    filter: blur(12px);
    opacity: 0.65;
    transition: opacity 450ms ease;
  }

  .card:hover .glow {
    opacity: 0.9;
  }

  @keyframes in {
    from {
      opacity: 0;
      transform: translateY(18px) scale(0.97);
    }
    to {
      opacity: 1;
      transform: translateY(0px) scale(1);
    }
  }

  @media (min-width: 640px) {
    .card {
      grid-column: span 6;
      padding: 20px 20px;
    }
  }

  @media (min-width: 1024px) {
    .card {
      grid-column: span 4;
    }
  }
</style>
