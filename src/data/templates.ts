import { ProfileData } from "../types";

export function generateBannerSvg(data: ProfileData, characterBase64: string | null, isLight: boolean = false): string {
  const bgFill = isLight ? "url(#bgLight)" : "url(#bgDark)";
  const bgDef = isLight 
    ? `<linearGradient id="bgLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#faf5ff" />
      <stop offset="40%" stop-color="#f5f3ff" />
      <stop offset="80%" stop-color="#fdf4ff" />
      <stop offset="100%" stop-color="#faf8ff" />
    </linearGradient>`
    : `<linearGradient id="bgDark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0518" />
      <stop offset="40%" stop-color="#140727" />
      <stop offset="80%" stop-color="#1b0933" />
      <stop offset="100%" stop-color="#070210" />
    </linearGradient>`;

  const primaryColors = isLight 
    ? {
        primary: "url(#primaryGrad)",
        textMain: "#1e1b4b",
        textSub: "#475569",
        termBg: "#f3e8ff",
        cardStroke: "#cbd5e1",
        subCardStroke: "#ddd6fe",
        cardFill: "url(#cardGrad)",
        pillBg: "#fdf2f8",
        pillStroke: "#f472b6",
        neonSignBg: "#ffffff"
      }
    : {
        primary: "url(#primaryGrad)",
        textMain: "#ffffff",
        textSub: "#94a3b8",
        termBg: "#1f1138",
        cardStroke: "url(#primaryGrad)",
        subCardStroke: "#8b5cf6",
        cardFill: "url(#cardGrad)",
        pillBg: "#1f113a",
        pillStroke: "#ec4899",
        neonSignBg: "#0b0314"
      };

  const skillsList = data.skills.split(",").map(s => s.trim()).filter(Boolean);

  // Layout calculations for skills pills in the banner
  const pillsSvg = skillsList.map((skill, index) => {
    let x = 0;
    let y = 30;
    if (index === 1) { x = 100; y = 30; }
    else if (index === 2) { x = 0; y = 72; }
    else if (index === 3) { x = 190; y = 72; }
    else if (index === 4) { x = 0; y = 114; }
    else if (index > 4) { x = (index - 4) * 110; y = 114; }

    const width = Math.max(skill.length * 9 + 30, 90);
    return `
      <g class="pill" transform="translate(${x}, ${y})" style="animation-delay: ${1.5 + index * 0.2}s;">
        <rect x="0" y="0" width="${width}" height="32" rx="16" fill="${primaryColors.pillBg}" stroke="${primaryColors.pillStroke}" stroke-width="1" />
        <text x="${width / 2}" y="20" font-family="'Inter', sans-serif" font-size="12" fill="${isLight ? "#1e293b" : "#ffffff"}" font-weight="600" text-anchor="middle">${skill}</text>
      </g>
    `;
  }).join("\n");

  const characterImagePart = characterBase64
    ? `<!-- Dynamic High-Tech Photo Layer with the uploaded image -->
          <defs>
            <clipPath id="photoFrameClip">
              <rect x="80" y="90" width="220" height="330" rx="12" />
            </clipPath>
          </defs>

          <!-- Translucent glassmorphic panel behind it -->
          <rect x="72" y="82" width="236" height="346" rx="16" fill="${isLight ? "#faf5ff" : "#0d041e"}" stroke="url(#primaryGrad)" stroke-dasharray="6 3" stroke-width="1" opacity="0.6" />
          
          <!-- Image Layer with crop -->
          <g>
            <image href="${characterBase64}" x="80" y="90" width="220" height="330" preserveAspectRatio="xMidYMid slice" clip-path="url(#photoFrameClip)" />
          </g>

          <!-- High-tech glowing frame border -->
          <rect x="80" y="90" width="220" height="330" rx="12" fill="none" stroke="url(#primaryGrad)" stroke-width="2" filter="url(#subtleGlow)" />
          
          <!-- Tech brackets at the four corners -->
          <path d="M 72,110 L 72,82 L 100,82" fill="none" stroke="#ec4899" stroke-width="1.8" />
          <path d="M 308,110 L 308,82 L 280,82" fill="none" stroke="#ec4899" stroke-width="1.8" />
          <path d="M 72,400 L 72,428 L 100,428" fill="none" stroke="#ec4899" stroke-width="1.8" />
          <path d="M 308,400 L 308,428 L 280,428" fill="none" stroke="#ec4899" stroke-width="1.8" />

          <!-- Tech labels next to the frame -->
          <text x="190" y="442" font-family="'Space Grotesk', sans-serif" font-size="8" font-weight="extrabold" fill="#ec4899" text-anchor="middle" letter-spacing="1.5">SECURE PORTRAIT LAYER</text>
          <text x="190" y="452" font-family="'Inter', sans-serif" font-size="7" fill="${isLight ? "#475569" : "#94a3b8"}" text-anchor="middle" font-weight="500">RESOLVING: 100% | ACTIVE_NODE</text>

          <!-- Standard Label -->
          <text x="190" y="525" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="13" fill="${isLight ? "#1e1b4b" : "#ffffff"}" text-anchor="middle" letter-spacing="1">NAGARJUNA REDDY BIJJAM</text>
          <text x="190" y="540" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="10" fill="#ec4899" text-anchor="middle" letter-spacing="1.5">CORE TEAM MEMBER</text>
          <text x="190" y="555" font-family="'Inter', sans-serif" font-size="8" fill="${isLight ? "#475569" : "#e0b0ff"}" opacity="0.8" text-anchor="middle">Hover or Click above to upload dynamic portraits</text>
    `
    : `<!-- Custom Vector Character representation matching Nagarjuna's photo -->
          <!-- Ambient soft glowing backing -->
          <circle cx="190" cy="330" r="175" fill="none" stroke="url(#primaryGrad)" stroke-width="1.5" opacity="0.25" stroke-dasharray="12 6" />
          <circle cx="190" cy="330" r="160" fill="none" stroke="#ec4899" stroke-width="1" opacity="0.15" />
          
          <!-- RATTAN STAND / LEGS -->
          <path d="M 140,430 L 100,540 L 280,540 L 240,430 Z" fill="none" stroke="#d5a153" stroke-width="8" stroke-linejoin="round" opacity="0.9" />
          <path d="M 140,430 L 100,540 L 280,540 L 240,430 Z" fill="none" stroke="#a07232" stroke-width="2" stroke-linejoin="round" opacity="0.7" />
          <line x1="190" y1="430" x2="190" y2="540" stroke="#d5a153" stroke-width="5" opacity="0.9" />
          <line x1="160" y1="430" x2="130" y2="540" stroke="#a07232" stroke-width="3" opacity="0.8" />
          <line x1="220" y1="430" x2="250" y2="540" stroke="#a07232" stroke-width="3" opacity="0.8" />

          <!-- RATTAN PAPASAN CHAIR BOWL -->
          <ellipse cx="190" cy="320" rx="145" ry="145" fill="none" stroke="#d5a153" stroke-width="12" />
          <ellipse cx="190" cy="320" rx="138" ry="138" fill="none" stroke="#a07232" stroke-width="2.5" />
          <ellipse cx="190" cy="320" rx="125" ry="125" fill="none" stroke="#d5a153" stroke-dasharray="6,6" stroke-width="1.5" opacity="0.45" />
          <ellipse cx="190" cy="320" rx="105" ry="105" fill="none" stroke="#a07232" stroke-dasharray="4,4" stroke-width="1.2" opacity="0.4" />

          <!-- PAPASAN CUSHION (Comfortable warm off-white) -->
          <ellipse cx="190" cy="330" rx="130" ry="120" fill="#fdfaf2" stroke="#e6dfd1" stroke-width="2" />
          <!-- Cushion Tufts / Buttons and Indents -->
          <circle cx="130" cy="290" r="4.5" fill="#c3b8a5" />
          <circle cx="250" cy="290" r="4.5" fill="#c3b8a5" />
          <circle cx="190" cy="340" r="5" fill="#c3b8a5" />
          <circle cx="130" cy="370" r="4.5" fill="#c3b8a5" />
          <circle cx="250" cy="370" r="4.5" fill="#c3b8a5" />
          
          <path d="M 130,290 Q 190,340 250,290" fill="none" stroke="#e6dfd1" stroke-width="2.5" />
          <path d="M 130,370 Q 190,340 250,370" fill="none" stroke="#e6dfd1" stroke-width="2.5" />
          <path d="M 130,290 Q 125,330 130,370" fill="none" stroke="#e6dfd1" stroke-width="2.5" />
          <path d="M 250,290 Q 255,330 250,370" fill="none" stroke="#e6dfd1" stroke-width="2.5" />

          <!-- CHARACTER - LEGS & JEANS -->
          <!-- Left Leg -->
          <path d="M 125,360 Q 140,465 155,485 L 180,485 Q 165,420 150,360 Z" fill="#2b5c8f" stroke="#1d3f63" stroke-width="1.2" />
          <!-- Right Leg (Crossed comfortably) -->
          <path d="M 150,360 Q 210,465 225,475 L 245,465 Q 215,410 185,360 Z" fill="#366fa8" stroke="#1d3f63" stroke-width="1.2" />
          <!-- Denim Highlights -->
          <path d="M 130,370 Q 143,455 152,480" fill="none" stroke="#60a5fa" stroke-width="1.8" opacity="0.35" />
          <path d="M 158,370 Q 205,455 218,468" fill="none" stroke="#60a5fa" stroke-width="1.8" opacity="0.35" />

          <!-- WHITE SNEAKERS -->
          <!-- Left Shoe -->
          <path d="M 152,482 Q 148,505 132,505 Q 122,505 128,485 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
          <path d="M 128,485 L 138,482" stroke="#94a3b8" stroke-width="1" />
          <!-- Right Shoe -->
          <path d="M 223,470 Q 230,493 245,493 Q 255,488 243,470 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
          <path d="M 235,470 L 240,475" stroke="#94a3b8" stroke-width="1" />

          <!-- TORSO - YELLOW T-SHIRT -->
          <path d="M 155,250 L 215,250 L 210,320 L 160,320 Z" fill="#eab308" />

          <!-- OPEN WHITE HOODIE -->
          <!-- Hood visible behind neck -->
          <path d="M 140,235 Q 185,200 230,235 Q 185,220 140,235" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5" />
          <path d="M 150,235 Q 185,222 220,235" fill="none" stroke="#eab308" stroke-width="2.5" /> <!-- Collar link -->
          
          <!-- Hoodie sides -->
          <path d="M 140,235 L 165,235 L 160,350 L 130,335 Z" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2.2" />
          <path d="M 230,235 L 205,235 L 210,350 L 240,335 Z" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2.2" />
          
          <!-- Hoodie sleeves holding laptop -->
          <path d="M 140,235 Q 105,280 145,320 L 160,305 Q 125,275 145,235 Z" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />
          <path d="M 230,235 Q 265,280 225,320 L 210,305 Q 250,275 225,235 Z" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />

          <!-- NECK AND FACE -->
          <path d="M 172,220 L 198,220 L 193,250 L 177,250 Z" fill="#b07d50" />
          <ellipse cx="185" cy="180" rx="22" ry="26" fill="#c68b59" />
          
          <!-- NOSE, FRIENDLY SMILE, EYES -->
          <!-- Smile showing white teeth -->
          <path d="M 175,192 Q 185,202 195,192 Z" fill="#ffffff" stroke="#991b1b" stroke-width="1.2" />
          <line x1="173" y1="191" x2="197" y2="191" stroke="#991b1b" stroke-width="0.8" />
          <!-- Friendly dark eyes -->
          <circle cx="176" cy="174" r="2" fill="#0f172a" />
          <circle cx="194" cy="174" r="2" fill="#0f172a" />
          <path d="M 171,169 Q 176,166 181,169" fill="none" stroke="#0f172a" stroke-width="1.2" />
          <path d="M 189,169 Q 194,166 199,169" fill="none" stroke="#0f172a" stroke-width="1.2" />
          
          <!-- NEAT BLACK HAIR -->
          <path d="M 160,175 C 158,145 212,145 210,175 C 212,160 158,160 160,175 Z" fill="#1e1b4b" />
          <path d="M 161,170 Q 185,140 209,170 Q 185,155 161,170" fill="#0f172a" />
          <path d="M 163,165 Q 185,132 207,165 C 197,150 173,150 163,165" fill="#090514" />

          <!-- MODERN LAPTOP ON LAP -->
          <path d="M 130,295 L 240,295 L 230,330 L 140,330 Z" fill="#1e293b" stroke="#475569" stroke-width="1.5" />
          <path d="M 140,330 L 230,330 L 240,340 L 130,340 Z" fill="#334155" />
          <circle cx="185" cy="310" r="4" fill="#cbd5e1" opacity="0.8" /> <!-- Logo accent -->

          <!-- GLASS TOP WICKER SIDE TABLE -->
          <ellipse cx="300" cy="450" rx="45" ry="10" fill="rgba(255,255,255,0.08)" stroke="#d5a153" stroke-width="3.5" />
          <ellipse cx="300" cy="450" rx="41" ry="8" fill="none" stroke="#a07232" stroke-width="1" />
          <!-- Table Legs -->
          <path d="M 275,453 L 265,525 M 325,453 L 335,525 M 300,453 L 300,525" stroke="#d5a153" stroke-width="3" />
          <ellipse cx="300" cy="525" rx="35" ry="7" fill="none" stroke="#d5a153" stroke-width="2.5" />

          <!-- TABLE ACCESSORIES -->
          <!-- Potted Plant -->
          <path d="M 324,440 L 332,440 L 330,449 L 326,449 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.5" />
          <circle cx="328" cy="437" r="3" fill="#10b981" />
          <circle cx="325" cy="435" r="2.5" fill="#047857" />
          <circle cx="331" cy="436" r="2.5" fill="#059669" />

          <!-- Coffee Cup -->
          <path d="M 268,432 L 278,432 L 276,446 L 270,446 Z" fill="#f5f5f4" stroke="#78350f" stroke-width="0.5" />
          <ellipse cx="273" cy="432" rx="5" ry="1.5" fill="#78350f" /> <!-- Lid -->
          <text x="273" y="440" font-family="'Inter', sans-serif" font-size="2" fill="#78350f" text-anchor="middle" font-weight="900">Code.</text>
          <text x="273" y="443" font-family="'Inter', sans-serif" font-size="2" fill="#78350f" text-anchor="middle" font-weight="900">Coffee.</text>

          <!-- Stack of colored textbooks next to the table (Deep learning, Rags, LLMS, SQL, Pragmatic Programmer) -->
          <g transform="translate(290, 390)">
            <!-- Purple book -->
            <rect x="0" y="0" width="30" height="7" fill="#581c87" rx="1" stroke="#ffffff" stroke-width="0.2" />
            <text x="15" y="5.5" font-family="'Inter', sans-serif" font-size="3.5" fill="#ffffff" text-anchor="middle" font-weight="bold" letter-spacing="0.2">Deep learning</text>
            
            <!-- Teal/Blue RAGs book -->
            <rect x="0" y="7" width="30" height="7" fill="#0369a1" rx="1" stroke="#ffffff" stroke-width="0.2" />
            <text x="15" y="12.5" font-family="'Inter', sans-serif" font-size="3.8" fill="#ffffff" text-anchor="middle" font-weight="bold">Rags</text>

            <!-- Emerald green LLMS book -->
            <rect x="0" y="14" width="30" height="7" fill="#047857" rx="1" stroke="#ffffff" stroke-width="0.2" />
            <text x="15" y="19.5" font-family="'Inter', sans-serif" font-size="3.8" fill="#ffffff" text-anchor="middle" font-weight="bold">LLMS</text>

            <!-- Indigo SQL book -->
            <rect x="0" y="21" width="30" height="7" fill="#1e3a8a" rx="1" stroke="#ffffff" stroke-width="0.2" />
            <text x="15" y="26.5" font-family="'Inter', sans-serif" font-size="3.8" fill="#ffffff" text-anchor="middle" font-weight="bold">SQL</text>

            <!-- Dark charcoal Pragmatic Programmer book -->
            <rect x="0" y="28" width="30" height="7" fill="#111827" rx="1" stroke="#fbbf24" stroke-width="0.3" />
            <text x="15" y="33.5" font-family="'Inter', sans-serif" font-size="3" fill="#fbbf24" text-anchor="middle" font-weight="bold">Pragmatic Prog</text>
          </g>

          <!-- Spiral Notebook open showing checklist -->
          <g transform="translate(262, 452)">
            <path d="M 0,0 L 24,0 L 22,14 L -2,14 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="0.3" />
            <!-- Spirals -->
            <circle cx="2" cy="7" r="0.6" fill="#475569" />
            <circle cx="4" cy="7" r="0.6" fill="#475569" />
            <circle cx="6" cy="7" r="0.6" fill="#475569" />
            <!-- Text -->
            <text x="11" y="4" font-family="'Inter', sans-serif" font-size="2.2" fill="#0f172a" font-weight="bold">Today's plan:</text>
            <text x="1" y="8" font-family="'Inter', sans-serif" font-size="1.8" fill="#1e293b" font-weight="600">[x] Code. Learn.</text>
            <text x="1" y="11" font-family="'Inter', sans-serif" font-size="1.8" fill="#1e293b" font-weight="600">[x] Build. Repeat.</text>
          </g>

          <!-- Standard Label -->
          <text x="190" y="525" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="13" fill="${isLight ? "#1e1b4b" : "#ffffff"}" text-anchor="middle" letter-spacing="1">NAGARJUNA REDDY BIJJAM</text>
          <text x="190" y="540" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="10" fill="#ec4899" text-anchor="middle" letter-spacing="1.5">CORE TEAM MEMBER</text>
          <text x="190" y="555" font-family="'Inter', sans-serif" font-size="8" fill="${isLight ? "#475569" : "#e0b0ff"}" opacity="0.8" text-anchor="middle">Hover or Click above to upload dynamic portraits</text>
    `;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 740" width="1280" height="740">
  <defs>
    <!-- Background Gradients -->
    ${bgDef}

    <!-- Glowing Pink-Purple Gradients -->
    <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ec4899" />
      <stop offset="100%" stop-color="#a78bfa" />
    </linearGradient>
    <linearGradient id="textSignGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#be185d" />
      <stop offset="100%" stop-color="#6d28d9" />
    </linearGradient>
    <linearGradient id="neonSignGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff007f" />
      <stop offset="100%" stop-color="#9d4edd" />
    </linearGradient>
    <linearGradient id="scanLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff007f" stop-opacity="0" />
      <stop offset="15%" stop-color="#ff007f" stop-opacity="0.8" />
      <stop offset="50%" stop-color="#ffffff" stop-opacity="1" />
      <stop offset="85%" stop-color="#9d4edd" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#9d4edd" stop-opacity="0" />
    </linearGradient>
    
    <!-- Code Editor Card Background -->
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${isLight ? "#ffffff" : "#180b2a"}" stop-opacity="${isLight ? "0.92" : "0.85"}" />
      <stop offset="100%" stop-color="${isLight ? "#fbfbfe" : "#0b0314"}" stop-opacity="${isLight ? "0.96" : "0.95"}" />
    </linearGradient>

    <!-- Filters -->
    <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="subtleGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="holoGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="12" result="blur" />
      <feColorMatrix type="matrix" values="1 0 0 0 0.8   0 1 0 0 0.2   0 0 1 0 0.9  0 0 0 1 0" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <!-- Banner Rounded Corners Clipping -->
    <clipPath id="bannerClip">
      <rect x="0" y="0" width="1280" height="740" rx="24" />
    </clipPath>
  </defs>

  <style>
    /* TYPING ANIMATIONS */
    @keyframes blink {
      50% { opacity: 0; }
    }
    .cursor {
      animation: blink 0.8s infinite;
      fill: #f472b6;
    }
    .term-text {
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      font-size: 18px;
      fill: ${isLight ? "#059669" : "#34d399"};
      opacity: 0;
      animation: fadeIn 0.1s 0.5s forwards;
    }
    @keyframes fadeIn {
      to { opacity: 1; }
    }
    @keyframes drawPath {
      to { stroke-dashoffset: 0; }
    }
    .sig-path {
      stroke-dasharray: 2000;
      stroke-dashoffset: 2000;
      animation: drawPath 3.5s cubic-bezier(0.4, 0, 0.2, 1) 1.2s forwards;
    }
    @keyframes cycleRoles {
      0%, 28% { transform: translateY(0); }
      33%, 61% { transform: translateY(-40px); }
      66%, 94% { transform: translateY(-80px); }
      100% { transform: translateY(0); }
    }
    .role-container {
      animation: cycleRoles 9s infinite ease-in-out;
    }
    @keyframes floatUp {
      0% { transform: translateY(40px) scale(0.8); opacity: 0; }
      50% { opacity: 0.6; }
      100% { transform: translateY(-100px) scale(1.1); opacity: 0; }
    }
    .particle {
      fill: #ec4899;
      opacity: 0;
      animation: floatUp 8s infinite linear;
    }
    @keyframes twinkle {
      0%, 100% { opacity: 0.2; transform: scale(0.8); }
      50% { opacity: 1; transform: scale(1.2); }
    }
    .sparkle {
      fill: ${isLight ? "#7c3aed" : "#ffffff"};
      animation: twinkle 3s infinite ease-in-out;
    }
    @keyframes pulseOrb {
      0%, 100% { transform: scale(1); opacity: 0.15; }
      50% { transform: scale(1.2); opacity: 0.35; }
    }
    .ambient-orb {
      animation: pulseOrb 8s infinite ease-in-out;
    }
    @keyframes holoReveal {
      0% { clip-path: inset(100% 0 0 0); filter: brightness(3) contrast(1.5) grayscale(1); }
      100% { clip-path: inset(0 0 0 0); filter: brightness(1) contrast(1) grayscale(0); }
    }
    @keyframes sweepLine {
      0% { transform: translateY(-20px); }
      100% { transform: translateY(760px); }
    }
    @keyframes sweepLineContinuous {
      0% { transform: translateY(-50px); opacity: 0; }
      10% { opacity: 0.8; }
      90% { opacity: 0.8; }
      100% { transform: translateY(770px); opacity: 0; }
    }
    .character-container {
      animation: holoReveal 2.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards;
    }
    .one-time-scan {
      animation: sweepLine 2.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards;
    }
    .continuous-scan {
      animation: sweepLineContinuous 3.5s linear infinite;
    }
    @keyframes flicker {
      0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
        opacity: 0.99;
        filter: drop-shadow(0 0 8px #ff007f) drop-shadow(0 0 20px #9d4edd);
      }
      20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
        opacity: 0.3;
        filter: none;
      }
    }
    .neon-text {
      animation: flicker 4s infinite alternate;
    }
    @keyframes pillFadeIn {
      from { transform: scale(0.8) translateY(15px); opacity: 0; }
      to { transform: scale(1) translateY(0); opacity: 1; }
    }
    .pill {
      opacity: 0;
      animation: pillFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      transition: all 0.3s ease;
      cursor: pointer;
    }
    .pill:hover {
      fill: #f472b6 !important;
      stroke: #ffffff !important;
      filter: drop-shadow(0 0 8px #f472b6);
    }
    .pill:hover text {
      fill: #0a0518 !important;
    }
    @keyframes revealLine {
      from { max-height: 0px; opacity: 0; }
      to { max-height: 40px; opacity: 1; }
    }
    .code-line {
      opacity: 0;
      overflow: hidden;
      animation: revealLine 0.6s ease forwards;
    }
  </style>

  <!-- Background Base Canvas -->
  <g clip-path="url(#bannerClip)">
    <rect x="0" y="0" width="1280" height="740" fill="${bgFill}" />

    <!-- Ambient Glow Orbs -->
    <circle class="ambient-orb" cx="150" cy="150" r="180" fill="#db2777" opacity="0.15" filter="url(#holoGlow)" style="animation-delay: 0s;" />
    <circle class="ambient-orb" cx="1100" cy="600" r="220" fill="#7c3aed" opacity="0.2" filter="url(#holoGlow)" style="animation-delay: -3s;" />

    <!-- Sparkles and Particles -->
    <path class="sparkle" d="M300,100 L303,108 L311,111 L303,114 L300,122 L297,114 L289,111 L297,108 Z" style="animation-delay: 0.5s;" />
    <path class="sparkle" d="M980,80 L982,85 L987,87 L982,89 L980,94 L978,89 L973,87 L978,85 Z" style="animation-delay: 2.5s;" />
    
    <circle class="particle" cx="100" cy="650" r="4" style="animation-duration: 9s; animation-delay: 0s;" />
    <circle class="particle" cx="500" cy="700" r="5" style="animation-duration: 11s; animation-delay: 1s;" />

    <!-- Dynamic Terminal Line -->
    <g transform="translate(50, 60)">
      <rect x="0" y="0" width="35" height="35" rx="8" fill="${isLight ? "#f3e8ff" : "#1f1138"}" />
      <text x="12" y="23" font-family="'JetBrains Mono', monospace" font-size="16" fill="#ec4899" font-weight="bold">&gt;</text>
      <text class="term-text" x="50" y="24">user@dev:~$ <tspan fill="${primaryColors.textMain}">cat README.md</tspan></text>
      <rect class="cursor" x="315" y="8" width="10" height="20" />
    </g>

    <!-- Animated Name Title -->
    <g transform="translate(50, 150)">
      <g stroke="url(#primaryGrad)" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="sig-path" filter="url(#subtleGlow)">
        <!-- Beautiful vector signature cursive trace path -->
        <path d="M 0,45 C -10,35 -15,10 -5,5 C 5,0 15,20 20,45 L 25,65 C 20,40 35,5 45,10 C 50,15 45,50 40,65 C 45,55 55,45 60,45 C 65,45 68,52 65,60 M 75,55 C 70,55 68,60 72,63 C 76,65 80,60 80,55 L 80,65 M 90,55 C 85,55 83,60 87,63 C 91,65 95,60 95,55 L 95,75" />
      </g>
      <text x="0" y="115" font-family="'Space Grotesk', sans-serif" font-size="34" font-weight="800" fill="url(#primaryGrad)" opacity="0" style="animation: fadeIn 1.2s 4.2s forwards;">${data.name.toUpperCase()}</text>
    </g>

    <!-- Cycling Role -->
    <g transform="translate(50, 290)">
      <text x="0" y="28" font-family="'Inter', sans-serif" font-size="20" fill="${primaryColors.textSub}" font-weight="600">Specializing in </text>
      <g clip-path="url(#roleClip)" transform="translate(150, 0)">
        <g class="role-container">
          <text x="0" y="28" font-family="'Space Grotesk', sans-serif" font-size="22" fill="#ec4899" font-weight="bold" filter="url(#subtleGlow)">${data.role}</text>
          <text x="0" y="68" font-family="'Space Grotesk', sans-serif" font-size="22" fill="#c084fc" font-weight="bold" filter="url(#subtleGlow)">Generative AI &amp; LLMs</text>
          <text x="0" y="108" font-family="'Space Grotesk', sans-serif" font-size="22" fill="#38bdf8" font-weight="bold" filter="url(#subtleGlow)">Deep Learning Solutions</text>
        </g>
      </g>
      <clipPath id="roleClip">
        <rect x="0" y="0" width="400" height="42" />
      </clipPath>
    </g>

    <!-- Tagline Box -->
    <g transform="translate(50, 360)">
      <rect x="0" y="0" width="380" height="70" rx="12" fill="${isLight ? "#faf5ff" : "#16082b"}" stroke="${isLight ? "#ddd6fe" : "#8b5cf6"}" stroke-width="1.5" stroke-dasharray="4 4" />
      <text x="20" y="25" font-family="'JetBrains Mono', monospace" font-size="12" fill="#a78bfa" font-weight="bold">// Tagline</text>
      <text x="20" y="48" font-family="'Space Grotesk', sans-serif" font-size="18" fill="${primaryColors.textMain}" font-style="italic">"${data.tagline}"</text>
    </g>

    <!-- Arsenal Grid -->
    <g transform="translate(50, 460)">
      <text x="0" y="15" font-family="'Space Grotesk', sans-serif" font-size="16" fill="#f472b6" font-weight="700" letter-spacing="1">CORE ARSENAL</text>
      ${pillsSvg}
    </g>

    <!-- Neon Sign -->
    <g transform="translate(50, 600)">
      <rect x="0" y="0" width="380" height="80" rx="16" fill="${primaryColors.neonSignBg}" stroke="#ff007f" stroke-width="2" filter="url(#neonGlow)" />
      <text class="neon-text" x="190" y="47" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="20" fill="${isLight ? "#1e1b4b" : "#ffffff"}" text-anchor="middle" letter-spacing="3" filter="url(#neonGlow)">KEEP CODING KEEP GROWING</text>
    </g>

    <!-- Code Editor Window -->
    <g transform="translate(480, 60)">
      <rect x="0" y="0" width="380" height="340" rx="16" fill="${primaryColors.cardFill}" stroke="${primaryColors.cardStroke}" stroke-width="1.5" />
      <circle cx="20" cy="20" r="6" fill="#ef4444" />
      <circle cx="40" cy="20" r="6" fill="#f59e0b" />
      <circle cx="60" cy="20" r="6" fill="#10b981" />
      <text x="190" y="24" font-family="'JetBrains Mono', monospace" font-size="12" fill="#94a3b8" text-anchor="middle">resume-builder.tsx</text>

      <g transform="translate(20, 50)" font-family="'JetBrains Mono', monospace" font-size="12" xml:space="preserve">
        <g class="code-line" style="animation-delay: 2.2s;"><text x="0" y="20" fill="#8b5cf6">import <tspan fill="${isLight ? "#0f172a" : "#ffffff"}">React</tspan> from <tspan fill="#34d399">"react"</tspan>;</text></g>
        <g class="code-line" style="animation-delay: 2.8s;"><text x="0" y="45" fill="#ec4899">const <tspan fill="#f472b6">Resume</tspan> = () => {</text></g>
        <g class="code-line" style="animation-delay: 3.4s;"><text x="20" y="70" fill="#a78bfa">return (</text></g>
        <g class="code-line" style="animation-delay: 4.0s;"><text x="40" y="95" fill="${isLight ? "#475569" : "#e2e8f0"}">&lt;<tspan fill="#f472b6">${data.name.split(" ")[0]}</tspan></text></g>
        <g class="code-line" style="animation-delay: 4.6s;"><text x="60" y="120" fill="#38bdf8">role=<tspan fill="#34d399">"${data.role}"</tspan></text></g>
        <g class="code-line" style="animation-delay: 5.2s;"><text x="60" y="145" fill="#38bdf8">motto=<tspan fill="#34d399">"${data.tagline}"</tspan></text></g>
        <g class="code-line" style="animation-delay: 5.8s;"><text x="60" y="170" fill="#38bdf8">skills={[<tspan fill="#34d399">"Python"</tspan>, <tspan fill="#34d399">"ML/DL"</tspan>]}</text></g>
        <g class="code-line" style="animation-delay: 6.4s;"><text x="40" y="195" fill="${isLight ? "#475569" : "#e2e8f0"}">/&gt;</text></g>
        <g class="code-line" style="animation-delay: 7.0s;"><text x="20" y="220" fill="#a78bfa">);</text></g>
        <g class="code-line" style="animation-delay: 7.6s;"><text x="0" y="245" fill="#ec4899">};</text></g>
        <g class="code-line" style="animation-delay: 8.2s;"><text x="0" y="270" fill="#8b5cf6">export default <tspan fill="${isLight ? "#0f172a" : "#ffffff"}">Resume</tspan>;</text></g>
      </g>
    </g>

    <!-- Quick Mini-Stats Panel -->
    <g transform="translate(480, 420)">
      <rect x="0" y="0" width="380" height="260" rx="16" fill="${primaryColors.cardFill}" stroke="${primaryColors.subCardStroke}" stroke-width="1" />
      <text x="25" y="35" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="14" fill="#a78bfa">// SYSTEM OVERVIEW</text>
      
      <!-- Progress Bars Column -->
      <g transform="translate(25, 60)">
        <text x="0" y="15" font-family="'Inter', sans-serif" font-size="12" fill="${isLight ? "#1e293b" : "#ffffff"}" font-weight="600">Model Fine-Tuning</text>
        <rect x="0" y="24" width="180" height="6" fill="${isLight ? "#cbd5e1" : "#150a26"}" rx="3" />
        <rect x="0" y="24" width="162" height="6" fill="url(#primaryGrad)" rx="3" />

        <text x="0" y="55" font-family="'Inter', sans-serif" font-size="12" fill="${isLight ? "#1e293b" : "#ffffff"}" font-weight="600">Retrieval Augmented Gen (RAG)</text>
        <rect x="0" y="64" width="180" height="6" fill="${isLight ? "#cbd5e1" : "#150a26"}" rx="3" />
        <rect x="0" y="64" width="158" height="6" fill="url(#primaryGrad)" rx="3" />

        <text x="0" y="95" font-family="'Inter', sans-serif" font-size="12" fill="${isLight ? "#1e293b" : "#ffffff"}" font-weight="600">Neural Net Architecture Design</text>
        <rect x="0" y="104" width="180" height="6" fill="${isLight ? "#cbd5e1" : "#150a26"}" rx="3" />
        <rect x="0" y="104" width="153" height="6" fill="url(#primaryGrad)" rx="3" />
      </g>

      <!-- System Overview Rightside Cybernetic Radar Core -->
      <g transform="translate(295, 130)">
        <!-- Tech background circle -->
        <circle cx="0" cy="0" r="55" fill="${isLight ? "#faf5ff" : "#0d041e"}" stroke="url(#primaryGrad)" stroke-width="1.5" filter="url(#subtleGlow)" />
        
        <!-- Rotating concentric technical indicator rings -->
        <circle cx="0" cy="0" r="48" fill="none" stroke="#ec4899" stroke-width="1" stroke-dasharray="8 6" opacity="0.6" />
        <circle cx="0" cy="0" r="40" fill="none" stroke="#8b5cf6" stroke-width="1.5" stroke-dasharray="180 40" opacity="0.4" />
        <circle cx="0" cy="0" r="32" fill="none" stroke="#38bdf8" stroke-width="0.8" stroke-dasharray="3 3" opacity="0.7" />
        
        <!-- Crosshair grid -->
        <line x1="-55" y1="0" x2="55" y2="0" stroke="${isLight ? "#cbd5e1" : "#1f1138"}" stroke-width="1" opacity="0.5" />
        <line x1="0" y1="-55" x2="0" y2="55" stroke="${isLight ? "#cbd5e1" : "#1f1138"}" stroke-width="1" opacity="0.5" />
        
        <!-- Glowing Core Center -->
        <circle cx="0" cy="0" r="8" fill="url(#primaryGrad)" />
        <circle cx="0" cy="0" r="3" fill="#ffffff" />
        
        <!-- AI Core activity nodes -->
        <path d="M -30,-20 L -15,-5 L 15,-5 L 30,-20" fill="none" stroke="#ec4899" stroke-width="1.2" opacity="0.5" />
        <circle cx="-30" cy="-20" r="3.5" fill="#ec4899" />
        <circle cx="30" cy="-20" r="3.5" fill="#ec4899" />
        
        <!-- Data Sweep Line -->
        <line x1="0" y1="0" x2="38" y2="-38" stroke="#34d399" stroke-width="2" opacity="0.8" stroke-linecap="round" />
        <circle cx="38" cy="-38" r="2.5" fill="#34d399" />
        
        <!-- Cybernetic System Labels -->
        <text x="0" y="-62" font-family="'Space Grotesk', sans-serif" font-size="9" font-weight="extrabold" fill="#a78bfa" text-anchor="middle" letter-spacing="1">AI MATRIX CORE</text>
        <text x="0" y="68" font-family="'Space Grotesk', sans-serif" font-size="8" font-weight="bold" fill="#38bdf8" text-anchor="middle">ACTIVE / 98.4%</text>
        <text x="0" y="78" font-family="'JetBrains Mono', monospace" font-size="6" fill="${isLight ? "#475569" : "#94a3b8"}" text-anchor="middle">TEMP: 32°C | FAN: MAX</text>
      </g>
    </g>

    <!-- Character Panel -->
    <g clip-path="url(#bannerClip)">
      <g class="character-container" transform="translate(870, 40)">
        <g id="character-image-anchor">
          ${characterImagePart}
        </g>
      </g>
      <!-- One-time hologram scan line -->
      <rect class="one-time-scan" x="850" y="0" width="380" height="3" fill="url(#scanLineGrad)" filter="url(#subtleGlow)" />
      <!-- Continuous full-width horizontal scanner -->
      <rect class="continuous-scan" x="0" y="0" width="1280" height="4" fill="url(#scanLineGrad)" filter="url(#neonGlow)" />
    </g>
  </g>
</svg>`;
}

export function generateLanyardSvg(data: ProfileData, faceCropBase64: string | null): string {
  const avatarPart = faceCropBase64
    ? `<image href="${faceCropBase64}" x="112" y="227" width="96" height="96" clip-path="url(#avatarClip)" />`
    : `<!-- Custom Vector Avatar matching Nagarjuna's portrait -->
            <!-- Neck -->
            <path d="M 148,290 L 172,290 L 170,315 L 150,315 Z" fill="#c68b59" />
            <!-- Yellow t-shirt -->
            <path d="M 130,310 L 190,310 L 180,340 L 140,340 Z" fill="#eab308" />
            <!-- White hoodie shoulders -->
            <path d="M 115,315 L 140,310 L 138,340 L 115,340 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" />
            <path d="M 205,315 L 180,310 L 182,340 L 205,340 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" />
            <!-- Face -->
            <circle cx="160" cy="265" r="24" fill="#c68b59" />
            <!-- Smile showing white teeth -->
            <path d="M 152,275 Q 160,283 168,275 Z" fill="#ffffff" stroke="#991b1b" stroke-width="1" />
            <line x1="150" y1="274" x2="170" y2="274" stroke="#991b1b" stroke-width="0.8" />
            <!-- Eyes -->
            <circle cx="152" cy="260" r="2" fill="#0f172a" />
            <circle cx="168" cy="260" r="2" fill="#0f172a" />
            <path d="M 148,256 Q 152,253 156,256" fill="none" stroke="#0f172a" stroke-width="1" />
            <path d="M 164,256 Q 168,253 172,256" fill="none" stroke="#0f172a" stroke-width="1" />
            <!-- Black hair -->
            <path d="M 134,262 C 132,235 188,235 186,262 C 188,248 132,248 134,262 Z" fill="#1e1b4b" />
            <path d="M 135,257 Q 160,230 185,257" fill="none" stroke="#0f172a" stroke-width="4" stroke-linecap="round" />`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 560" width="320" height="560">
  <defs>
    <linearGradient id="strapGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#be185d" />
      <stop offset="50%" stop-color="#ec4899" />
      <stop offset="100%" stop-color="#9d1c7f" />
    </linearGradient>
    <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e2e8f0" />
      <stop offset="40%" stop-color="#94a3b8" />
      <stop offset="70%" stop-color="#cbd5e1" />
      <stop offset="100%" stop-color="#475569" />
    </linearGradient>
    <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1b0833" stop-opacity="0.9" />
      <stop offset="50%" stop-color="#0c0418" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#1a062c" stop-opacity="0.9" />
    </linearGradient>
    <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff007f" />
      <stop offset="100%" stop-color="#a855f7" />
    </linearGradient>
    <linearGradient id="holoShine" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0" />
      <stop offset="35%" stop-color="#ffffff" stop-opacity="0" />
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0.35" />
      <stop offset="52%" stop-color="#db2777" stop-opacity="0.15" />
      <stop offset="65%" stop-color="#ffffff" stop-opacity="0" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </linearGradient>
    <filter id="badgeGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="subtleGlow" x="-15%" y="-15%" width="130%" height="130%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <clipPath id="cardBound">
      <rect x="50" y="170" width="220" height="340" rx="20" />
    </clipPath>
    <clipPath id="avatarClip">
      <circle cx="160" cy="275" r="48" />
    </clipPath>
  </defs>

  <style>
    @keyframes dropAndSwing {
      0% { transform: rotate(-65deg); }
      14% { transform: rotate(45deg); }
      28% { transform: rotate(-30deg); }
      42% { transform: rotate(20deg); }
      56% { transform: rotate(-12deg); }
      70% { transform: rotate(7deg); }
      84% { transform: rotate(-3deg); }
      95% { transform: rotate(1deg); }
      100% { transform: rotate(0deg); }
    }
    @keyframes continuousSway {
      0%, 100% { transform: rotate(-1.5deg); }
      50% { transform: rotate(1.5deg); }
    }
    .lanyard-assembly {
      transform-origin: 160px 0px;
      animation: dropAndSwing 4.5s cubic-bezier(0.25, 1, 0.5, 1) 0s 1, continuousSway 5s ease-in-out 4.5s infinite;
    }
    @keyframes holoSweep {
      0% { transform: translateX(-300px) translateY(-150px) rotate(20deg); }
      100% { transform: translateX(300px) translateY(150px) rotate(20deg); }
    }
    .holo-glow-sheet {
      animation: holoSweep 3.5s infinite linear;
    }
    @keyframes breathGlow {
      0%, 100% { filter: drop-shadow(0 0 3px #ff007f); stroke: #ff007f; }
      50% { filter: drop-shadow(0 0 9px #a855f7); stroke: #a855f7; }
    }
    .avatar-glow-ring {
      animation: breathGlow 3s infinite ease-in-out;
    }
    @keyframes laserScan {
      0%, 100% { transform: translateY(0px); opacity: 0; }
      10%, 90% { opacity: 0.8; }
      50% { transform: translateY(22px); opacity: 0.9; }
    }
    .laser-line {
      animation: laserScan 2.5s infinite ease-in-out;
    }
  </style>

  <g class="lanyard-assembly">
    <path d="M 148,0 L 152,145 L 168,145 L 172,0 Z" fill="url(#strapGrad)" opacity="0.95" />
    <g transform="translate(160, 15)">
      <text x="0" y="25" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="7" fill="#ffffff" opacity="0.7" letter-spacing="3" text-anchor="middle" transform="rotate(88 0 25)">AI&amp;ML ENGINEER</text>
      <text x="0" y="85" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="7" fill="#ffffff" opacity="0.7" letter-spacing="3" text-anchor="middle" transform="rotate(88 0 85)">${data.githubUser.toUpperCase()}</text>
    </g>

    <rect x="148" y="132" width="24" height="15" rx="3" fill="url(#metalGrad)" />
    <circle cx="160" cy="154" r="10" fill="none" stroke="url(#metalGrad)" stroke-width="3" />
    <circle cx="160" cy="154" r="8" fill="none" stroke="#1e293b" stroke-width="1.5" />
    <path d="M 156,156 L 156,170 L 164,170 L 164,156 Z" fill="url(#metalGrad)" />

    <g clip-path="url(#cardBound)">
      <rect x="50" y="170" width="220" height="340" rx="20" fill="url(#glassGrad)" stroke="url(#neonGlow)" stroke-width="1.5" />
      <g stroke="#ffffff" stroke-width="0.3" opacity="0.08">
        <line x1="50" y1="210" x2="270" y2="210" />
        <line x1="50" y1="250" x2="270" y2="250" />
        <line x1="100" y1="170" x2="100" y2="510" />
        <line x1="220" y1="170" x2="220" y2="510" />
      </g>

      <rect x="50" y="170" width="220" height="36" rx="0" fill="#ff007f" opacity="0.15" />
      <text x="160" y="193" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="11" fill="#ff007f" letter-spacing="4" text-anchor="middle" filter="url(#subtleGlow)">CORE TEAM MEMBER</text>
      
      <g>
        <circle class="avatar-glow-ring" cx="160" cy="275" r="52" fill="none" stroke="#ff007f" stroke-width="2.5" />
        <g clip-path="url(#avatarClip)">
          <circle cx="160" cy="275" r="48" fill="#140625" />
          ${avatarPart}
        </g>
      </g>

      <text x="160" y="360" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="15" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">${data.name}</text>
      <text x="160" y="378" font-family="'Inter', sans-serif" font-weight="600" font-size="10" fill="#a855f7" text-anchor="middle" letter-spacing="1.5">${data.role.toUpperCase()}</text>
      <line x1="80" y1="395" x2="240" y2="395" stroke="#ff007f" stroke-width="1" opacity="0.3" />

      <text x="160" y="415" font-family="'JetBrains Mono', monospace" font-size="10" fill="#ffffff" opacity="0.85" text-anchor="middle">@${data.githubUser}</text>
      <text x="160" y="430" font-family="'JetBrains Mono', monospace" font-size="7" fill="#94a3b8" text-anchor="middle">${data.email}</text>

      <g transform="translate(85, 450)">
        <rect x="0" y="0" width="3" height="20" fill="#ffffff" opacity="0.8" />
        <rect x="5" y="0" width="1" height="20" fill="#ffffff" opacity="0.8" />
        <rect x="8" y="0" width="4" height="20" fill="#ffffff" opacity="0.8" />
        <rect x="14" y="0" width="2" height="20" fill="#ffffff" opacity="0.8" />
        <rect x="21" y="0" width="3" height="20" fill="#ffffff" opacity="0.8" />
        <rect x="26" y="0" width="5" height="20" fill="#ffffff" opacity="0.8" />
        <rect x="33" y="0" width="2" height="20" fill="#ffffff" opacity="0.8" />
        <rect x="40" y="0" width="4" height="20" fill="#ffffff" opacity="0.8" />
        <rect x="49" y="0" width="3" height="20" fill="#ffffff" opacity="0.8" />
        <rect x="58" y="0" width="4" height="20" fill="#ffffff" opacity="0.8" />
        <rect x="67" y="0" width="5" height="20" fill="#ffffff" opacity="0.8" />
        <rect x="78" y="0" width="3" height="20" fill="#ffffff" opacity="0.8" />
        <rect x="86" y="0" width="4" height="20" fill="#ffffff" opacity="0.8" />
        <rect x="95" y="0" width="3" height="20" fill="#ffffff" opacity="0.8" />
        <rect x="104" y="0" width="4" height="20" fill="#ffffff" opacity="0.8" />
        <rect x="113" y="0" width="3" height="20" fill="#ffffff" opacity="0.8" />
        <rect x="122" y="0" width="4" height="20" fill="#ffffff" opacity="0.8" />
        <rect x="131" y="0" width="5" height="20" fill="#ffffff" opacity="0.8" />
        <rect x="142" y="0" width="3" height="20" fill="#ffffff" opacity="0.8" />

        <rect class="laser-line" x="-5" y="0" width="160" height="1.5" fill="#ff007f" opacity="0" filter="url(#subtleGlow)" />
        <text x="75" y="29" font-family="'JetBrains Mono', monospace" font-size="6" fill="#94a3b8" letter-spacing="2" text-anchor="middle">2812-${data.githubUser.toUpperCase()}-AI-ML</text>
      </g>

      <rect class="holo-glow-sheet" x="-150" y="-100" width="150" height="500" fill="url(#holoShine)" pointer-events="none" />
    </g>

    <rect x="50" y="170" width="220" height="340" rx="20" fill="none" stroke="url(#neonGlow)" stroke-width="2" filter="url(#badgeGlow)" opacity="0.25" pointer-events="none" />
    <rect x="50" y="170" width="220" height="340" rx="20" fill="none" stroke="#ff007f" stroke-width="1.5" opacity="0.6" pointer-events="none" />
  </g>
</svg>`;
}

