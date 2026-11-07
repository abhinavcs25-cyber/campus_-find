const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const svgs = {
  'placeholder.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F1F5F9" />
          <stop offset="100%" stop-color="#E2E8F0" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#bg)" />
      <circle cx="200" cy="130" r="45" fill="#CBD5E1" />
      <path d="M185 130 L215 130 M200 115 L200 145" stroke="#94A3B8" stroke-width="4" stroke-linecap="round"/>
      <text x="200" y="205" font-family="Inter, sans-serif" font-size="16" font-weight="600" fill="#64748B" text-anchor="middle">Campus Item Image</text>
    </svg>
  `,
  'avatar.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <circle cx="50" cy="50" r="50" fill="#2563EB" />
      <circle cx="50" cy="38" r="18" fill="#FFFFFF" />
      <path d="M22 84 C22 66, 35 60, 50 60 C65 60, 78 66, 78 84" fill="#FFFFFF" />
    </svg>
  `,
  'hero-illustration.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
      <defs>
        <linearGradient id="heroBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#EFF6FF" />
          <stop offset="100%" stop-color="#EEF2FF" />
        </linearGradient>
        <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="100%" stop-color="#F8FAFC" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="12" stdDeviation="15" flood-color="#1E293B" flood-opacity="0.1"/>
        </filter>
      </defs>
      <rect width="600" height="450" rx="24" fill="url(#heroBg)" />
      
      <!-- Decorative circles -->
      <circle cx="100" cy="80" r="60" fill="#DBEAFE" opacity="0.6"/>
      <circle cx="520" cy="360" r="90" fill="#EDE9FE" opacity="0.7"/>
      <circle cx="480" cy="90" r="40" fill="#FEE2E2" opacity="0.5"/>

      <!-- Central Search / Hub Platform -->
      <rect x="90" y="100" width="420" height="260" rx="20" fill="url(#cardGrad)" filter="url(#shadow)"/>
      <rect x="120" y="130" width="220" height="14" rx="7" fill="#E2E8F0"/>
      <rect x="120" y="155" width="140" height="10" rx="5" fill="#F1F5F9"/>

      <!-- Found Badge Floating -->
      <g transform="translate(340, 70)" filter="url(#shadow)">
        <rect width="170" height="50" rx="25" fill="#16A34A" />
        <circle cx="28" cy="25" r="14" fill="#FFFFFF"/>
        <path d="M22 25 L26 29 L35 20" stroke="#16A34A" stroke-width="3" fill="none" stroke-linecap="round"/>
        <text x="54" y="31" font-family="Inter, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF">Found: Wallet</text>
      </g>

      <!-- Lost Badge Floating -->
      <g transform="translate(70, 310)" filter="url(#shadow)">
        <rect width="180" height="50" rx="25" fill="#DC2626" />
        <circle cx="28" cy="25" r="14" fill="#FFFFFF"/>
        <text x="24" y="30" font-family="Inter, sans-serif" font-size="16" font-weight="bold" fill="#DC2626">?</text>
        <text x="54" y="31" font-family="Inter, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF">Lost: ID Card</text>
      </g>

      <!-- Central Item Collage inside platform -->
      <!-- Backpack -->
      <rect x="130" y="190" width="70" height="90" rx="14" fill="#1E293B"/>
      <rect x="145" y="220" width="40" height="40" rx="6" fill="#334155"/>
      <circle cx="165" cy="235" r="4" fill="#F8FAFC"/>
      
      <!-- Water Bottle -->
      <rect x="230" y="195" width="34" height="85" rx="10" fill="#2563EB"/>
      <rect x="238" y="180" width="18" height="15" rx="3" fill="#1D4ED8"/>
      
      <!-- Calculator / Tech Device -->
      <rect x="290" y="200" width="60" height="80" rx="10" fill="#0F172A"/>
      <rect x="300" y="210" width="40" height="20" rx="4" fill="#A7F3D0"/>
      <circle cx="305" cy="245" r="4" fill="#64748B"/>
      <circle cx="320" cy="245" r="4" fill="#64748B"/>
      <circle cx="335" cy="245" r="4" fill="#64748B"/>

      <!-- Keys -->
      <g transform="translate(385, 210)">
        <circle cx="25" cy="20" r="15" fill="none" stroke="#F59E0B" stroke-width="5"/>
        <rect x="23" y="35" width="6" height="40" fill="#D97706" rx="3"/>
        <rect x="29" y="55" width="10" height="5" fill="#D97706" rx="2"/>
        <rect x="29" y="65" width="8" height="5" fill="#D97706" rx="2"/>
      </g>

      <!-- Connecting dotted beam -->
      <path d="M 200 130 Q 300 100 400 130" stroke="#7C3AED" stroke-width="3" stroke-dasharray="6,6" fill="none" opacity="0.6"/>
    </svg>
  `,
  'wallet.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="100%" height="100%">
      <rect width="400" height="280" rx="16" fill="#F8FAFC" />
      <g transform="translate(75, 45)">
        <rect x="0" y="0" width="250" height="180" rx="18" fill="#1E293B" />
        <path d="M0 45 L250 45" stroke="#334155" stroke-width="4" stroke-dasharray="8,6" />
        <rect x="180" y="70" width="70" height="50" rx="10" fill="#0F172A" />
        <circle cx="205" cy="95" r="7" fill="#F59E0B" />
        <rect x="20" y="20" width="70" height="16" rx="4" fill="#334155" />
      </g>
    </svg>
  `,
  'bottle.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="100%" height="100%">
      <rect width="400" height="280" rx="16" fill="#F0F9FF" />
      <g transform="translate(155, 30)">
        <rect x="20" y="0" width="50" height="25" rx="6" fill="#1E40AF" />
        <rect x="30" y="25" width="30" height="15" rx="2" fill="#60A5FA" />
        <rect x="5" y="40" width="80" height="185" rx="20" fill="#2563EB" />
        <path d="M5 80 Q45 95 85 80" stroke="#1D4ED8" stroke-width="4" fill="none" />
        <rect x="25" y="110" width="40" height="40" rx="8" fill="#60A5FA" opacity="0.4" />
        <circle cx="45" cy="130" r="10" fill="#FFFFFF" />
      </g>
    </svg>
  `,
  'id-card.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="100%" height="100%">
      <rect width="400" height="280" rx="16" fill="#FEF2F2" />
      <g transform="translate(85, 35)">
        <rect x="0" y="0" width="230" height="150" rx="14" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="3" />
        <rect x="0" y="0" width="230" height="35" rx="14" fill="#2563EB" />
        <text x="115" y="24" font-family="Inter, sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF" text-anchor="middle">CAMPUS STUDENT ID</text>
        <rect x="20" y="50" width="55" height="70" rx="8" fill="#94A3B8" />
        <circle cx="47" cy="75" r="14" fill="#E2E8F0" />
        <path d="M30 110 C30 96 40 92 47 92 C55 92 65 96 65 110" fill="#E2E8F0" />
        <rect x="90" y="55" width="110" height="12" rx="4" fill="#1E293B" />
        <rect x="90" y="75" width="90" height="8" rx="4" fill="#64748B" />
        <rect x="90" y="90" width="70" height="8" rx="4" fill="#94A3B8" />
        <rect x="90" y="110" width="120" height="15" rx="3" fill="#E2E8F0" />
        <!-- Lanyard slot -->
        <rect x="100" y="-12" width="30" height="14" rx="4" fill="#64748B" />
      </g>
    </svg>
  `,
  'calculator.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="100%" height="100%">
      <rect width="400" height="280" rx="16" fill="#F8FAFC" />
      <g transform="translate(130, 25)">
        <rect x="0" y="0" width="140" height="210" rx="16" fill="#1E293B" />
        <rect x="15" y="20" width="110" height="40" rx="6" fill="#A7F3D0" />
        <text x="115" y="48" font-family="monospace" font-size="20" font-weight="bold" fill="#065F46" text-anchor="end">3.14159</text>
        <rect x="15" y="75" width="110" height="115" rx="6" fill="#334155" />
        <!-- Button grid -->
        <circle cx="35" cy="95" r="8" fill="#F59E0B" />
        <circle cx="70" cy="95" r="8" fill="#64748B" />
        <circle cx="105" cy="95" r="8" fill="#64748B" />
        <circle cx="35" cy="125" r="8" fill="#64748B" />
        <circle cx="70" cy="125" r="8" fill="#64748B" />
        <circle cx="105" cy="125" r="8" fill="#64748B" />
        <circle cx="35" cy="155" r="8" fill="#64748B" />
        <circle cx="70" cy="155" r="8" fill="#64748B" />
        <circle cx="105" cy="155" r="8" fill="#2563EB" />
      </g>
    </svg>
  `,
  'earbuds.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="100%" height="100%">
      <rect width="400" height="280" rx="16" fill="#F1F5F9" />
      <g transform="translate(135, 45)">
        <rect x="0" y="20" width="130" height="140" rx="35" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="4" />
        <rect x="15" y="50" width="100" height="70" rx="20" fill="#FFFFFF" />
        <circle cx="65" cy="135" r="5" fill="#10B981" />
        <!-- Earbud tops showing -->
        <ellipse cx="45" cy="20" rx="14" ry="18" fill="#FFFFFF" stroke="#94A3B8" stroke-width="3" />
        <ellipse cx="85" cy="20" rx="14" ry="18" fill="#FFFFFF" stroke="#94A3B8" stroke-width="3" />
      </g>
    </svg>
  `,
  'notebook.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="100%" height="100%">
      <rect width="400" height="280" rx="16" fill="#FFFBEB" />
      <g transform="translate(115, 35)">
        <rect x="20" y="0" width="160" height="200" rx="10" fill="#F59E0B" />
        <rect x="40" y="0" width="135" height="195" rx="6" fill="#FFFFFF" />
        <!-- Spiral rings -->
        <circle cx="20" cy="30" r="7" fill="#64748B" />
        <circle cx="20" cy="70" r="7" fill="#64748B" />
        <circle cx="20" cy="110" r="7" fill="#64748B" />
        <circle cx="20" cy="150" r="7" fill="#64748B" />
        <circle cx="20" cy="180" r="7" fill="#64748B" />
        <!-- Ruled lines -->
        <line x1="55" y1="45" x2="160" y2="45" stroke="#E2E8F0" stroke-width="3" />
        <line x1="55" y1="75" x2="160" y2="75" stroke="#E2E8F0" stroke-width="3" />
        <line x1="55" y1="105" x2="160" y2="105" stroke="#E2E8F0" stroke-width="3" />
        <line x1="55" y1="135" x2="140" y2="135" stroke="#E2E8F0" stroke-width="3" />
      </g>
    </svg>
  `,
  'charger.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="100%" height="100%">
      <rect width="400" height="280" rx="16" fill="#F8FAFC" />
      <g transform="translate(100, 40)">
        <rect x="20" y="30" width="100" height="90" rx="14" fill="#FFFFFF" stroke="#94A3B8" stroke-width="4" />
        <rect x="0" y="55" width="20" height="12" rx="2" fill="#64748B" />
        <rect x="0" y="85" width="20" height="12" rx="2" fill="#64748B" />
        <!-- Braided wire -->
        <path d="M 120 75 C 170 75, 170 140, 210 140 C 230 140, 240 120, 240 100" stroke="#CBD5E1" stroke-width="8" stroke-linecap="round" fill="none" />
        <rect x="230" y="85" width="20" height="30" rx="5" fill="#64748B" />
        <rect x="236" y="70" width="8" height="15" rx="2" fill="#94A3B8" />
      </g>
    </svg>
  `,
  'backpack.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="100%" height="100%">
      <rect width="400" height="280" rx="16" fill="#F1F5F9" />
      <g transform="translate(125, 25)">
        <path d="M 30 50 Q 75 10 120 50 L 135 190 Q 75 205 15 190 Z" fill="#1E293B" />
        <rect x="35" y="90" width="80" height="85" rx="12" fill="#334155" />
        <path d="M 50 115 L 100 115" stroke="#F59E0B" stroke-width="3" stroke-linecap="round" />
        <path d="M 55 25 Q 75 5 95 25" stroke="#475569" stroke-width="8" fill="none" stroke-linecap="round" />
        <rect x="65" y="130" width="20" height="10" rx="3" fill="#64748B" />
      </g>
    </svg>
  `,
  'keys.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="100%" height="100%">
      <rect width="400" height="280" rx="16" fill="#FEF3C7" />
      <g transform="translate(130, 40)">
        <circle cx="50" cy="50" r="30" fill="none" stroke="#D97706" stroke-width="10" />
        <!-- Key 1 -->
        <g transform="rotate(40 50 50)">
          <rect x="45" y="75" width="12" height="90" rx="4" fill="#F59E0B" />
          <rect x="57" y="125" width="16" height="10" rx="2" fill="#F59E0B" />
          <rect x="57" y="145" width="12" height="10" rx="2" fill="#F59E0B" />
        </g>
        <!-- Key 2 -->
        <g transform="rotate(-30 50 50)">
          <rect x="45" y="75" width="12" height="80" rx="4" fill="#B45309" />
          <rect x="33" y="115" width="12" height="10" rx="2" fill="#B45309" />
          <rect x="33" y="135" width="14" height="10" rx="2" fill="#B45309" />
        </g>
        <!-- Fob -->
        <rect x="80" y="25" width="45" height="30" rx="8" fill="#DC2626" />
        <circle cx="102" cy="40" r="6" fill="#FFFFFF" />
      </g>
    </svg>
  `,
  'spectacles.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="100%" height="100%">
      <rect width="400" height="280" rx="16" fill="#EFF6FF" />
      <g transform="translate(80, 70)">
        <!-- Glasses Case in background -->
        <rect x="10" y="-30" width="220" height="90" rx="25" fill="#78350F" opacity="0.2"/>
        <!-- Glasses -->
        <circle cx="65" cy="50" r="40" fill="#E0F2FE" stroke="#0F172A" stroke-width="8" />
        <circle cx="175" cy="50" r="40" fill="#E0F2FE" stroke="#0F172A" stroke-width="8" />
        <path d="M 105 45 Q 120 35 135 45" stroke="#0F172A" stroke-width="8" fill="none" stroke-linecap="round" />
        <!-- Temples -->
        <path d="M 25 50 L 5 20" stroke="#0F172A" stroke-width="6" stroke-linecap="round" />
        <path d="M 215 50 L 235 20" stroke="#0F172A" stroke-width="6" stroke-linecap="round" />
      </g>
    </svg>
  `,
  'umbrella.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="100%" height="100%">
      <rect width="400" height="280" rx="16" fill="#F0FDFA" />
      <g transform="translate(100, 30)">
        <!-- Umbrella Canopy -->
        <path d="M 10 110 Q 100 10 190 110 Q 145 95 100 110 Q 55 95 10 110 Z" fill="#0D9488" />
        <!-- Ribs -->
        <path d="M 100 10 L 100 110" stroke="#115E59" stroke-width="2" />
        <path d="M 100 10 Q 70 60 55 110" stroke="#115E59" stroke-width="2" fill="none" />
        <path d="M 100 10 Q 130 60 145 110" stroke="#115E59" stroke-width="2" fill="none" />
        <!-- Shaft & Handle -->
        <line x1="100" y1="110" x2="100" y2="180" stroke="#78350F" stroke-width="6" />
        <path d="M 100 180 Q 100 205 120 205 Q 135 205 135 190" stroke="#78350F" stroke-width="6" fill="none" stroke-linecap="round" />
      </g>
    </svg>
  `,
  'usb.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="100%" height="100%">
      <rect width="400" height="280" rx="16" fill="#F8FAFC" />
      <g transform="translate(110, 60)">
        <rect x="0" y="30" width="60" height="60" rx="4" fill="#CBD5E1" stroke="#94A3B8" stroke-width="3" />
        <rect x="15" y="45" width="12" height="12" rx="2" fill="#475569" />
        <rect x="35" y="45" width="12" height="12" rx="2" fill="#475569" />
        <rect x="55" y="20" width="120" height="80" rx="16" fill="#DC2626" />
        <rect x="80" y="35" width="70" height="50" rx="8" fill="#B91C1C" />
        <!-- Red lanyard ring -->
        <circle cx="160" cy="60" r="8" fill="#F8FAFC" />
      </g>
    </svg>
  `,
  'watch.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="100%" height="100%">
      <rect width="400" height="280" rx="16" fill="#F5F3FF" />
      <g transform="translate(145, 20)">
        <!-- Strap -->
        <rect x="25" y="0" width="60" height="235" rx="8" fill="#64748B" />
        <!-- Watch Face -->
        <circle cx="55" cy="115" r="50" fill="#064E3B" stroke="#CBD5E1" stroke-width="8" />
        <circle cx="55" cy="115" r="3" fill="#F59E0B" />
        <line x1="55" y1="115" x2="55" y2="85" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" />
        <line x1="55" y1="115" x2="80" y2="115" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" />
        <!-- Tick marks -->
        <circle cx="55" cy="73" r="2" fill="#FFFFFF" />
        <circle cx="55" cy="157" r="2" fill="#FFFFFF" />
        <circle cx="13" cy="115" r="2" fill="#FFFFFF" />
        <circle cx="97" cy="115" r="2" fill="#FFFFFF" />
      </g>
    </svg>
  `,
  'textbook.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="100%" height="100%">
      <rect width="400" height="280" rx="16" fill="#F0FDF4" />
      <g transform="translate(110, 25)">
        <rect x="15" y="10" width="160" height="210" rx="10" fill="#047857" />
        <rect x="25" y="10" width="145" height="205" rx="6" fill="#065F46" />
        <rect x="40" y="35" width="115" height="70" rx="6" fill="#FFFFFF" />
        <text x="97" y="65" font-family="Inter, sans-serif" font-size="14" font-weight="bold" fill="#065F46" text-anchor="middle">ALGORITHMS</text>
        <text x="97" y="85" font-family="Inter, sans-serif" font-size="10" fill="#64748B" text-anchor="middle">4th Edition • CLRS</text>
        <line x1="25" y1="10" x2="25" y2="215" stroke="#F59E0B" stroke-width="4" />
      </g>
    </svg>
  `,
  'earphones.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="100%" height="100%">
      <rect width="400" height="280" rx="16" fill="#F8FAFC" />
      <g transform="translate(90, 40)">
        <circle cx="40" cy="50" r="18" fill="#1E293B" />
        <rect x="35" y="65" width="10" height="25" rx="4" fill="#334155" />
        <circle cx="180" cy="50" r="18" fill="#1E293B" />
        <rect x="175" y="65" width="10" height="25" rx="4" fill="#334155" />
        <!-- Cord merging into Y-split -->
        <path d="M 40 90 C 40 130, 95 130, 110 160" stroke="#475569" stroke-width="4" fill="none" />
        <path d="M 180 90 C 180 130, 125 130, 110 160" stroke="#475569" stroke-width="4" fill="none" />
        <rect x="105" y="155" width="10" height="15" rx="2" fill="#1E293B" />
        <path d="M 110 170 L 110 205" stroke="#475569" stroke-width="4" />
      </g>
    </svg>
  `,
  'jacket.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="100%" height="100%">
      <rect width="400" height="280" rx="16" fill="#EFF6FF" />
      <g transform="translate(95, 30)">
        <path d="M 40 40 L 75 10 L 135 10 L 170 40 L 195 90 L 165 105 L 150 75 L 150 200 L 60 200 L 60 75 L 45 105 L 15 90 Z" fill="#1D4ED8" />
        <path d="M 105 10 L 105 200" stroke="#1E40AF" stroke-width="4" />
        <!-- Pockets and collar -->
        <polygon points="75,10 105,60 90,65 65,20" fill="#2563EB" />
        <polygon points="135,10 105,60 120,65 145,20" fill="#2563EB" />
        <rect x="70" y="80" width="25" height="30" rx="4" fill="#1E40AF" />
        <rect x="115" y="80" width="25" height="30" rx="4" fill="#1E40AF" />
      </g>
    </svg>
  `,
};

Object.entries(svgs).forEach(([filename, content]) => {
  fs.writeFileSync(path.join(dir, filename), content.trim());
});

console.log('Successfully generated SVGs:', Object.keys(svgs).length);

