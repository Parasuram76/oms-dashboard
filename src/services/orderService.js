import orderData from '../mock/order.json';
import orderDetailsData from '../mock/orderDetails.json';
import itemsData from '../mock/items.json';
import customerData from '../mock/customer.json';
import timelineData from '../mock/timeline.json';
import documentsData from '../mock/documents.json';
import initialComments from '../mock/comments.json';

// Local storage key for comments
const COMMENTS_KEY = 'oms_dashboard_comments';
const STATUS_KEY = 'oms_dashboard_order_status';

export const getOrderData = () => {
  const savedStatus = localStorage.getItem(STATUS_KEY);
  if (savedStatus) {
    return { ...orderData, status: savedStatus };
  }
  return orderData;
};

export const saveOrderStatus = (status) => {
  localStorage.setItem(STATUS_KEY, status);
};

export const getOrderDetails = () => {
  return orderDetailsData;
};

export const getOrderItems = () => {
  return itemsData;
};

export const getCustomerData = () => {
  return customerData;
};

export const getTimelineData = () => {
  return timelineData;
};

export const getDocuments = () => {
  return documentsData;
};

// Comments State API with localStorage persistence
export const getComments = () => {
  const localComments = localStorage.getItem(COMMENTS_KEY);
  if (localComments) {
    try {
      return JSON.parse(localComments);
    } catch (e) {
      console.error('Failed to parse comments from localStorage', e);
    }
  }
  // Initialize localStorage with initial data
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(initialComments));
  return initialComments;
};

export const saveComments = (comments) => {
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
};

export const addComment = (text, author = 'User') => {
  const comments = getComments();
  const newComment = {
    id: `comment-${Date.now()}`,
    author,
    text,
    timestamp: new Date().toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).replace(',', '')
  };
  const updatedComments = [newComment, ...comments];
  saveComments(updatedComments);
  return updatedComments;
};

export const updateComment = (id, newText) => {
  const comments = getComments();
  const updatedComments = comments.map(comment => {
    if (comment.id === id) {
      return { ...comment, text: newText };
    }
    return comment;
  });
  saveComments(updatedComments);
  return updatedComments;
};

export const deleteComment = (id) => {
  const comments = getComments();
  const updatedComments = comments.filter(comment => comment.id !== id);
  saveComments(updatedComments);
  return updatedComments;
};
