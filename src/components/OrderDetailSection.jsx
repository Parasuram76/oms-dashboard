import React from 'react';
import { FileText } from 'lucide-react';

const OrderDetailSection = ({ details }) => {
  if (!details) return null;

  return (
    <section className="section-card" aria-labelledby="order-detail-title">
      <div className="section-card-header">
        <h2 id="order-detail-title" className="section-title">Order Detail</h2>
        <div className="section-icon-badge" style={{ color: '#3b82f6' }}>
          <FileText size={15} />
        </div>
      </div>
      <div className="section-card-content">
        <div className="kv-grid">
          <div className="kv-item">
            <span className="kv-label">Plant</span>
            <span className="kv-value">{details.plant}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Sales District</span>
            <span className="kv-value">{details.salesDistrict}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Distribution Channel</span>
            <span className="kv-value">{details.distributionChannel}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Sales Document Type</span>
            <span className="kv-value">{details.salesDocumentType}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Sales Organisation</span>
            <span className="kv-value">{details.salesOrganisation}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Division</span>
            <span className="kv-value">{details.division}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Incoterm</span>
            <span className="kv-value">{details.incoterm}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Payment Term</span>
            <span className="kv-value">{details.paymentTerm}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetailSection;
