
import { DIVERSIPEDIA_CATEGORIES } from './constants'; // Renamed from RESOURCE_CATEGORIES

export interface NavItem {
  name: string;
  href: string;
}

export interface ValueCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface ProjectContentSection {
  id: string; 
  title: string; 
  content: string; 
}

export interface Project {
  id: string;
  title: string;
  imageUrl: string;
  summary: string;
  fullContent: ProjectContentSection[]; 
  tags: string[];
  date: string; 
}


const diversipediaCategoryIds = DIVERSIPEDIA_CATEGORIES.map(cat => cat.id);
export type DiversipediaCategoryId = typeof diversipediaCategoryIds[number];


export interface DiversipediaItem { // Renamed from CommunityResource
  id: string;
  title: string;
  imageUrl?: string; 
  summary: string;
  fullContent: ProjectContentSection[];
  tags: string[];
  date: string; 
  category: DiversipediaCategoryId; // Renamed
}
