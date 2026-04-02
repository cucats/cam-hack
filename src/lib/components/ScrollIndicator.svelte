<div class="scroll-indicator">
  <div class="mouse">
    <div class="wheel"></div>
  </div>
  <div class="arrow-down">
    <span></span>
    <span></span>
    <span></span>
  </div>
</div>

<style>
  .scroll-indicator {
    position: absolute;
    bottom: 3rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    animation: fadeIn 2s ease-out 2s forwards;
    opacity: 0;
  }
  
  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
  
  .mouse {
    width: 28px;
    height: 45px;
    border: 2px solid rgba(16, 185, 129, 0.8);
    border-radius: 15px;
    position: relative;
    animation: bounce 2s infinite;
  }
  
  .wheel {
    width: 4px;
    height: 8px;
    background: rgba(16, 185, 129, 0.8);
    border-radius: 2px;
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    animation: scroll 2s infinite;
  }
  
  @keyframes scroll {
    0%, 20% {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateX(-50%) translateY(12px);
      opacity: 0;
    }
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
  
  .arrow-down {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  
  .arrow-down span {
    display: block;
    width: 12px;
    height: 12px;
    border-right: 2px solid rgba(16, 185, 129, 0.8);
    border-bottom: 2px solid rgba(16, 185, 129, 0.8);
    transform: rotate(45deg);
    animation: arrow-move 2s infinite;
  }
  
  .arrow-down span:nth-child(2) {
    animation-delay: 0.1s;
  }
  
  .arrow-down span:nth-child(3) {
    animation-delay: 0.2s;
  }
  
  @keyframes arrow-move {
    0%, 100% {
      opacity: 0;
      transform: rotate(45deg) translate(-5px, -5px);
    }
    50% {
      opacity: 1;
      transform: rotate(45deg) translate(0, 0);
    }
  }
</style>
