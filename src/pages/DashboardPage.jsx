import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { deleteNote, getMyNotes, searchNotes } from "../services/notesService.js";
import { PlusCircle, Search } from "lucide-react";
import { CreateNote } from "./CreateNote.jsx";

export const DashboardPage = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchNotes = async () => {
    try {
      const data = await getMyNotes();
      setNotes(data.notes || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load notes.");
    } finally {
      setLoadingNotes(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      fetchNotes();
    } catch (err) {
      console.error("Failed to delete note:", err);
      setError("Failed to delete note.");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchNotes();
      return;
    }

    try {
      const data = await searchNotes(searchQuery);
      setNotes(data.notes || []);
    } catch (err) {
      console.error("Failed to search notes:", err);
      setError("Failed to search notes.");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (loadingNotes)
    return <div className="text-center mt-20 text-xl text-gray-600">Loading your notes...</div>;

  if (error)
    return <div className="text-center mt-20 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
        Hello, <span className="text-green-600">{user?.fullName || "User"} 👋</span>
      </h1>

      {/* Search + Create Bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <form onSubmit={handleSearch} className="flex-1 bg-white rounded-lg shadow-md px-4 py-3 flex items-center gap-2 border border-gray-200">
          <Search className="text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your notes..."
            className="w-full outline-none text-gray-700"
          />
        </form>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg shadow transition"
        >
          <PlusCircle size={20} />
          Create Note
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Create a new note</h2>
            <CreateNote
              onNoteAdded={() => {
                fetchNotes();
                setIsModalOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Note List */}
      {Array.isArray(notes) && notes.length === 0 ? (
        <div className="text-center mt-20 text-gray-500">
          <p className="text-6xl mb-4">📝</p>
          <p className="text-lg">You don't have any notes yet.</p>
          <p className="text-sm">Click "Create Note" to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} onDelete={handleDeleteNote} />
          ))}
        </div>
      )}
    </div>
  );
};
