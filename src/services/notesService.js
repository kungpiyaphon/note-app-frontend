import api from "./api"; // Our Axios instance withCredentials=true

// Fetch all notes for the logged-in user
export const getMyNotes = async () => {
  const response = await api.get("/mongo/get-all-notes");
  return response.data;
};

// Fetch a single note by ID
export const getNoteById = async (noteId) => {
  const response = await api.get(`/mongo/get-note/${noteId}`);
  return response.data;
};

// Create a new note
export const createNote = async (noteData) => {
  const response = await api.post("/mongo/add-note", noteData);
  return response.data;
};

// Update an existing note
export const updateNote = async (noteId, updatedData) => {
  const response = await api.put(`/mongo/edit-note/${noteId}`, updatedData);
  return response.data;
};

// Delete a note
export const deleteNote = async (noteId) => {
  const response = await api.delete(`/mongo/delete-note/${noteId}`);
  return response.data;
};

// Search notes by title, content, or tags
export const searchNotes = async (query) => {
  const response = await api.get(
    `/mongo/search-notes?query=${encodeURIComponent(query)}`
  );
  return response.data;
};

// Update note visibility (publish/unpublish)
export const updateNoteVisibility = async (noteId, isPublic) => {
  const response = await api.put(`/mongo/notes/${noteId}/visibility`, {
    isPublic,
  });
  return response.data;
};