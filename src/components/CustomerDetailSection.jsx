import React from 'react';
import { FileText } from 'lucide-react';

const CustomerDetailSection = ({ customer }) => {
  if (!customer) return null;

  return (
    <section className="section-card" aria-labelledby="customer-detail-title">
      <div className="section-card-header">
        <h2 id="customer-detail-title" className="section-title">Customer Detail</h2>
        <div className="section-icon-badge" style={{ color: '#3b82f6' }}>
          <FileText size={15} />
        </div>
      </div>
      <div className="section-card-content">
        <div className="kv-grid">
          <div className="kv-item">
            <span className="kv-label">Customer Reference</span>
            <span className="kv-value">{customer.customerReference}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Order Created Date</span>
            <span className="kv-value">{customer.orderCreatedDate}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Requested Delivery Date</span>
            <span className="kv-value">{customer.requestedDeliveryDate}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Sold To</span>
            <span className="kv-value">{customer.soldTo}</span>
          </div>
          
          <div className="kv-item" style={{ gridColumn: 'span 1' }}>
            <span className="kv-label">Ship to</span>
            <span className="kv-value">{customer.shipTo}</span>
          </div>
          <div className="kv-item" style={{ gridColumn: 'span 1' }}>
            <span className="kv-label">Billing Address</span>
            <span className="kv-value">{customer.billingAddress}</span>
          </div>
          <div className="kv-item" style={{ gridColumn: 'span 2' }}>
            <span className="kv-label">Shipping Address</span>
            <span className="kv-value">{customer.shippingAddress}</span>
          </div>

          <div className="kv-item">
            <span className="kv-label">Remarks</span>
            <span className="kv-value">{customer.remarks}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerDetailSection;
