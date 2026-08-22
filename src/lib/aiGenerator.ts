export interface ProjectTemplateOutput {
  title: string;
  category: 'Solar Power' | 'Architectural Lighting' | 'Smart Home' | 'Event Lighting' | 'Commercial Setup';
  shortDescription: string;
  fullDescription: string;
  specs: {
    inverterCapacity: string;
    solarPanels: string;
    batteryBank: string;
    location: string;
    completionDate: string;
  };
}

// Technical Project Specification Template Generator
export function generateProjectTemplate(rawPrompt: string): ProjectTemplateOutput {
  const prompt = rawPrompt.toLowerCase();

  let category: 'Solar Power' | 'Architectural Lighting' | 'Smart Home' | 'Event Lighting' | 'Commercial Setup' = 'Solar Power';
  if (prompt.includes('light') || prompt.includes('lamp') || prompt.includes('chandelier') || prompt.includes('facade')) {
    category = 'Architectural Lighting';
  } else if (prompt.includes('event') || prompt.includes('wedding') || prompt.includes('stage') || prompt.includes('party')) {
    category = 'Event Lighting';
  } else if (prompt.includes('smart') || prompt.includes('automation') || prompt.includes('cctv') || prompt.includes('home')) {
    category = 'Smart Home';
  } else if (prompt.includes('commercial') || prompt.includes('office') || prompt.includes('mall') || prompt.includes('factory')) {
    category = 'Commercial Setup';
  }

  // Extract or estimate numbers
  const kvaMatch = prompt.match(/(\d+(?:\.\d+)?)\s*(?:kva|kw)/i);
  const kvaVal = kvaMatch ? kvaMatch[1] : '10';

  const panelMatch = prompt.match(/(\d+)\s*(?:panels?|pcs)/i);
  const panelVal = panelMatch ? panelMatch[1] : '16';

  const locationMatch = prompt.match(/(?:in|at)\s+([a-zA-Z\s]+)/i);
  const locVal = locationMatch ? locationMatch[1].trim() : 'Lekki Phase 1, Lagos';

  // Capitalize title
  const cleanTitlePrompt = rawPrompt
    .replace(/(?:in|at)\s+[a-zA-Z\s]+/i, '')
    .replace(/(\d+(?:\.\d+)?)\s*(?:kva|kw)/i, '')
    .trim();

  const title = cleanTitlePrompt
    ? `${cleanTitlePrompt.charAt(0).toUpperCase() + cleanTitlePrompt.slice(1)} (${kvaVal} kVA System)`
    : `${kvaVal} kVA Hybrid Solar & Smart Lighting Installation`;

  const shortDescription = `Engineered and installed a high-efficiency ${kvaVal} kVA solar power system featuring ${panelVal}x 550W Tier-1 panels and Lithium storage in ${locVal}. Guaranteed 24/7 uninterrupted clean energy.`;

  const fullDescription = `
### ⚡ Engineering Overview
Dynamic Illuminations engineered and executed a comprehensive ${kvaVal} kVA hybrid solar power solution in **${locVal}**. The project was specifically designed to handle continuous high-surge electrical loads including air conditioners, refrigerators, water borehole pumps, and architectural lighting arrays.

### 🛠️ Key Technical Specifications & Components
- **Inverter Capacity**: ${kvaVal} kVA Pure Sine Wave Inverter with dual MPPT charge controllers and integrated grid-surge protection.
- **Solar Panel Array**: ${panelVal}x 550W Tier-1 Monocrystalline Solar Panels mounted with heavy-duty aluminum rail racking.
- **Battery Energy Storage**: 48V 200Ah Lithium Iron Phosphate (LiFePO4) battery bank providing deep-cycle backup duration.
- **Safety Protection**: DC/AC surge arresters, automatic changeover switch, and certified heavy-gauge copper wiring.

### 💡 Project Performance & Impact
- **Zero-Downtime Guarantee**: Delivers uninterrupted 24/7 electricity during grid outages.
- **Fuel Bill Reduction**: Slashes monthly diesel generator fuel expenses by over 80%.
- **Smart App Monitoring**: Real-time remote tracking of daily solar production and battery charge state.
`.trim();

  return {
    title,
    category,
    shortDescription,
    fullDescription,
    specs: {
      inverterCapacity: `${kvaVal} kVA Hybrid System`,
      solarPanels: `${panelVal}x 550W Panels`,
      batteryBank: `48V 200Ah Lithium LiFePO4`,
      location: locVal.charAt(0).toUpperCase() + locVal.slice(1),
      completionDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    },
  };
}

// Alias for backwards compatibility
export const generateProjectContentWithAI = generateProjectTemplate;
export type AIProjectOutput = ProjectTemplateOutput;

