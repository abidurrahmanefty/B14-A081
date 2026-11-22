"use client";

import { useState } from "react";
import { BOOK_CATEGORIES, type BookCategory } from "@/lib/constants";
import { uploadToImgbb } from "@/lib/imgbb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type BookFormValues = {
  title: string;
  author: string;
  category: BookCategory;
  imageUrl: string;
  description: string;
  totalCopies: number;
};

type BookFormProps = {
  initial?: Partial<BookFormValues>;
  userName: string;
  userEmail: string;
  submitLabel: string;
  onSubmit: (values: BookFormValues) => Promise<void>;
};

export function BookForm({
  initial,
  userName,
  userEmail,
  submitLabel,
  onSubmit,
}: BookFormProps) {
  const [title, setTitle] = useState(initial?.title || "");
  const [author, setAuthor] = useState(initial?.author || "");
  const [category, setCategory] = useState<BookCategory>(initial?.category || "Fiction");
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [totalCopies, setTotalCopies] = useState(String(initial?.totalCopies ?? 1));
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToImgbb(file);
      setImageUrl(url);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit({
        title,
        author,
        category,
        imageUrl,
        description,
        totalCopies: Math.max(1, parseInt(totalCopies, 10) || 1),
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-5">
      <div className="grid gap-2">
        <Label htmlFor="title">Book Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="author">Author Name</Label>
        <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      </div>
      <div className="grid gap-2">
        <Label>Category</Label>
        <Select value={category} onValueChange={(v) => setCategory(v as BookCategory)}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {BOOK_CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="image">Book Image</Label>
        <Input id="image" type="file" accept="image/*" onChange={handleFileChange} />
        {imageUrl && (
          <p className="text-xs text-muted-foreground">Image ready: {imageUrl.slice(0, 48)}…</p>
        )}
        {uploading && <p className="text-sm text-accent">Uploading image…</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Short Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="copies">Total Copies</Label>
        <Input
          id="copies"
          type="number"
          min={1}
          value={totalCopies}
          onChange={(e) => setTotalCopies(e.target.value)}
          required
        />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="userName">User Name</Label>
          <Input id="userName" value={userName} readOnly />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="userEmail">User Email</Label>
          <Input id="userEmail" value={userEmail} readOnly />
        </div>
      </div>
      <Button type="submit" disabled={saving || uploading || !imageUrl} className="w-full sm:w-auto">
        {saving ? "Saving…" : submitLabel}
      </Button>
    </form>
  );
}
