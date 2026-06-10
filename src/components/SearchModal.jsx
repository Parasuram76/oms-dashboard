import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { getOrderItems, getTimelineData, getOrderData } from '../services/orderService';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ items: [], timeline: [], order: null });
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // focus input
      setTimeout(() => {
        const input = modalRef.current?.querySelector('input');
        input?.focus();
      }, 50);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ items: [], timeline: [], order: null });
      return;
    }

    const items = getOrderItems();
    const timeline = getTimelineData();
    const order = getOrderData();

    const lowerQuery = query.toLowerCase();

    const matchedItems = items.filter(
      item => item.material.toLowerCase().includes(lowerQuery) || 
              item.uom.toLowerCase().includes(lowerQuery)
    );

    const matchedTimeline = timeline.filter(
      t => t.title.toLowerCase().includes(lowerQuery) || 
           t.referenceNumber.toLowerCase().includes(lowerQuery)
    );

    const matchedOrder = order.orderNumber.toLowerCase().includes(lowerQuery) || 
                          order.material.toLowerCase().includes(lowerQuery) ? order : null;

    setResults({
      items: matchedItems,
      timeline: matchedTimeline,
      order: matchedOrder
    });
  }, [query]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const hasResults = results.items.length > 0 || results.timeline.length > 0 || results.order;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" ref={modalRef}>
        <div className="modal-header">
          <Search size={18} className="text-secondary" />
          <input
            type="text"
            className="modal-search-input"
            placeholder="Search Order No, Material or timeline entries..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">
          {query.trim() === '' ? (
            <p className="no-results">Type something to search the order records...</p>
          ) : !hasResults ? (
            <p className="no-results">No matches found for "{query}"</p>
          ) : (
            <>
              {results.order && (
                <div className="search-results-section">
                  <h4 className="search-results-title">Order Info</h4>
                  <div className="search-result-item" onClick={onClose}>
                    <div className="search-result-title">Order No: {results.order.orderNumber}</div>
                    <div className="search-result-subtitle">Material: {results.order.material} - Status: {results.order.status}</div>
                  </div>
                </div>
              )}

              {results.items.length > 0 && (
                <div className="search-results-section">
                  <h4 className="search-results-title">Materials & Items</h4>
                  {results.items.map(item => (
                    <div key={item.id} className="search-result-item" onClick={onClose}>
                      <div className="search-result-title">{item.material}</div>
                      <div className="search-result-subtitle">Requested Qty: {item.requestedQuantity} | Scheduled: {item.scheduledQuantity}</div>
                    </div>
                  ))}
                </div>
              )}

              {results.timeline.length > 0 && (
                <div className="search-results-section">
                  <h4 className="search-results-title">Timeline Milestones</h4>
                  {results.timeline.map(t => (
                    <div key={t.id} className="search-result-item" onClick={onClose}>
                      <div className="search-result-title">{t.title}</div>
                      <div className="search-result-subtitle">Ref: {t.referenceNumber} | {t.date} {t.time}</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
