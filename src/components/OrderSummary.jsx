import React from 'react';
import StatusBadge from './StatusBadge';

const OrderSummary = ({ data }) => {
  if (!data) return null;

  return (
    <div className="summary-panel-card">
      <div className="summary-item">
        <span className="summary-label">Order number</span>
        <span className="summary-value">{data.orderNumber}</span>
      </div>
      
      <div className="summary-item">
        <span className="summary-label">Material</span>
        <span className="summary-value">{data.material}</span>
      </div>

      <div className="summary-item">
        <span className="summary-label">Total quality</span>
        <span className="summary-value">{data.totalQuantity}</span>
      </div>

      <div className="summary-item">
        <span className="summary-label">Sales organisation</span>
        <span className="summary-value">{data.salesOrganisation}</span>
      </div>

      <div className="summary-item">
        <span className="summary-label">Sales Document Type</span>
        <span className="summary-value">{data.salesDocumentType}</span>
      </div>

      <div className="summary-item">
        <span className="summary-label">Plant</span>
        <span className="summary-value">{data.plant}</span>
      </div>

      <div className="summary-item">
        <span className="summary-label">Delivery date</span>
        <span className="summary-value">{data.deliveryDate}</span>
      </div>

      <div className="summary-item">
        <span className="summary-label">Status</span>
        <div style={{ marginTop: '4px' }}>
          <StatusBadge status={data.status} />
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
