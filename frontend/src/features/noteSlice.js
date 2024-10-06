// // src/features/noteSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Fetch all notes (GET /api/notes)
// export const fetchNotes = createAsyncThunk('notes/fetchNotes', async (_, { rejectWithValue }) => {
//   try {
//     const { data } = await axios.get('/api/notes');
//     return data;
//   } catch (error) {
//     return rejectWithValue(error.response.data.message || 'Error fetching notes');
//   }
// });

// // Create a new note (POST /api/notes)
// export const createNote = createAsyncThunk('notes/createNote', async (noteData, { rejectWithValue }) => {
//   try {
//     const { data } = await axios.post('/api/notes', noteData);
//     return data;
//   } catch (error) {
//     return rejectWithValue(error.response.data.message || 'Error creating note');
//   }
// });

// // Update a note (PUT /api/notes/:id)
// export const updateNote = createAsyncThunk('notes/updateNote', async ({ id, noteData }, { rejectWithValue }) => {
//   try {
//     const { data } = await axios.put(`/api/notes/${id}`, noteData);
//     return data;
//   } catch (error) {
//     return rejectWithValue(error.response.data.message || 'Error updating note');
//   }
// });

// // Delete a note (DELETE /api/notes/:id)
// export const deleteNote = createAsyncThunk('notes/deleteNote', async (id, { rejectWithValue }) => {
//   try {
//     await axios.delete(`/api/notes/${id}`);
//     return id;
//   } catch (error) {
//     return rejectWithValue(error.response.data.message || 'Error deleting note');
//   }
// });

// const noteSlice = createSlice({
//   name: 'notes',
//   initialState: {
//     notes: [],
//     loading: false,
//     error: null,
//   },
//   extraReducers: (builder) => {
//     // Fetch notes
//     builder
//       .addCase(fetchNotes.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchNotes.fulfilled, (state, action) => {
//         state.loading = false;
//         state.notes = action.payload;
//       })
//       .addCase(fetchNotes.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//     // Create note
//     builder
//       .addCase(createNote.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(createNote.fulfilled, (state, action) => {
//         state.loading = false;
//         state.notes.push(action.payload);
//       })
//       .addCase(createNote.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//     // Update note
//     builder
//       .addCase(updateNote.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(updateNote.fulfilled, (state, action) => {
//         state.loading = false;
//         state.notes = state.notes.map(note => 
//           note._id === action.payload._id ? action.payload : note
//         );
//       })
//       .addCase(updateNote.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//     // Delete note
//     builder
//       .addCase(deleteNote.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(deleteNote.fulfilled, (state, action) => {
//         state.loading = false;
//         state.notes = state.notes.filter(note => note._id !== action.payload);
//       })
//       .addCase(deleteNote.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default noteSlice.reducer;
