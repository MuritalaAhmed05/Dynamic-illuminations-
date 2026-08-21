import { db } from '../firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  setDoc,
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Solar Power' | 'Architectural Lighting' | 'Smart Home' | 'Event Lighting' | 'Commercial Setup';
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  galleryImages: string[];
  videoUrls: string[];
  clientName: string;
  specs: {
    inverterCapacity: string;
    solarPanels: string;
    batteryBank: string;
    location: string;
    completionDate: string;
  };
  createdAt?: any;
}

const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: '15 kVA Solar Installation & Smart Lighting',
    category: 'Solar Power',
    shortDescription: 'Integrated 15 kVA hybrid solar inverter system with 16x 550W panels for a luxury villa in Lekki, Lagos.',
    fullDescription: `
### ⚡ Engineering Overview
Dynamic Illuminations engineered a high-capacity 15 kVA hybrid solar power and architectural lighting system for a modern residential estate in Lekki.

### 🛠️ Key Technical Highlights
- **15 kVA Pure Sine Wave Inverter** with dual MPPT charge controllers.
- **16x 550W Monocrystalline Solar Panels** mounted on high-tilt roof rails.
- **2x 48V 200Ah Lithium-ion LiFePO4 Battery Banks** delivering over 12 hours of full continuous backup.
- Integrated smart ambient outdoor garden lighting with automated photocell sensors.

### 💡 Performance & Client Savings
Slashing grid energy bills by over 80% with 24/7 seamless zero-downtime power.
`.trim(),
    coverImage: '/images/panel1.jpg',
    galleryImages: ['/images/panel1.jpg', '/images/panel2.jpg', '/images/panel3.jpg', '/images/battery1.jpg'],
    videoUrls: ['/VID-20241108-WA0026.mp4', '/VID-20241108-WA0027.mp4'],
    clientName: 'Luxury Estate Villa',
    specs: {
      inverterCapacity: '15 kVA Hybrid System',
      solarPanels: '16x 550W Panels (8.8 kW)',
      batteryBank: '2x 48V 200Ah Lithium',
      location: 'Lekki Phase 1, Lagos',
      completionDate: 'Oct 2024',
    },
  },
  {
    id: 'proj-2',
    title: '10 kVA Commercial Solar Farm & Office Backup',
    category: 'Commercial Setup',
    shortDescription: '10 kVA solar backup system powering 30+ office workstations, air conditioners, and server racks in Ikeja.',
    fullDescription: `
### ⚡ Commercial Engineering Overview
Designed for zero-downtime office productivity. This commercial setup powers desktop computers, central servers, lighting, and air conditioning throughout power outages.

### 🛠️ Technical Specifications Breakdown
- **10 kVA High-Efficiency Inverter** with automatic generator integration.
- **12x 550W Tier-1 Solar Panels**.
- **15 kWh Lithium Battery Storage**.
- Slash monthly diesel generator fuel bills by 85%.
`.trim(),
    coverImage: '/images/panel6.jpg',
    galleryImages: ['/images/panel6.jpg', '/images/panel4.jpg', '/images/inverters.jpg'],
    videoUrls: ['/VID-20241108-WA0029.mp4'],
    clientName: 'Apex Corporate HQ',
    specs: {
      inverterCapacity: '10 kVA Commercial Inverter',
      solarPanels: '12x 550W Panels (6.6 kW)',
      batteryBank: '15 kWh Lithium Storage',
      location: 'Ikeja Industrial Zone, Lagos',
      completionDate: 'Nov 2024',
    },
  },
  {
    id: 'proj-3',
    title: 'High-Impact Event Stage & Architectural Lighting',
    category: 'Event Lighting',
    shortDescription: 'Custom dynamic stage lighting, mood uplighting, and truss rigging for a 500-guest corporate gala in Victoria Island.',
    fullDescription: `
### 💡 Event Production Overview
Provided complete end-to-end event lighting design for a high-profile corporate gala. Features computerized DMX moving head beams, wireless LED tube uplights, and custom gobos.
`.trim(),
    coverImage: '/images/panel4.jpg',
    galleryImages: ['/images/panel4.jpg', '/images/image11.jpg', '/images/inverter.jpg'],
    videoUrls: ['/VID-20241108-WA0030.mp4'],
    clientName: 'Eko Hotel Convention Center',
    specs: {
      inverterCapacity: 'Mobile Sound & Light Power',
      solarPanels: 'High-CRI LED Fixtures',
      batteryBank: 'Pure Sine Mobile Generators',
      location: 'Victoria Island, Lagos',
      completionDate: 'Dec 2024',
    },
  },
  {
    id: 'proj-4',
    title: 'Smart Home Automation & CCTV Surveillance',
    category: 'Smart Home',
    shortDescription: 'Complete IP CCTV camera setup, remote app lighting automation, and smart door lock access control.',
    fullDescription: `
### ⚡ Smart Home Integration Overview
Automated lighting scenes and 4K Ultra-HD security surveillance integrated with mobile remote access for a high-end duplex in Ikoyi.
`.trim(),
    coverImage: '/images/neat.jpg',
    galleryImages: ['/images/neat.jpg', '/images/battery.jpg'],
    videoUrls: ['/VID-20241108-WA0031.mp4'],
    clientName: 'Ikoyi Smart Duplex',
    specs: {
      inverterCapacity: '5 kVA Smart Inverter',
      solarPanels: '8x 550W Solar Panels',
      batteryBank: '10 kWh Lithium Battery',
      location: 'Ikoyi, Lagos',
      completionDate: 'Jan 2025',
    },
  },
];

