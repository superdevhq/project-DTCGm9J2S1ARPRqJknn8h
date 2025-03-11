
import { create } from 'zustand';
import { TextureType } from './useStore';

interface InventoryItem {
  type: TextureType;
  count: number;
}

interface InventoryState {
  items: Record<TextureType, InventoryItem>;
  selectedSlot: number;
  addItem: (type: TextureType, count?: number) => void;
  removeItem: (type: TextureType, count?: number) => void;
  selectSlot: (slot: number) => void;
  getSelectedItem: () => TextureType | null;
}

// Default inventory with some starter blocks
const DEFAULT_INVENTORY: Record<TextureType, InventoryItem> = {
  dirt: { type: 'dirt', count: 64 },
  grass: { type: 'grass', count: 64 },
  glass: { type: 'glass', count: 64 },
  wood: { type: 'wood', count: 64 },
  log: { type: 'log', count: 64 },
};

// Create the inventory store
export const useInventory = create<InventoryState>((set, get) => ({
  // Start with default inventory
  items: DEFAULT_INVENTORY,
  
  // Start with first slot selected
  selectedSlot: 0,
  
  // Add items to inventory
  addItem: (type, count = 1) => {
    set((state) => {
      const newItems = { ...state.items };
      
      if (newItems[type]) {
        newItems[type] = {
          ...newItems[type],
          count: newItems[type].count + count,
        };
      } else {
        newItems[type] = { type, count };
      }
      
      return { items: newItems };
    });
  },
  
  // Remove items from inventory
  removeItem: (type, count = 1) => {
    set((state) => {
      const newItems = { ...state.items };
      
      if (newItems[type]) {
        const newCount = Math.max(0, newItems[type].count - count);
        
        if (newCount === 0) {
          // If we're out of this item, set count to 0 but keep the entry
          newItems[type] = { ...newItems[type], count: 0 };
        } else {
          newItems[type] = { ...newItems[type], count: newCount };
        }
      }
      
      return { items: newItems };
    });
  },
  
  // Select an inventory slot (0-8)
  selectSlot: (slot) => {
    set({ selectedSlot: Math.min(Math.max(0, slot), 8) });
  },
  
  // Get the currently selected item type
  getSelectedItem: () => {
    const state = get();
    const slotToTextureMap: TextureType[] = ['dirt', 'grass', 'glass', 'wood', 'log'];
    const selectedType = slotToTextureMap[state.selectedSlot] || 'dirt';
    
    // Only return the type if we have at least one of this item
    return state.items[selectedType]?.count > 0 ? selectedType : null;
  },
}));
