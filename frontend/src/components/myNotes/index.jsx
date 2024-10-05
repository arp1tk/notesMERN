import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { X, Edit, Trash2, Plus, Folder } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [expandedNoteId, setExpandedNoteId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedNoteId(expandedNoteId === id ? null : id);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note._id !== id));
    if (expandedNoteId === id) {
      setExpandedNoteId(null);
    }
  };

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/notes');
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-300">
      {/* Space for existing navbar */}
      <div className="h-16"></div>

      <div className="p-8">
        {/* Create New Note Button */}
        <motion.div 
          className="flex justify-end mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button className="bg-purple-600 px-6 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300 flex items-center space-x-2">
            <Plus size={20} />
            <span>Create New Note</span>
          </button>
        </motion.div>

        {/* Notes Grid */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence>
            {notes.map(note => (
              <motion.div
                key={note._id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className={`bg-gray-800 rounded-xl shadow-xl overflow-hidden transition-all duration-300 ${
                  expandedNoteId === note._id ? 'col-span-full' : ''
                }`}
              >
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => toggleExpand(note._id)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-purple-400">{note.title}</h2>
                    {expandedNoteId === note._id && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedNoteId(null);
                        }}
                        className="bg-gray-700 rounded-full p-2 hover:bg-gray-600 transition-colors duration-300"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  <p className="text-gray-400 mb-2 flex items-center">
                    <Folder size={16} className="mr-2" />
                    {note.category}
                  </p>

                  {/* Expandable Section */}
                  <AnimatePresence>
                    {expandedNoteId === note._id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-300 mb-4">{note.content}</p>
                        {/* Edit and Delete Buttons */}
                        <div className="flex space-x-4 mt-4">
                          <button className="bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center space-x-2">
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
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MyNotes;