import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <h1 class="text-3xl">Hi 👋</h1>
      <p>
        Can't wait to see what you build with RadixDLT + Qwik!
        <br />
        Happy coding.
      </p>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to RadQwikStack",
  meta: [
    {
      name: "description",
      content: "RadixDLT frontend built with Qwik",
    },
  ],
};
