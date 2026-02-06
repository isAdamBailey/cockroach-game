<template>
  <div class="toilet-wrapper">
    <svg
      class="toilet-svg"
      viewBox="0 0 120 160"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- base/pedestal -->
      <path d="M30,145 Q30,155 40,155 L80,155 Q90,155 90,145 L85,135 L35,135 Z" fill="#e8e8ec" />
      <path d="M30,145 Q30,155 40,155 L80,155 Q90,155 90,145" fill="none" stroke="#c8c8d0" stroke-width="1" />

      <!-- bowl outer -->
      <ellipse cx="60" cy="115" rx="38" ry="25" fill="#f0f0f5" />
      <ellipse cx="60" cy="115" rx="38" ry="25" fill="none" stroke="#d0d0d8" stroke-width="1.5" />

      <!-- bowl inner -->
      <ellipse cx="60" cy="113" rx="28" ry="17" fill="#d8e8f0" />
      <ellipse cx="60" cy="111" rx="20" ry="11" fill="#c0d8e8" />
      <!-- water highlight -->
      <ellipse cx="55" cy="109" rx="8" ry="4" fill="white" opacity="0.3" />

      <!-- seat -->
      <path d="M20,105 Q18,90 30,85 L90,85 Q102,90 100,105 Q95,120 60,125 Q25,120 20,105 Z" fill="#f5f5fa" stroke="#d8d8e0" stroke-width="1.5" />
      <!-- seat inner cutout illusion -->
      <ellipse cx="60" cy="103" rx="30" ry="18" fill="#e0e8ee" />

      <!-- tank -->
      <rect x="32" y="30" rx="8" ry="8" width="56" height="58" fill="#f0f0f5" stroke="#d0d0d8" stroke-width="1.5" />
      <!-- tank top -->
      <rect x="28" y="25" rx="4" ry="4" width="64" height="10" fill="#f5f5fa" stroke="#d0d0d8" stroke-width="1" />
      <!-- flush handle -->
      <line x1="88" y1="45" x2="98" y2="42" stroke="#c0c0c8" stroke-width="3" stroke-linecap="round" />
      <circle cx="100" cy="41" r="3" fill="#d0d0d8" />

      <!-- tank shine -->
      <rect x="40" y="38" rx="3" ry="3" width="6" height="20" fill="white" opacity="0.15" />

      <!-- cute face on tank -->
      <circle cx="50" cy="55" r="3" fill="#555" />
      <circle cx="70" cy="55" r="3" fill="#555" />
      <circle cx="51" cy="53.5" r="1" fill="white" />
      <circle cx="71" cy="53.5" r="1" fill="white" />
      <path d="M48,64 Q60,72 72,64" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" />
      <!-- rosy cheeks -->
      <ellipse cx="43" cy="62" rx="5" ry="3" fill="#ffb8b8" opacity="0.4" />
      <ellipse cx="77" cy="62" rx="5" ry="3" fill="#ffb8b8" opacity="0.4" />
    </svg>
  </div>
</template>

<style scoped>
.toilet-wrapper {
  position: absolute;
  right: 2%;
  top: 50%;
  transform: translateY(-50%);
  width: 18vmin;
  z-index: 5;
  user-select: none;
  -webkit-user-select: none;
}

.toilet-svg {
  width: 100%;
  height: auto;
  display: block;
  filter: drop-shadow(2px 4px 8px rgba(0, 0, 0, 0.3));
}
</style>
