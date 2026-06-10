import React, { useState } from 'react';
import { 
  Box, 
  FolderClosed, 
  Compass, 
  Cpu, 
  ShoppingBag, 
  Warehouse, 
  Boxes, 
  Globe,
  Tag
} from 'lucide-react';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Orders');

  const menuItems = [
    { id: 'Dashboard', icon: <Box size={22} style={{ color: '#ef4444' }} />, label: 'Dashboard' },
    { id: 'Orders', icon: <FolderClosed size={22} style={{ color: '#f97316' }} />, label: 'Orders' },
    { id: 'Production', icon: <Compass size={22} style={{ color: '#0ea5e9' }} />, label: 'Production' },
    { id: 'Inventory', icon: <Cpu size={22} style={{ color: '#10b981' }} />, label: 'Inventory' },
    { id: 'Delivery', icon: <ShoppingBag size={22} style={{ color: '#f43f5e' }} />, label: 'Delivery' },
    { id: 'Warehouse', icon: <Warehouse size={22} style={{ color: '#8b5cf6' }} />, label: 'Warehouse' },
    { id: 'Logistics', icon: <Boxes size={22} style={{ color: '#b45309' }} />, label: 'Logistics' },
    { id: 'Settings', icon: <Globe size={22} style={{ color: '#10b981' }} />, label: 'Settings' },
    { id: 'Promotions', icon: <Tag size={22} style={{ color: '#d97706' }} />, label: 'Promotions' }
  ];

  return (
    <aside className="sidebar">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`sidebar-item ${activeItem === item.id ? 'active' : ''}`}
          onClick={() => setActiveItem(item.id)}
          title={item.label}
        >
          {item.icon}
          <span className="sidebar-tooltip">{item.label}</span>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