export function generateReadmeContent(data: ProfileData): string {
  return `<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="banner.svg?v=1">
    <source media="(prefers-color-scheme: light)" srcset="banner-light.svg?v=1">
    <img src="banner.svg?v=1" alt="Nagarjuna Reddy Bijjam Profile Banner" width="100%">
  </picture>
</p>

<p align="center">
  <a href="https://github.com/${data.githubUser}">
    <img src="https://img.shields.io/badge/GitHub-${data.githubUser}-7c3aed?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="mailto:${data.email}">
    <img src="https://img.shields.io/badge/Email-${data.email.replace("@", "%40")}-db2777?style=for-the-badge&logo=gmail&logoColor=white" alt="Email">
  </a>
  <a href="https://linkedin.com">
    <img src="https://img.shields.io/badge/LinkedIn-${encodeURIComponent(data.name)}-0284c7?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <img src="https://profile-counter.glitch.me/${data.githubUser}/count.svg" alt="Profile Views" height="28">
</p>

---

<p align="center">
  <img src="lanyard.svg?v=1" alt="Nagarjuna Reddy's ID Lanyard Badge Card" width="300">
</p>

<h2 align="center">👋 Hello World, I'm ${data.name}!</h2>
<p align="center">
  <b>${data.role}</b> | Generative AI &amp; LLMs Specialist | Python &amp; Database Architect
</p>
<p align="center">
  <i>"${data.tagline}"</i>
</p>

---

### 🛠️ Core Arsenal & Technologies
<p align="center">
  <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/SQL_Database-4479A1?style=flat-square&logo=postgresql&logoColor=white" alt="SQL">
  <img src="https://img.shields.io/badge/Machine_Learning-FF6F00?style=flat-square&logo=tensorflow&logoColor=white" alt="ML">
  <img src="https://img.shields.io/badge/Deep_Learning-EE4C2C?style=flat-square&logo=pytorch&logoColor=white" alt="Deep Learning">
  <img src="https://img.shields.io/badge/Generative_AI_&_LLMs-9D4EDD?style=flat-square&logo=google-gemini&logoColor=white" alt="GenAI">
</p>

<p align="center">
  <img src="stats.svg?v=1" width="60%" />
</p>
<p align="center">
  <img src="langs.svg?v=1" width="60%" />
</p>

<p align="center">
  <img src="trophies.svg?v=1" width="97%" />
</p>

---

### 🚀 Highlighted Projects & Contributions

| Project Name | Tech Stack | Description | Role & Outcomes |
| :--- | :--- | :--- | :--- |
| **💡 GenAI Agentic RAG Pipeline** | \`Python\`, \`GenAI\`, \`LLMs\`, \`VectorDB\` | Scalable agentic Retrieval Augmented Generation system utilizing multi-agent orchestrations. | Main Architect. Slashed response latency by 35% and increased retrieval accuracy to 94%. |
| **🧠 DeepLearning Fine-Tuner** | \`Python\`, \`PyTorch\`, \`Deep Learning\`, \`Transformers\` | Custom modular fine-tuning engine for large transformer-based audio and text models. | Deep Learning Specialist. Integrated QLoRA parameters for efficient resource usage on edge hardware. |
| **📊 SQL Insights AI** | \`SQL\`, \`Machine Learning\`, \`Python\`, \`PostgreSQL\` | Predictive SQL database parser converting natural language into complex analytical queries. | Full Stack ML Developer. Designed semantic parsing layers and custom schema loaders. |

---

### 📈 Weekly Contribution Board
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/${data.githubUser}/${data.githubUser}/output/github-contribution-grid-snake.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/${data.githubUser}/${data.githubUser}/output/github-contribution-grid-snake-light.svg">
    <img src="https://raw.githubusercontent.com/${data.githubUser}/${data.githubUser}/output/github-contribution-grid-snake.svg" alt="Contribution Snake Game Animation">
  </picture>
</p>

---

<p align="center">
  <i>Made with 💖 and pure vector animation by Animated GitHub Profile Generator. Keep coding, keep growing!</i>
</p>
`;
}
