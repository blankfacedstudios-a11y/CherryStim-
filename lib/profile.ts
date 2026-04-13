export interface UserProfile {
  id: string;
  role: "client" | "dancer";
  displayName: string;
  iconUrl: string | null;
  photos: string[];
  maxPhotos: number;
  requireProfessionalPhotos: boolean;
}

export const PROFILE_RULES = {
  maxPhotos: 7,
  dancerRequiresProfessionalPhotos: true,
  clientRequiresProfessionalPhotos: false
} as const;

export function validatePhotoCount(current: number, adding: number): { success: boolean; message: string } {
  const total = current + adding;
  if (total > PROFILE_RULES.maxPhotos) {
    return { success: false, message: `Maximum ${PROFILE_RULES.maxPhotos} photos allowed. You have ${current} and are trying to add ${adding}.` };
  }
  return { success: true, message: "OK" };
}
