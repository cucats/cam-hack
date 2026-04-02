<script>
  const currentYear = new Date().getFullYear();
</script>

<div class="relative py-20 px-4 overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-t from-emerald-950/50 to-transparent"></div>
  
  <div class="max-w-7xl mx-auto relative z-10">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
      <div class="space-y-4">
        <h3 class="text-2xl font-bold text-emerald-300">Cam Hack</h3>
        <p class="text-emerald-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      
      <div class="space-y-4">
        <h4 class="text-xl font-semibold text-emerald-300">Links</h4>
        <div class="flex flex-col space-y-2">
          <a href="https://cam-hack-2025.devpost.com" target="_blank" class="footer-link">
            Devpost
          </a>
          <a href="/discord" class="footer-link">
            Discord
          </a>
          <a href="/code-of-conduct" class="footer-link">
            Code of Conduct
          </a>
        </div>
      </div>
      
      <div class="space-y-4">
        <h4 class="text-xl font-semibold text-emerald-300">Contact</h4>
        <p class="text-emerald-200">Lorem ipsum dolor sit</p>
        <p class="text-emerald-200">consectetur@adipiscing.com</p>
      </div>
    </div>
    
    <div class="border-t border-emerald-500/30 pt-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-emerald-300">© {currentYear} Cam Hack. All rights reserved.</p>
        <div class="flex gap-6">
          <a href="https://cucats.org" target="_blank" class="footer-link">
            CUCATS
          </a>
          <a href="https://cam-hack-2025.devpost.com" target="_blank" class="footer-link">
            Projects
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .footer-link {
    color: rgb(167, 243, 208);
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
  }
  
  .footer-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(to right, #10b981, #86e293);
    transition: width 0.3s ease;
  }
  
  .footer-link:hover::after {
    width: 100%;
  }
  
  .footer-link:hover {
    color: rgb(110, 231, 183);
    text-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
  }
</style>
