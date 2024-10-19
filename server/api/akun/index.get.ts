export default eventHandler(async () => {
  const res = await getAllAkun();
  const data = res.map((item) => {
    return {
      id: item.id,
      kode: item.kode,
      nama: item.nama,
      kategori: item.kategori,
      deskripsi: item.deskripsi,
    };
  });

  return data;
});