const LOCAL_STORAGE_KEY = 'di_projects_local_store_v1';

function getLocalProjects(): ProjectItem[] | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch (e) {
    return null;
  }
}

function saveLocalProjects(items: ProjectItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
}

export async function getProjectsFromFirestore(): Promise<ProjectItem[]> {
  // Always query Firestore first to get global data shared across all users/browsers!
  try {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const firestoreItems: ProjectItem[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          title: data.title || 'Untitled Project',
          category: data.category || 'Solar Power',
          shortDescription: data.shortDescription || '',
          fullDescription: data.fullDescription || '',
          coverImage: data.coverImage || '/images/panel1.jpg',
          galleryImages: data.galleryImages || [],
          videoUrls: data.videoUrls || [],
          clientName: data.clientName || 'Private Client',
          specs: data.specs || {
            inverterCapacity: '10 kVA',
            solarPanels: '12x 550W',
            batteryBank: 'Lithium Storage',
            location: 'Lagos, Nigeria',
            completionDate: 'Recent',
          },
        };
      });

      saveLocalProjects(firestoreItems);
      return firestoreItems;
    }
  } catch (error) {
    console.warn('Firestore fetch info, using local store/fallback:', error);
  }

  const localList = getLocalProjects();
  if (localList && localList.length > 0) {
    return localList;
  }

  saveLocalProjects(DEFAULT_PROJECTS);
  return DEFAULT_PROJECTS;
}

export async function getProjectByIdFromFirestore(id: string): Promise<ProjectItem | null> {
  try {
    const docRef = doc(db, 'projects', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        title: data.title || 'Untitled Project',
        category: data.category || 'Solar Power',
        shortDescription: data.shortDescription || '',
        fullDescription: data.fullDescription || '',
        coverImage: data.coverImage || '/images/panel1.jpg',
        galleryImages: data.galleryImages || [],
        videoUrls: data.videoUrls || [],
        clientName: data.clientName || 'Private Client',
        specs: data.specs || {
          inverterCapacity: '10 kVA',
          solarPanels: '12x 550W',
          batteryBank: 'Lithium Storage',
          location: 'Lagos, Nigeria',
          completionDate: 'Recent',
        },
      };
    }
  } catch (error) {
    console.error('Error fetching project by id:', error);
  }

  const currentList = await getProjectsFromFirestore();
  return currentList.find((p) => p.id === id) || null;
}

export async function createProjectInFirestore(project: Omit<ProjectItem, 'id'>): Promise<string> {
  const newId = `proj-${Date.now()}`;
  const newProjectItem: ProjectItem = {
    id: newId,
    ...project,
  };

  // 1. Try Firestore with custom doc or addDoc
  try {
    const docRef = doc(db, 'projects', newId);
    await setDoc(docRef, {
      ...project,
      createdAt: serverTimestamp(),
    });
  } catch (e) {
    console.warn('Firestore setDoc warning:', e);
    try {
      const added = await addDoc(collection(db, 'projects'), {
        ...project,
        createdAt: serverTimestamp(),
      });
      newProjectItem.id = added.id;
    } catch (err) {
      console.warn('Firestore addDoc fallback warning:', err);
    }
  }

  // 2. Update Local Storage Sync
  const current = getLocalProjects() || DEFAULT_PROJECTS;
  const updated = [newProjectItem, ...current];
  saveLocalProjects(updated);

  return newProjectItem.id;
}

export async function updateProjectInFirestore(id: string, project: Partial<ProjectItem>): Promise<void> {
  // 1. Try Firestore
  try {
    const docRef = doc(db, 'projects', id);
    await updateDoc(docRef, { ...project });
  } catch (e) {
    console.warn('Firestore update error:', e);
    try {
      const docRef = doc(db, 'projects', id);
      await setDoc(docRef, { ...project }, { merge: true });
    } catch (err) {
      console.warn('Firestore merge error:', err);
    }
  }

  // 2. Update Local Storage Sync
  const current = getLocalProjects() || DEFAULT_PROJECTS;
  const updated = current.map((item) => (item.id === id ? { ...item, ...project } : item));
  saveLocalProjects(updated);
}

export async function deleteProjectFromFirestore(id: string): Promise<void> {
  // 1. Try Firestore
  try {
    const docRef = doc(db, 'projects', id);
    await deleteDoc(docRef);
  } catch (e) {
    console.warn('Firestore delete offline/fallback:', e);
  }

  // 2. Update Local Storage Sync
  const current = getLocalProjects() || DEFAULT_PROJECTS;
  const updated = current.filter((item) => item.id !== id);
  saveLocalProjects(updated);
}
