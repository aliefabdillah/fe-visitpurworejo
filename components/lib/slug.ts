export function createSlug(name: string) {
  return name
    .toLowerCase() // Ubah huruf menjadi huruf kecil semua
    .replace(/[^a-z0-9\s]/g, '') // Hapus semua karakter selain huruf dan angka
    .replace(/\s+/g, '-') // Ganti spasi dengan tanda penghubung (-)
    .replace(/-+/g, '-') // Hilangkan tanda penghubung yang berulang
    .replace(/^-+|-+$/g, ''); // Hapus tanda penghubung di awal dan akhir string
}
