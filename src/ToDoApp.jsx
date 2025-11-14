import React, { useState, useEffect } from 'react';

const ToDoApp = ({ onBackToDashboard, user }) => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [editPriority, setEditPriority] = useState('medium');
  const [sortBy, setSortBy] = useState('date'); // 'date', 'priority', 'status'
  
  // Extract user ID from user object
  const userId = user?.id || user?.uid?.replace('user-', '') || '1'; // Fallback to '1' for testing
  
  // API Base URL
  const API_BASE = 'https://cdsback-backend.onrender.com';

  // Priority configuration
  const priorities = {
    high: { label: 'High', emoji: '🔴', color: 'text-red-600', bg: 'bg-red-100', order: 3 },
    medium: { label: 'Medium', emoji: '🟡', color: 'text-yellow-600', bg: 'bg-yellow-100', order: 2 },
    low: { label: 'Low', emoji: '🟢', color: 'text-green-600', bg: 'bg-green-100', order: 1 }
  };

  // Sort tasks based on selected criteria
  const sortTasks = (tasks) => {
    return [...tasks].sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          return (priorities[b.priority]?.order || 0) - (priorities[a.priority]?.order || 0);
        case 'status':
          if (a.completed !== b.completed) {
            return a.completed ? 1 : -1; // Incomplete tasks first
          }
          return (priorities[b.priority]?.order || 0) - (priorities[a.priority]?.order || 0);
        case 'date':
        default:
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0); // Newest first
      }
    });
  };

  // Load tasks when component mounts
  useEffect(() => {
    loadTasks();
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Load tasks from backend
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(`${API_BASE}/tasks/${userId}`);
      const data = await response.json();
      
      if (data.success) {
        setTodos(data.tasks);
        console.log('✅ Tasks loaded:', data.tasks.length);
      } else {
        setError('Failed to load tasks');
      }
    } catch (err) {
      console.error('❌ Error loading tasks:', err);
      setError('Unable to connect to server');
    } finally {
      setLoading(false);
    }
  };

  // Add new task to backend
  const addTodo = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    console.log('🔄 Attempting to add task:', { userId, text: input.trim(), API_BASE });

    try {
      const response = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          text: input.trim(),
          priority: priority
        })
      });

      console.log('🌐 Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('📦 Response data:', data);
      
      if (data.success) {
        setTodos([data.task, ...todos]);
        setInput('');
        setPriority('medium');
        console.log('✅ Task added successfully:', data.task);
      } else {
        setError(data.error || 'Failed to add task');
        console.error('❌ Server returned error:', data.error);
      }
    } catch (err) {
      console.error('❌ Network/Fetch error:', err);
      setError(`Unable to add task: ${err.message}`);
    }
  };

  // Remove task from backend
  const removeTodo = async (taskId, idx) => {
    try {
      const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      
      if (data.success) {
        setTodos(todos.filter((_, i) => i !== idx));
        console.log('✅ Task deleted:', taskId);
      } else {
        setError(data.error || 'Failed to delete task');
      }
    } catch (err) {
      console.error('❌ Error deleting task:', err);
      setError('Unable to delete task');
    }
  };

  // Toggle task completion in backend
  const toggleComplete = async (taskId, idx, currentStatus) => {
    try {
      const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !currentStatus
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setTodos(
          todos.map((todo, i) =>
            i === idx ? { ...todo, completed: !currentStatus } : todo
          )
        );
        console.log('✅ Task completion toggled:', taskId);
      } else {
        setError(data.error || 'Failed to update task status');
      }
    } catch (err) {
      console.error('❌ Error toggling completion:', err);
      setError('Unable to update task status');
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
    setEditPriority('medium');
  };

  // Save edited task to backend
    // Start editing a task
    const startEdit = (taskId, text, currentPriority) => {
      setEditingId(taskId);
      setEditText(text);
      setEditPriority(currentPriority || 'medium');
    };
  const saveEdit = async (taskId, idx) => {
    if (!editText.trim()) return;

    try {
      const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: editText.trim(),
          priority: editPriority
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setTodos(
          todos.map((todo, i) =>
            i === idx ? { ...todo, text: editText.trim(), priority: editPriority } : todo
          )
        );
        setEditingId(null);
        setEditText('');
        setEditPriority('medium');
        console.log('✅ Task updated:', data.task);
      } else {
        setError(data.error || 'Failed to update task');
      }
    } catch (err) {
      console.error('❌ Error updating task:', err);
      setError('Unable to update task');
    }
  };

  // Clear error message after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    // Outer container: Uses soft gray-50 background and flex column to push the footer down
    <div className="min-h-screen bg-gray-50 flex flex-col p-0">
      
      {/* 1. STYLED, FULL-WIDTH HEADER (Deep Slate Gray) */}
      <header className="w-full bg-slate-800 p-4 shadow-xl">
        <div className="flex items-center justify-between">
          {/* Spacer to balance the layout */}
          <div className="flex space-x-2 opacity-0 pointer-events-none">
            <button className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg text-xs">Welcome</button>
            <button className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg text-xs">Dashboard</button>
            <button className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg text-xs">Logout</button>
            <button className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg text-xs">Login</button>
          </div>
          
          <h1 className="text-3xl font-extrabold text-white text-center tracking-wider">
            Cassandra's Digital Solutions
          </h1>
          
          {/* Header Navigation Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={onBackToDashboard}
              className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md transition-colors text-xs"
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to logout?')) {
                  window.location.href = '/';
                }
              }}
              className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md transition-colors text-xs"
            >
              Logout
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md transition-colors text-xs"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA: Uses flex-grow to take up all available vertical space */}
      <div className="flex flex-col items-center w-full px-4 py-8 flex-grow"> 

        {/* Logo Section - Enhanced (moved above card) */}
        <div className="mb-6 text-center">
          <div className="relative inline-block">
            <div className="w-40 h-40 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-300 border-2 border-white">
              <span className="text-white font-bold text-4xl tracking-wider">CDS</span>
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-amber-400 opacity-20 animate-ping"></div>
          </div>
        </div>
        {/* 2. RESPONSIVE Todo List Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-xs sm:max-w-md md:max-w-lg transition-all duration-300 border border-gray-100">
          
          <h2 className="text-xl font-bold text-slate-800 mb-4 text-center border-b pb-2 border-gray-100">
            {user?.firstName ? `${user.firstName}'s` : "Cassandra's"} Digital Task Manager
          </h2>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
              <p className="mt-2 text-gray-600">Thanks for Waiting I'm Thinking...</p>
            </div>
          )}

          {/* Add Todo Form */}
          {!loading && (
            <div className="mb-4">
              <form onSubmit={addTodo} className="flex mb-3">
                <input
                  className="flex-1 border border-gray-300 rounded-l-xl px-4 py-2 text-gray-800 text-base focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-500 transition duration-150"
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Enter new task or action item..."
                  aria-label="New Task Input"
                />
                <select
                  value={priority}
                  onChange={e => setPriority(e.target.value)}
                  className="border border-gray-300 border-l-0 px-3 py-2 text-gray-800 bg-white focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-500 transition duration-150"
                >
                  <option value="high">🔴 High</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="low">🟢 Low</option>
                </select>
                <button
                  type="submit"
                  className="bg-amber-500 text-slate-900 text-sm font-bold px-5 py-2 rounded-r-xl hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 transition duration-150"
                  disabled={!input.trim()}
                >
                  Add
                </button>
              </form>
              
              {/* Sort Options */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 font-medium">Sort by:</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSortBy('date')}
                    className={`px-3 py-1 rounded-full transition ${
                      sortBy === 'date' 
                        ? 'bg-amber-500 text-slate-900 font-semibold' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Date
                  </button>
                  <button
                    onClick={() => setSortBy('priority')}
                    className={`px-3 py-1 rounded-full transition ${
                      sortBy === 'priority' 
                        ? 'bg-amber-500 text-slate-900 font-semibold' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Priority
                  </button>
                  <button
                    onClick={() => setSortBy('status')}
                    className={`px-3 py-1 rounded-full transition ${
                      sortBy === 'status' 
                        ? 'bg-amber-500 text-slate-900 font-semibold' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Status
                  </button>
                </div>
              </div>
            </div>
          )}          {/* Todo List */}
          {!loading && (
            <ul className="divide-y divide-gray-100 space-y-2">
              {sortTasks(todos).map((todo, idx) => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-amber-50 transition duration-150"
                >
                  {editingId === todo.id ? (
                    // Edit mode
                    <div className="flex-1 flex items-center space-x-2">
                      <input 
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-1 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            saveEdit(todo.id, idx);
                          } else if (e.key === 'Escape') {
                            cancelEdit();
                          }
                        }}
                        autoFocus
                      />
                      <select
                        value={editPriority}
                        onChange={(e) => setEditPriority(e.target.value)}
                        className="border border-gray-300 rounded-lg px-2 py-1 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500"
                      >
                        <option value="high">🔴 High</option>
                        <option value="medium">🟡 Medium</option>
                        <option value="low">🟢 Low</option>
                      </select>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => saveEdit(todo.id, idx)}
                          className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                          title="Save Changes"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-gray-500 text-white text-xs font-semibold px-2 py-1 rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                          title="Cancel Edit"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View mode
                    <>
                      <div className="flex-1 flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          priorities[todo.priority] ? priorities[todo.priority].bg + ' ' + priorities[todo.priority].color : 'bg-gray-100 text-gray-600'
                        }`}>
                          {priorities[todo.priority]?.emoji || '⚪'} {priorities[todo.priority]?.label || 'None'}
                        </span>
                        <span className={`text-base font-medium transition duration-150 ${todo.completed ? 'line-through text-gray-500' : 'text-slate-800'}`}>
                          {todo.text}
                        </span>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleComplete(todo.id, idx, todo.completed)}
                          className={`text-white text-xs font-semibold px-3 py-1 rounded-full transition ${
                            todo.completed 
                              ? 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-300' 
                              : 'bg-slate-600 hover:bg-slate-700 focus:ring-slate-300'
                          } focus:outline-none focus:ring-2`}
                          title={todo.completed ? "Mark as Incomplete" : "Mark as Complete"}
                        >
                          {todo.completed ? 'Uncomplete' : 'Complete'}
                        </button>
                        
                        <button
                          onClick={() => startEdit(todo.id, todo.text, todo.priority)}
                          className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                          title="Edit Task"
                          disabled={todo.completed}
                        >
                          Edit
                        </button>
                        
                        <button
                          onClick={() => removeTodo(todo.id, idx)}
                          className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
                          title="Remove Task Permanently"
                        >
                          Remove
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
          
          {/* Empty State */}
          {!loading && todos.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg">No tasks yet!</p>
              <p className="text-sm">Add your first task above to get started.</p>
            </div>
          )}
        </div>
        {/* Task Counter */}
        {!loading && todos.length > 0 && (
          <p className="text-gray-600 text-sm mt-4 font-semibold">
            Tasks Remaining: {todos.filter(t => !t.completed).length} / Total Tasks: {todos.length}
          </p>
        )}
      </div>

      {/* 3. FOOTER: Matches the header using deep slate gray */}
      <footer className="w-full bg-slate-800 p-4 shadow-xl mt-auto">
        <p className="text-gray-300 text-center text-sm font-medium">
          &copy; 2025 Cassandra's Digital Solutions. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ToDoApp;