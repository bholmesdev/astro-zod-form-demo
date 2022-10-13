import type { APIRoute } from "astro";
import { zfd } from "zod-form-data";
import { z } from "zod";

export const checkNewsletter = zfd.formData({
  email: zfd.text(z.string().email()),
  name: zfd.text().optional(),
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
      JSON.stringify({
        message: "Data is mal-form-ed (hehe)",
      }),
      { status: 400 }
    );
  }
};
