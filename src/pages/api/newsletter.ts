import type { APIRoute } from "astro";
import { z } from "zod";
import { zfd } from "zod-form-data";

export const checkNewsletter = zfd.formData({
  name: zfd.text().optional(),
  email: zfd.text(z.string().email()),
  isPromoAllowed: zfd.checkbox(),
});

export const post: APIRoute = async ({ request }) => {
  const result = checkNewsletter.safeParse(await request.formData());
  if (result.success) {
    // do stuff
    console.log(result);
    return new Response(null, { status: 200 });
  } else {
    return new Response(
      JSON.stringify({ message: "Data is mal-form-ed (hehe)" }),
      { status: 400 }
    );
  }
};
