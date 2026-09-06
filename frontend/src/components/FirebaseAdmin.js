import React, { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';

/**
 * FirebaseAdmin Component
 * Full admin panel — only accessible after admin login.
 * Allows adding, editing, and deleting quiz questions.
 */
const FirebaseAdmin = ({ onClose }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'add' | 'edit'
  const [editingQuestion, setEditingQuestion] = useState(null);

  // Form state for add/edit
  const emptyForm = {
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    category: 'Cybersecurity',
    difficulty: 'Easy'
  };
  const [form, setForm] = useState(emptyForm);

  // Load questions on mount
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, 'questions'));
      const qs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setQuestions(qs);
    } catch (err) {
      setMessage(`Error loading questions: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle option change in form
  const handleOptionChange = (index, value) => {
    const updated = [...form.options];
    updated[index] = value;
    setForm({ ...form, options: updated });
  };

  // Validate form before saving
  const validateForm = () => {
    if (!form.question.trim()) return 'Question text is required.';
    for (let i = 0; i < 4; i++) {
      if (!form.options[i].trim()) return `Option ${i + 1} is required.`;
    }
    if (!form.correctAnswer.trim()) return 'Please select the correct answer.';
    if (!form.options.includes(form.correctAnswer)) return 'Correct answer must match one of the options.';
    return null;
  };

  // Add new question
  const handleAddQuestion = async (e) => {
    e.preventDefault();
    const err = validateForm();
    if (err) { setMessage(err); return; }

    try {
      setLoading(true);
      setMessage('');
      await addDoc(collection(db, 'questions'), {
        question: form.question.trim(),
        options: form.options.map(o => o.trim()),
        correctAnswer: form.correctAnswer.trim(),
        category: form.category,
        difficulty: form.difficulty,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      setMessage('✅ Question added successfully!');
      setForm(emptyForm);
      await fetchQuestions();
      setActiveTab('list');
    } catch (err) {
      setMessage(`❌ Error adding question: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Start editing a question
  const handleEditStart = (q) => {
    setEditingQuestion(q.id);
    setForm({
      question: q.question || q.questionText || '',
      options: q.options || ['', '', '', ''],
      correctAnswer: q.correctAnswer || '',
      category: q.category || 'Cybersecurity',
      difficulty: q.difficulty || 'Easy'
    });
    setActiveTab('edit');
    setMessage('');
  };

  // Save edited question
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    const err = validateForm();
    if (err) { setMessage(err); return; }

    try {
      setLoading(true);
      setMessage('');
      await updateDoc(doc(db, 'questions', editingQuestion), {
        question: form.question.trim(),
        options: form.options.map(o => o.trim()),
        correctAnswer: form.correctAnswer.trim(),
        category: form.category,
        difficulty: form.difficulty,
        updatedAt: Timestamp.now()
      });
      setMessage('✅ Question updated successfully!');
      setEditingQuestion(null);
      setForm(emptyForm);
      await fetchQuestions();
      setActiveTab('list');
    } catch (err) {
      setMessage(`❌ Error updating question: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Delete a question
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this question? This cannot be undone.')) return;
    try {
      setLoading(true);
      await deleteDoc(doc(db, 'questions', id));
      setMessage('✅ Question deleted.');
      await fetchQuestions();
    } catch (err) {
      setMessage(`❌ Error deleting: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelForm = () => {
    setForm(emptyForm);
    setEditingQuestion(null);
    setMessage('');
    setActiveTab('list');
  };

  // Shared form for add and edit
  const renderForm = (isEdit) => (
    <form onSubmit={isEdit ? handleSaveEdit : handleAddQuestion}>
      <div className="admin-section">
        <h3>{isEdit ? 'Edit Question' : 'Add New Question'}</h3>

        <div className="form-group" style={{ marginBottom: '12px' }}>
          <label className="form-label">Question Text</label>
          <textarea
            className="form-input"
            rows={3}
            value={form.question}
            onChange={e => setForm({ ...form, question: e.target.value })}
            placeholder="Enter question text"
            style={{ resize: 'vertical' }}
          />
        </div>

        {[0, 1, 2, 3].map(i => (
          <div className="form-group" key={i} style={{ marginBottom: '10px' }}>
            <label className="form-label">Option {i + 1}</label>
            <input
              type="text"
              className="form-input"
              value={form.options[i]}
              onChange={e => handleOptionChange(i, e.target.value)}
              placeholder={`Option ${i + 1}`}
            />
          </div>
        ))}

        <div className="form-group" style={{ marginBottom: '12px' }}>
          <label className="form-label">Correct Answer</label>
          <select
            className="form-input"
            value={form.correctAnswer}
            onChange={e => setForm({ ...form, correctAnswer: e.target.value })}
          >
            <option value="">-- Select correct option --</option>
            {form.options.map((opt, i) =>
              opt.trim() ? <option key={i} value={opt.trim()}>{opt.trim()}</option> : null
            )}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Category</label>
            <input
              type="text"
              className="form-input"
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
            />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Difficulty</label>
            <select
              className="form-input"
              value={form.difficulty}
              onChange={e => setForm({ ...form, difficulty: e.target.value })}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        {message && (
          <div className={`admin-message ${message.startsWith('✅') ? 'success' : 'error'}`} style={{ marginBottom: '12px' }}>
            {message}
          </div>
        )}

        <div className="button-group">
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? 'Saving...' : (isEdit ? 'Save Changes' : 'Add Question')}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCancelForm}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <div className="firebase-admin-overlay">
      <div className="firebase-admin-modal" style={{ maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="admin-header">
          <h2>⚙️ Admin Panel</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', padding: '12px 20px', borderBottom: '1px solid #333' }}>
          <button
            className={`btn ${activeTab === 'list' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '6px 16px' }}
            onClick={() => { setActiveTab('list'); setMessage(''); }}
          >
            Questions ({questions.length})
          </button>
          <button
            className={`btn ${activeTab === 'add' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '6px 16px' }}
            onClick={() => { setForm(emptyForm); setActiveTab('add'); setMessage(''); }}
          >
            + Add Question
          </button>
        </div>

        <div className="admin-content">
          {/* List Tab */}
          {activeTab === 'list' && (
            <div className="admin-section">
              <h3>All Questions</h3>
              {loading && <p>Loading...</p>}
              {!loading && questions.length === 0 && (
                <p>No questions found. Use "Add Question" to get started.</p>
              )}
              {message && !activeTab.includes('add') && (
                <div className={`admin-message ${message.startsWith('✅') ? 'success' : 'error'}`} style={{ marginBottom: '12px' }}>
                  {message}
                </div>
              )}
              {questions.map((q, idx) => (
                <div key={q.id} style={{
                  background: '#1a1a2e',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '10px'
                }}>
                  <p style={{ margin: '0 0 6px', fontWeight: 'bold' }}>
                    {idx + 1}. {q.question || q.questionText}
                  </p>
                  <ul style={{ margin: '0 0 6px', paddingLeft: '18px', fontSize: '13px', color: '#aaa' }}>
                    {(q.options || []).map((opt, i) => (
                      <li key={i} style={{ color: opt === q.correctAnswer ? '#4ade80' : '#aaa' }}>
                        {opt} {opt === q.correctAnswer ? '✓' : ''}
                      </li>
                    ))}
                  </ul>
                  <span style={{ fontSize: '12px', color: '#666' }}>{q.category} · {q.difficulty}</span>
                  <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '13px' }} onClick={() => handleEditStart(q)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" style={{ padding: '4px 12px', fontSize: '13px' }} onClick={() => handleDelete(q.id)} disabled={loading}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Tab */}
          {activeTab === 'add' && renderForm(false)}

          {/* Edit Tab */}
          {activeTab === 'edit' && renderForm(true)}
        </div>

        <div className="admin-footer">
          <p>Logged in as Admin · Changes apply immediately</p>
        </div>
      </div>
    </div>
  );
};

export default FirebaseAdmin;
