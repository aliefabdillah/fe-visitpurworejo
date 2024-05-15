export function createSlug(name: string) {
  return name
    .toLowerCase() // Ubah huruf menjadi huruf kecil semua
    .replace(/\s+/g, '-') // Ganti spasi dengan tanda penghubung (-)
}
