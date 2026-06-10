import React from 'react';
import { FileText } from 'lucide-react';

const TimelinePanel = ({ timeline = [] }) => {
  return (
    <div className="timeline-card">
      <div className="timeline-list">
        {timeline.map((item, index) => (
          <div key={item.id || index} className="timeline-item">
            <div className="timeline-dot active">
              <FileText size={8} />
            </div>
            <div className="timeline-content">
              <div className="timeline-header">
                <span>
                  {item.status} | <span className="timeline-ref">{item.referenceNumber}</span>
                </span>
              </div>
              <div className="timeline-title">{item.title}</div>
              <div className="timeline-time">
                <span style={{ fontWeight: '600' }}>{item.date}</span>
                <span>|</span>
                <span>{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelinePanel;
