"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, X, Upload } from "lucide-react";
import { PROFILE_RULES } from "@/lib/profile";

interface PhotoUploaderProps {
  photos: string[];
  iconUrl: string | null;
  onPhotosChange: (urls: string[]) => void;
  onIconChange: (url: string) => void;
  requireProfessional: boolean;
  maxPhotos?: number;
}

export function PhotoUploader({
  photos,
  iconUrl,
  onPhotosChange,
  onIconChange,
  requireProfessional,
  maxPhotos = PROFILE_RULES.maxPhotos
}: PhotoUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const iconInputRef = useRef<HTMLInputElement>(null);

  function handleFileSelect(files: FileList | null) {
    if (!files) return;
    const remaining = maxPhotos - photos.length;
    const newUrls: string[] = [];
    for (let i = 0; i < Math.min(files.length, remaining); i++) {
      newUrls.push(URL.createObjectURL(files[i]));
    }
    if (newUrls.length > 0) onPhotosChange([...photos, ...newUrls]);
  }

  function handleIconSelect(files: FileList | null) {
    if (!files || files.length === 0) return;
    onIconChange(URL.createObjectURL(files[0]));
  }

  function removePhoto(index: number) {
    onPhotosChange(photos.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-lg font-semibold">Profile Icon</h3>
        <div className="flex items-center gap-4">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-white/20 bg-black/40">
            {iconUrl ? (
              <img src={iconUrl} alt="Profile icon" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Camera className="text-white/40" size={32} />
              </div>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={() => iconInputRef.current?.click()}>
            <Upload size={14} className="mr-2" /> Upload Icon
          </Button>
          <input ref={iconInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleIconSelect(e.target.files)} />
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Photos ({photos.length}/{maxPhotos})</h3>
          {requireProfessional && (
            <span className="rounded-full bg-gold-500/20 px-3 py-1 text-xs text-gold-400">Professional photos required</span>
          )}
        </div>

        <div
          className={`rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
            dragOver ? "border-cherry-500 bg-cherry-500/10" : "border-white/20"
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFileSelect(e.dataTransfer.files);
          }}
        >
          <Upload className="mx-auto mb-3 text-white/40" size={32} />
          <p className="mb-2 text-sm text-white/70">Drag photos here or click to upload</p>
          <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={photos.length >= maxPhotos}>
            Select Files
          </Button>
          <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFileSelect(e.target.files)} />
        </div>

        {photos.length > 0 && (
          <div className="mt-4 grid grid-cols-4 gap-3 md:grid-cols-7">
            {photos.map((url, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border border-white/10">
                <img src={url} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
                <button
                  onClick={() => removePhoto(i)}
                  className="absolute right-1 top-1 rounded-full bg-black/70 p-1 opacity-0 transition group-hover:opacity-100"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
