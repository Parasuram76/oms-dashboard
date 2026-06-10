import React, { useState } from 'react';
import { MessageSquare, Edit2, Trash2, Check, X } from 'lucide-react';

const CommentSection = ({ comments = [], onAddComment, onUpdateComment, onDeleteComment }) => {
  const [newCommentText, setNewCommentText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    onAddComment(newCommentText);
    setNewCommentText('');
  };

  const handleStartEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const handleSaveEdit = (id) => {
    if (!editingText.trim()) return;
    onUpdateComment(id, editingText);
    setEditingId(null);
    setEditingText('');
  };

  return (
    <section className="section-card" aria-labelledby="comments-section-title">
      <div className="section-card-header">
        <h2 id="comments-section-title" className="section-title">Order Discussion & Remarks</h2>
        <div className="section-icon-badge" style={{ color: '#8b5cf6' }}>
          <MessageSquare size={15} />
        </div>
      </div>
      <div className="section-card-content">
        <div className="comments-container">
          {/* Add Comment Form */}
          <form className="comment-form" onSubmit={handleSubmit}>
            <div className="comment-input-wrapper">
              <textarea
                className="comment-textarea"
                placeholder="Post a new update or remark..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                rows={3}
                required
              />
              <button type="submit" className="comment-submit-btn">
                Post comment
              </button>
            </div>
          </form>

          {/* Comment List */}
          <div className="comment-list">
            {comments.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '13px', padding: '16px' }}>
                No comments or updates yet. Be the first to add one!
              </p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="comment-card">
                  <div className="comment-header">
                    <span className="comment-author">{comment.author}</span>
                    <div className="comment-meta">
                      <span className="comment-time">{comment.timestamp}</span>
                      <div className="comment-actions">
                        {editingId === comment.id ? (
                          <>
                            <button 
                              className="comment-action-btn" 
                              onClick={() => handleSaveEdit(comment.id)}
                              title="Save Edit"
                              style={{ color: '#10b981' }}
                            >
                              <Check size={14} />
                            </button>
                            <button 
                              className="comment-action-btn" 
                              onClick={() => setEditingId(null)}
                              title="Cancel Edit"
                              style={{ color: '#ef4444' }}
                            >
                              <X size={14} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              className="comment-action-btn" 
                              onClick={() => handleStartEdit(comment.id, comment.text)}
                              title="Edit Comment"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button 
                              className="comment-action-btn" 
                              onClick={() => onDeleteComment(comment.id)}
                              title="Delete Comment"
                              style={{ color: '#ef4444' }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {editingId === comment.id ? (
                    <textarea
                      className="comment-textarea"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      rows={2}
                      style={{ marginTop: '4px' }}
                    />
                  ) : (
                    <p className="comment-text">{comment.text}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommentSection;
