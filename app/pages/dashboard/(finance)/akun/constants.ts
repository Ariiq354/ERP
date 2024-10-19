import { z } from "zod";

export const columns = [
  {
    key: "kode",
    label: "Kode Akun",
    sortable: true,
  },
  {
    key: "nama",
    label: "Nama Akun",
    sortable: true,
  },
  {
    key: "kategori",
    label: "Kategori Akun",
    sortable: true,
  },
];

export const kategoriAkun = [
  "kas & setara kas",
  "piutang usaha",
  "persediaan barang",
  "aktiva tetap",
  "aktiva lainnya",
  "utang usaha",
  "utang lainnya",
  "modal usaha",
  "pendapatan usaha",
  "pendapatan lainnya",
  "biaya usaha",
  "biaya lainnya",
];

export const schema = z.object({
  id: z.number().optional(),
  kode: z.string().min(1, { message: "Required" }),
  nama: z.string().min(1, { message: "Required" }),
  kategori: z.string().min(1, { message: "Required" }),
  deskripsi: z.string(),
});

export const getInitialFormData = (): Schema => ({
  id: undefined,
  kode: "",
  nama: "",
  kategori: "",
  deskripsi: "",
});

export type Schema = z.output<typeof schema>;
