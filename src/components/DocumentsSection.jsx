import React from 'react';
import { FileText, Download, Eye, Paperclip } from 'lucide-react';

const DocumentsSection = ({ documents = [], onAction }) => {
  return (
    <section className="section-card" aria-labelledby="documents-title">
      <div className="section-card-header">
        <h2 id="documents-title" className="section-title">Order Documents</h2>
        <div className="section-icon-badge" style={{ color: '#ef4444' }}>
          <Paperclip size={15} />
        </div>
      </div>
      <div className="section-card-content">
        <div className="documents-grid">
          {documents.map((doc) => (
            <div key={doc.id} className="doc-card">
              <div className="doc-info">
                <FileText size={32} className="doc-icon" />
                <div>
                  <div className="doc-name">{doc.name}</div>
                  <div className="doc-meta">
                    {doc.size} • Created {doc.date}
                  </div>
                </div>
              </div>
              <div className="doc-actions">
                <button 
                  className="doc-btn" 
                  onClick={() => onAction('view', doc.name)}
                  title="View PDF document"
                >
                  <Eye size={12} style={{ marginRight: '4px', display: 'inline', verticalAlign: 'middle' }} />
                  View
                </button>
                <button 
                  className="doc-btn" 
                  onClick={() => onAction('download', doc.name)}
                  title="Download PDF document"
                >
                  <Download size={12} style={{ marginRight: '4px', display: 'inline', verticalAlign: 'middle' }} />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DocumentsSection;
