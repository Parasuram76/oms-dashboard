import React, { useState, useEffect } from 'react';
import TopNavbar from '../components/TopNavbar';
import Sidebar from '../components/Sidebar';
import OrderHeader from '../components/OrderHeader';
import OrderSummary from '../components/OrderSummary';
import TimelinePanel from '../components/TimelinePanel';
import TabNavigation from '../components/TabNavigation';
import OrderDetailSection from '../components/OrderDetailSection';
import OrderBreakdownTable from '../components/OrderBreakdownTable';
import CustomerDetailSection from '../components/CustomerDetailSection';
import DocumentsSection from '../components/DocumentsSection';
import CommentSection from '../components/CommentSection';
import SearchModal from '../components/SearchModal';
import Loader from '../components/Loader';

import {
  getOrderData,
  saveOrderStatus,
  getOrderDetails,
  getOrderItems,
  getCustomerData,
  getTimelineData,
  getDocuments,
  getComments,
  addComment,
  updateComment,
  deleteComment
} from '../services/orderService';

const Dashboard = ({ theme, toggleTheme }) => {
  const [activeTab, setActiveTab] = useState('detail');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Data States
  const [order, setOrder] = useState(null);
  const [details, setDetails] = useState(null);
  const [items, setItems] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [comments, setComments] = useState([]);
  
  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Load Data
  const loadDashboardData = () => {
    try {
      setOrder(getOrderData());
      setDetails(getOrderDetails());
      setItems(getOrderItems());
      setCustomer(getCustomerData());
      setTimeline(getTimelineData());
      setDocuments(getDocuments());
      setComments(getComments());
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Could not load order details from service.');
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Handler: Change Status
  const handleStatusChange = (newStatus) => {
    setIsLoading(true);
    setTimeout(() => {
      saveOrderStatus(newStatus);
      setOrder(prev => prev ? { ...prev, status: newStatus } : null);
      
      // Also update matching item statuses to align
      setItems(prevItems => 
        prevItems.map(item => ({ ...item, status: newStatus === 'In Process' ? 'Pending' : newStatus }))
      );
      
      setIsLoading(false);
    }, 500);
  };

  // Handler: Refresh
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      loadDashboardData();
      setIsLoading(false);
    }, 1000);
  };

  // Handler: Action Dropdown Trigger
  const handleAction = (action, meta = '') => {
    if (action === 'refresh') {
      handleRefresh();
    } else if (action === 'print') {
      window.print();
    } else if (action === 'export') {
      // Export current dashboard state as JSON file download
      const stateToExport = { order, details, items, customer, timeline, comments, theme };
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(stateToExport, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `order_${order?.orderId || 'export'}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } else if (action === 'download') {
      alert(`Initiating download for data file: ${meta || 'Order_Breakdown.csv'}`);
    } else if (action === 'view') {
      alert(`Viewing file: ${meta}`);
    }
  };

  // Comment Handlers
  const handleAddComment = (text) => {
    const updated = addComment(text, 'User Profile');
    setComments(updated);
  };

  const handleUpdateComment = (id, newText) => {
    const updated = updateComment(id, newText);
    setComments(updated);
  };

  const handleDeleteComment = (id) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      const updated = deleteComment(id);
      setComments(updated);
    }
  };

  // Render content according to the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'detail':
        return (
          <>
            <OrderDetailSection details={details} />
            <OrderBreakdownTable items={items} />
            <CustomerDetailSection customer={customer} />
          </>
        );
      case 'offers':
        return (
          <div className="section-card">
            <div className="section-card-header">
              <h2 className="section-title">Offers & Coupons</h2>
            </div>
            <div className="section-card-content">
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                No active promotional offers or loyalty coupons applied to this sales order.
              </p>
            </div>
          </div>
        );
      case 'module':
        return (
          <div className="section-card">
            <div className="section-card-header">
              <h2 className="section-title">Production Module Registry</h2>
            </div>
            <div className="section-card-content">
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Allocated Modules: Assembly Line A, Quality Assurance Lab 2.
              </p>
            </div>
          </div>
        );
      case 'stock':
        return (
          <div className="section-card">
            <div className="section-card-header">
              <h2 className="section-title">Stock Reservation</h2>
            </div>
            <div className="section-card-content">
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Stock reserve allocated in Warehouse Room 4. Batch Reference No: RES-9821.
              </p>
            </div>
          </div>
        );
      case 'documents':
        return (
          <DocumentsSection 
            documents={documents} 
            onAction={handleAction} 
          />
        );
      case 'info':
        return (
          <div className="section-card">
            <div className="section-card-header">
              <h2 className="section-title">Extended Information</h2>
            </div>
            <div className="section-card-content">
              <div className="kv-grid">
                <div className="kv-item">
                  <span className="kv-label">Sales Representative</span>
                  <span className="kv-value">Arun Verma</span>
                </div>
                <div className="kv-item">
                  <span className="kv-label">Currency</span>
                  <span className="kv-value">INR (Indian Rupee)</span>
                </div>
                <div className="kv-item">
                  <span className="kv-label">Freight Carrier</span>
                  <span className="kv-value">LogiExpress Logistics</span>
                </div>
                <div className="kv-item">
                  <span className="kv-label">Tax Category</span>
                  <span className="kv-value">GST 18%</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'comment':
        return (
          <CommentSection
            comments={comments}
            onAddComment={handleAddComment}
            onUpdateComment={handleUpdateComment}
            onDeleteComment={handleDeleteComment}
          />
        );
      case 'timeline':
        return (
          <div className="section-card">
            <div className="section-card-header">
              <h2 className="section-title">Standalone Order Timeline</h2>
            </div>
            <div className="section-card-content">
              <TimelinePanel timeline={timeline} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (error) {
    return (
      <div className="error-container">
        <h2 className="error-title">Something went wrong</h2>
        <p className="error-msg">{error}</p>
        <button className="btn-primary" onClick={loadDashboardData}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <TopNavbar 
        onSearchClick={() => setIsSearchOpen(true)} 
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <div className="main-layout">
        <Sidebar />
        <main className="content-container">
          {order && (
            <OrderHeader
              orderId={order.orderId}
              status={order.status}
              onStatusChange={handleStatusChange}
              onRefresh={handleRefresh}
              onAction={handleAction}
            />
          )}

          {isLoading ? (
            <Loader message="Synchronizing dashboard records..." />
          ) : (
            <div className="dashboard-grid">
              {/* Left Column Summary & Timeline */}
              <div className="left-panel-column">
                <OrderSummary data={order} />
                <TimelinePanel timeline={timeline} />
              </div>

              {/* Right Column Tabs & Sections */}
              <div className="right-panel-column">
                <TabNavigation 
                  activeTab={activeTab} 
                  onTabChange={setActiveTab} 
                />
                <div className="tab-contents">
                  {renderTabContent()}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;
