import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { X, Edit, Trash2, Plus } from 'lucide-react';

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
    <div className="sulphur-point-light min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Space for existing navbar */}
      <div className="h-16"></div>

      <div className="p-8">
        {/* Create New Note Button */}
        <div className="flex justify-end mb-8">
          <button className="bg-blue-500 px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 flex items-center space-x-2">
            <Plus size={20} />
            <span>Create New Note</span>
          </button>
        </div>

        {/* Notes Grid */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {notes.map(note => (
            <div
              key={note._id}
              className={`bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${
                expandedNoteId === note._id ? 'ring-2 ring-blue-500 h-auto' : 'h-32'
              }`}
            >
              <div 
                className="p-6 cursor-pointer"
                onClick={() => toggleExpand(note._id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-blue-300">{note.title}</h2>
                  {expandedNoteId === note._id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedNoteId(null);
                      }}
                      className="bg-red-500 rounded-full p-2 hover:bg-red-600 transition-colors duration-300"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <p className="text-gray-400 mb-2">Category: {note.category}</p>

                {/* Expandable Section */}
                {expandedNoteId === note._id && (
                  <div className="transition-all duration-300">
                    <p className="text-gray-300 mb-4">{note.content}</p>
                    {/* Edit and Delete Buttons */}
                    <div className="flex space-x-4 mt-4">
                      <button className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center space-x-2">
                        <Edit size={16} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNote(note._id);
                        }}
                        className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center space-x-2"
                      >
                        <Trash2 size={16} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyNotes;
