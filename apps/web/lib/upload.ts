import { api } from "./api";

export type UploadKind = "image" | "video";

export const UPLOAD_RULES: Record<UploadKind, { accept: string; label: string; maxMb: number }> = {
  image: { accept: "image/jpeg,image/png,image/webp", label: "JPG, PNG or WebP", maxMb: 10 },
  video: { accept: "video/mp4,video/webm", label: "MP4 or WebM", maxMb: 200 },
};

export async function uploadFile(
  kind: UploadKind,
  file: File,
  token: string,
  onProgress?: (percent: number) => void
): Promise<string> {
  const rules = UPLOAD_RULES[kind];
  if (file.size > rules.maxMb * 1024 * 1024) throw new Error(`File must be under ${rules.maxMb} MB`);

  const signed = await api.post<{ uploadUrl: string; path: string }>(
    "/api/uploads/sign",
    { kind, fileName: file.name, contentType: file.type, size: file.size },
    token
  );

  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", signed.uploadUrl);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress?.(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => (xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error("Upload failed. Please try again.")));
    xhr.onerror = () => reject(new Error("Network error during upload. Check your connection and try again."));
    xhr.send(file);
  });

  const done = await api.post<{ url: string }>("/api/uploads/finalize", { path: signed.path }, token);
  return done.url;
}
