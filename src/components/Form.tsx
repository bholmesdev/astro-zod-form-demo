import { useState } from "react";
import type { z } from "zod";
import { checkNewsletter } from "../pages/api/newsletter";
import Error from "./Error";

type Errors = z.typeToFlattenedError<z.infer<typeof checkNewsletter>>;

export default function Form() {
  const [apiResponseStatus, setApiResponseStatus] = useState<
    number | undefined
  >();
  const [errors, setErrors] = useState<Errors>();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const result = checkNewsletter.safeParse(data);
        if (!result.success) {
          setErrors(result.error.flatten());
        } else {
          setErrors(undefined);
          const { status } = await fetch("/api/newsletter", {
            method: "POST",
            body: data,
          });
          setApiResponseStatus(status);
        }
      }}
    >
      <label htmlFor="email">Email</label>
      <input type="text" name="email" id="email" required />
      {errors?.fieldErrors.email ? <Error>Invalid email.</Error> : null}
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" />
      {errors?.fieldErrors.name ? <Error>Invalid name.</Error> : null}
      <label htmlFor="isPromoAllowed">Include promotional emails</label>
      <input type="checkbox" name="isPromoAllowed" id="isPromoAllowed" />
      {errors?.fieldErrors.isPromoAllowed ? (
        <Error>Invalid selection.</Error>
      ) : null}
      <button type="submit">Sign me up</button>
      {apiResponseStatus ? <p>{apiResponseStatus}</p> : null}
    </form>
  );
}
