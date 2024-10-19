import { z } from "zod";

const akunSchema = z.object({
  id: z.number().optional(),
  kode: z.string(),
  nama: z.string(),
  deskripsi: z.string(),
  kategori: z.string(),
});

export default defineEventHandler(async (event) => {
  protectFunction(event);

  const formData = await readBody(event);

  const res = akunSchema.parse(formData);

  if (res.id) {
    await updateAkun(res.id, res);
  } else {
    await createAkun(res);
  }

  return;
});
