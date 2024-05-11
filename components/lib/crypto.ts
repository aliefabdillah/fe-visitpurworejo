export function encryptUserId(userId: string) {
  return btoa(userId.toString());
}

// Dekripsi user ID dari string menjadi number
export async function decryptUserId(encryptedUserId: string | undefined) {
  try {
    if (!encryptedUserId) return null;
    return parseInt(atob(encryptedUserId), 10);
  } catch (error) {
    console.log('Failed to decrypt user ID');
    return null;
  }
}

