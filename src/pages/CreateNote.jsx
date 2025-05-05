import { useState } from "react";
import { createNote } from "../services/notesService.js";
import { PiPushPinSimpleFill } from "react-icons/pi";

export const CreateNote = ({ onNoteAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newNote = await createNote({
        title,
        content,
        tags: tags.split(",").map((tag) => tag.trim()),
        isPinned,
      });
      setTitle("");
      setContent("");
      setTags("");
      setIsPinned(false);
      if (onNoteAdded) onNoteAdded(newNote);
    } catch (err) {
      console.error("Failed to create note:", err);
      setError("Failed to create note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        ✍️ Create a New Note
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Title
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Content
          </label>
          <textarea
            className="w-full border border-gray-300 px-4 py-2 rounded-md min-h-[150px] focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Tags
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags separated by commas"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isPinned"
            checked={isPinned}
            onChange={(e) => setIsPinned(e.target.checked)}
            className="h-4 w-4 text-yellow-500 focus:ring-yellow-400"
          />
          <label
            htmlFor="isPinned"
            className="text-sm font-medium text-gray-700 flex items-center gap-1"
          >
            <PiPushPinSimpleFill className="text-yellow-500" />
            Pin this note
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Create Note"}
        </button>
      </form>
    </div>
  );
};
