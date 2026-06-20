import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string; // generated as compound key: `${productId}-${size}-${color}`
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  generateWhatsAppLink: (customerName?: string, notes?: string) => string;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      setIsOpen: (isOpen) => set({ isOpen }),
      addItem: (newItem) => {
        const id = `${newItem.productId}-${newItem.size}-${newItem.color}`;
        const existingItems = get().items;
        const existingIndex = existingItems.findIndex((item) => item.id === id);

        if (existingIndex > -1) {
          const updatedItems = [...existingItems];
          updatedItems[existingIndex].quantity += newItem.quantity;
          set({ items: updatedItems });
        } else {
          set({ items: [...existingItems, { ...newItem, id }] });
        }
        // Auto open cart when item is added
        set({ isOpen: true });
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      generateWhatsAppLink: (customerName, notes) => {
        const items = get().items;
        if (items.length === 0) return '';

        // WhatsApp number of the store
        const phoneNumber = "966578078759"; // Default country code 966 for Saudi Arabia

        let message = `*NEW ORDER - NORTH PACIFIC*\n`;
        message += `=========================\n`;
        if (customerName) {
          message += `*Name:* ${customerName}\n`;
        }
        message += `*Date:* ${new Date().toLocaleDateString()}\n\n`;
        message += `*Items Ordered:*\n`;

        items.forEach((item, index) => {
          message += `${index + 1}. *${item.name}*\n`;
          message += `   - Size: ${item.size}\n`;
          message += `   - Color: ${item.color}\n`;
          message += `   - Qty: ${item.quantity}\n`;
          message += `   - Price: ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n\n`;
        });

        message += `-------------------------\n`;
        message += `*Total Order Value:* ₹${get().getTotalPrice().toLocaleString('en-IN')}\n`;
        if (notes) {
          message += `*Customer Note:* ${notes}\n`;
        }
        message += `=========================\n`;
        message += `Please confirm availability and dispatch timeline. Thank you!`;

        const encodedText = encodeURIComponent(message);
        return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedText}`;
      },
    }),
    {
      name: 'north-pacific-cart',
    }
  )
);
