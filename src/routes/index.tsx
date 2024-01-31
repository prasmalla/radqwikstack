import { component$, useContext } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PersonaContext } from "~/root";

export default component$(() => {
  const name = useContext(PersonaContext);

  return (
    <>
      <h1 class="text-3xl">Hi! {name.value} 👋</h1>
      <p>
        Can't wait to see what you build with RadixDLT + Qwik!
        <br />
        Happy coding.
      </p>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
