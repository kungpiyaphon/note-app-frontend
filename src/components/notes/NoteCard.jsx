import { Link } from "react-router-dom";
import { useState } from "react";
import { updateNoteVisibility } from "../../services/notesService.js";

export const NoteCard = ({ note, onDelete }) => {
  const [isPublic, setIsPublic] = useState(note.isPublic);

  const handleToggleVisibility = async () => {
    try {
      const updatedNote = await updateNoteVisibility(note._id, !isPublic);
      setIsPublic(updatedNote.note.isPublic);
    } catch (err) {
      console.error("Failed to update note visibility:", err);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col justify-between h-full">

      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800 line-clamp-1">
            {note.title}
          </h2>
          {note.isPinned && (
            <span className="text-yellow-400 text-sm" title="Pinned">📌</span>
          )}
        </div>

        <p className="text-sm text-gray-600 mt-2 line-clamp-4 whitespace-pre-wrap">
          {note.content}
        </p>
      </div>

      {/* Tags */}
      {note.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {note.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-200 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t text-xs text-gray-500">
        <span>
          🗓 {new Date(note.createdOn).toLocaleDateString()}
        </span>

        <div className="flex flex-wrap gap-2 text-sm mt-2">
          <Link
            to={`/notes/${note._id}`}
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded-md"
          >
            View
          </Link>
          <Link
            to={`/notes/${note._id}`}
            className="bg-green-100 hover:bg-green-200 text-green-700 px-2 py-1 rounded-md"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(note._id)}
            className="bg-red-100 hover:bg-red-200 text-red-600 px-2 py-1 rounded-md"
          >
            Delete
          </button>
          <button
            onClick={handleToggleVisibility}
            className={`px-2 py-1 rounded-md ${
              isPublic
                ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {isPublic ? "Unpublish" : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
};
