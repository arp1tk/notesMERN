import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { X, Edit, Trash2, Plus, Folder, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL =  'http://localhost:5000/api';

export default function Component() {
  const [notes, setNotes] = useState([]);
  const [expandedNoteId, setExpandedNoteId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', category: '' });
  const [editingNote, setEditingNote] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const authToken = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')).token 
    : null;

  const axiosConfig = {
    headers: { Authorization: `Bearer ${authToken}` }
  };

  const toggleExpand = (id) => {
    setExpandedNoteId(expandedNoteId === id ? null : id);
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}/notes/${id}`, axiosConfig);
      setNotes(notes.filter(note => note._id !== id));
      if (expandedNoteId === id) {
        setExpandedNoteId(null);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      setError(error.response?.data?.message || 'An error occurred while deleting the note');
    }
  };

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/notes`, axiosConfig);
      setNotes(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setError(error.response?.data?.message || 'An error occurred while fetching notes');
      setLoading(false);
    }
  };

  const handleCreateNote = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/notes/create`, newNote, axiosConfig);
      setNotes([...notes, data]);
      setIsModalOpen(false);
      setNewNote({ title: '', content: '', category: '' });
    } catch (error) {
      console.error('Error creating note:', error);
      setError(error.response?.data?.message || 'An error occurred while creating the note');
    }
  };

  const handleUpdateNote = async () => {
    try {
      const { data } = await axios.put(`${API_URL}/notes/${editingNote._id}`, editingNote, axiosConfig);
      setNotes(notes.map(note => note._id === data._id ? data : note));
      setIsModalOpen(false);
      setEditingNote(null);
    } catch (error) {
      console.error('Error updating note:', error);
      setError(error.response?.data?.message || 'An error occurred while updating the note');
    }
  };

  const openEditModal = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (authToken) {
      fetchNotes();
    } else {
      setError('Please log in to view your notes');
      setLoading(false);
    }
  }, [authToken]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="text-red-500 p-4 text-center bg-gray-800 rounded-lg shadow-xl">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-300 p-8 ">
      <motion.div 
        className="flex  mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => {
            setEditingNote(null);
            setNewNote({ title: '', content: '', category: '' });
            setIsModalOpen(true);
          }}
          className="bg-purple-600 px-6 py-3 mt-10 rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Create New Note</span>
        </button>
      </motion.div>

      <motion.div layout className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence>
          {notes.map(note => (
            <motion.div
              key={note._id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-xl shadow-xl overflow-hidden"
            >
              <motion.div 
                className="p-6 cursor-pointer"
                onClick={() => toggleExpand(note._id)}
              >
                <motion.div className="flex justify-between items-start mb-4">
                  <motion.h2 layout="position" className="text-2xl font-bold text-purple-400">
                    {note.title}
                  </motion.h2>
                  <motion.button
                    layout="position"
                    initial={false}
                    animate={{ rotate: expandedNoteId === note._id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-700 rounded-full p-2 hover:bg-gray-600 transition-colors duration-300"
                    aria-label={expandedNoteId === note._id ? "Collapse note" : "Expand note"}
                  >
                    <ChevronDown size={16} />
                  </motion.button>
                </motion.div>

                <motion.p layout="position" className="text-gray-400 mb-2 flex items-center">
                  <Folder size={16} className="mr-2" />
                  {note.category}
                </motion.p>

                <AnimatePresence>
                  {expandedNoteId === note._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <motion.p 
                        className="text-gray-300 mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {note.content}
                      </motion.p>
                      <motion.div 
                        className="flex space-x-4 mt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(note);
                          }}
                          className="bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center space-x-2"
                        >
                          <Edit size={16} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNote(note._id);
                          }}
                          className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300 flex items-center space-x-2"
                        >
                          <Trash2 size={16} />
                          <span>Delete</span>
                        </button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-gray-800 rounded-lg p-6 w-full max-w-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl text-purple-400">
                  {editingNote ? 'Edit Note' : 'Create New Note'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-700 rounded-full p-2 hover:bg-gray-600 transition-colors duration-300"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={editingNote ? editingNote.title : newNote.title}
                  onChange={(e) => editingNote 
                    ? setEditingNote({ ...editingNote, title: e.target.value })
                    : setNewNote({ ...newNote, title: e.target.value })
                  }
                  className="w-full p-2 rounded-lg bg-gray-700 text-gray-300"
                />
                <textarea
                  placeholder="Content"
                  value={editingNote ? editingNote.content : newNote.content}
                  onChange={(e) => editingNote
                    ? setEditingNote({ ...editingNote, content: e.target.value })
                    : setNewNote({ ...newNote, content: e.target.value })
                  }
                  className="w-full p-2 rounded-lg bg-gray-700 text-gray-300 h-32"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={editingNote ? editingNote.category : newNote.category}
                  onChange={(e) => editingNote
                    ? setEditingNote({ ...editingNote, category: e.target.value })
                    : setNewNote({ ...newNote, category: e.target.value })
                  }
                  className="w-full p-2 rounded-lg bg-gray-700 text-gray-300"
                />
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={editingNote ? handleUpdateNote : handleCreateNote}
                  className="bg-purple-600 px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300"
                >
                  {editingNote ? 'Update Note' : 'Save Note'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}