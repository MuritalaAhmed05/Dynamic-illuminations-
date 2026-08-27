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

export async function getProjectsFromFirestore(): Promise<ProjectItem[]> {
  // Clear any legacy project data cached in local storage if present
  if (typeof window !== 'undefined') {
    localStorage.removeItem('di_projects_local_store_v1');
  }

  try {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          title: data.title || 'Untitled Project',
          category: data.category || 'Solar Power',
          shortDescription: data.shortDescription || '',
          fullDescription: data.fullDescription || '',
          coverImage: data.coverImage || '',
          galleryImages: data.galleryImages || [],
          videoUrls: data.videoUrls || [],
          clientName: data.clientName || 'Private Client',
          specs: data.specs || {
            inverterCapacity: '',
            solarPanels: '',
            batteryBank: '',
            location: '',
            completionDate: '',
          },
        };
      });
    }
  } catch (error) {
    console.error('Error fetching projects from Cloud Firestore:', error);
  }

  return [];
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
        coverImage: data.coverImage || '',
        galleryImages: data.galleryImages || [],
        videoUrls: data.videoUrls || [],
        clientName: data.clientName || 'Private Client',
        specs: data.specs || {
          inverterCapacity: '',
          solarPanels: '',
          batteryBank: '',
          location: '',
          completionDate: '',
        },
      };
    }
  } catch (error) {
    console.error('Error fetching project by id from Cloud Firestore:', error);
  }

  return null;
}

export async function createProjectInFirestore(project: Omit<ProjectItem, 'id'>): Promise<string> {
  const newId = `proj-${Date.now()}`;
  try {
    const docRef = doc(db, 'projects', newId);
    await setDoc(docRef, {
      ...project,
      createdAt: serverTimestamp(),
    });
    return newId;
  } catch (e) {
    console.warn('Firestore setDoc notice, using addDoc fallback:', e);
    const added = await addDoc(collection(db, 'projects'), {
      ...project,
      createdAt: serverTimestamp(),
    });
    return added.id;
  }
}

export async function updateProjectInFirestore(id: string, project: Partial<ProjectItem>): Promise<void> {
  try {
    const docRef = doc(db, 'projects', id);
    await updateDoc(docRef, { ...project });
  } catch (e) {
    console.warn('Firestore updateDoc notice, using merge fallback:', e);
    const docRef = doc(db, 'projects', id);
    await setDoc(docRef, { ...project }, { merge: true });
  }
}

export async function deleteProjectFromFirestore(id: string): Promise<void> {
  const docRef = doc(db, 'projects', id);
  await deleteDoc(docRef);
}
