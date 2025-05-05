import React, { useEffect, useState } from "react";
import { getNoteById, updateNote } from "../services/notesService";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export const NoteDetailsPage = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    isPinned: false,
  });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await getNoteById(noteId);
        setNote(data.note);
        setFormData({
          title: data.note.title,
          content: data.note.content,
          tags: data.note.tags.join(", "),
          isPinned: data.note.isPinned,
        });
      } catch (err) {
        console.error("Failed to fetch note:", err);
        setError("Failed to load note details.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [noteId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTogglePin = () => {
    setFormData((prev) => ({ ...prev, isPinned: !prev.isPinned }));
  };

  const handleSaveNote = async () => {
    try {
      const updatedNote = {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
      };
      await updateNote(noteId, updatedNote);
      setNote(updatedNote);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save note:", err);
      setError("Failed to save note. Please try again.");
    }
  };

  if (loading)
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>
            {isEditing ? "Edit Note" : note.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Title"
              />
              <Textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Content"
              />
              <Input
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Tags (comma-separated)"
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pin"
                  checked={formData.isPinned}
                  onCheckedChange={handleTogglePin}
                />
                <label htmlFor="pin" className="text-sm">
                  Pin this note
                </label>
              </div>
              <Button onClick={handleSaveNote}>Save Note</Button>
            </>
          ) : (
            <>
              <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    #{tag}
                  </Badge>
                ))}
              </div>
              {note.isPinned && (
                <div className="text-yellow-600 font-semibold">📌 Pinned</div>
              )}
              <Button variant="secondary" onClick={() => setIsEditing(true)}>
                Edit Note
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
