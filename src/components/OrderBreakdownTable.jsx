import React, { useState } from 'react';
import { Package, HelpCircle } from 'lucide-react';
import StatusBadge from './StatusBadge';

const OrderBreakdownTable = ({ items = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredItems = items.filter(item => 
    item.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.uom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (!sortField) return 0;
    
    let valA = a[sortField];
    let valB = b[sortField];
    
    if (valA === '--') valA = '';
    if (valB === '--') valB = '';

    if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <section className="section-card" aria-labelledby="order-breakdown-title">
      <div className="section-card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', justifyContent: 'space-between' }}>
          <h2 id="order-breakdown-title" className="section-title">Order Breakdown</h2>
          
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input 
              type="text" 
              placeholder="Search table items..." 
              className="comment-textarea"
              style={{ minHeight: 'auto', height: '28px', padding: '4px 8px', fontSize: '11px', width: '160px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="section-icon-badge" style={{ color: '#b45309' }}>
              <Package size={15} />
            </div>
          </div>
        </div>
      </div>
      <div className="section-card-content" style={{ padding: 0 }}>
        <div className="table-wrapper">
          <table className="breakdown-table">
            <thead>
              <tr>
                <th style={{ cursor: 'pointer' }} onClick={() => handleSort('material')}>Material</th>
                <th style={{ cursor: 'pointer' }} onClick={() => handleSort('requestedQuantity')}>Requested quantity</th>
                <th style={{ cursor: 'pointer' }} onClick={() => handleSort('scheduledQuantity')}>Scheduled quantity</th>
                <th style={{ cursor: 'pointer' }} onClick={() => handleSort('confirmedQuantity')}>Confirmed quality</th>
                <th style={{ cursor: 'pointer' }} onClick={() => handleSort('extraQuantity')}>Extra quantity</th>
                <th style={{ cursor: 'pointer' }} onClick={() => handleSort('uom')}>UOM</th>
                <th style={{ cursor: 'pointer' }} onClick={() => handleSort('timestamp')}>Timestamp</th>
                <th style={{ 
                  backgroundColor: 'var(--color-orange)', 
                  color: '#ffffff', 
                  textAlign: 'center', 
                  borderTopRightRadius: '4px',
                  borderBottomLeftRadius: '4px',
                  fontWeight: '600',
                  padding: '8px'
                }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedItems.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '24px', color: 'var(--text-secondary)' }}>
                    No breakdown items found.
                  </td>
                </tr>
              ) : (
                sortedItems.map((item) => {
                  const [datePart, timePart] = item.timestamp.split(/(?=\d{2}:\d{2}\s[ap]m)/);
                  
                  return (
                    <tr key={item.id}>
                      <td style={{ 
                        borderLeft: '4px solid #10b981', 
                        paddingLeft: '12px' 
                      }}>
                        <div className="material-cell">
                          <div style={{
                            width: '24px',
                            height: '24px',
                            backgroundColor: '#ffedd5',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#b45309'
                          }}>
                            <Package size={12} />
                          </div>
                          <span>{item.material}</span>
                        </div>
                      </td>
                      <td>{item.requestedQuantity}</td>
                      <td>{item.scheduledQuantity}</td>
                      <td>{item.confirmedQuantity}</td>
                      <td>{item.extraQuantity}</td>
                      <td>{item.uom}</td>
                      <td>
                        <div className="timestamp-cell">
                          <span className="timestamp-date">{datePart.trim()}</span>
                          <span className="timestamp-time">{timePart ? timePart.trim() : ''}</span>
                        </div>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <StatusBadge status={item.status} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default OrderBreakdownTable;
