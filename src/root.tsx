import {
  type Signal,
  component$,
  createContextId,
  useContextProvider,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import {
  OneTimeDataRequestBuilder,
  RadixDappToolkit,
  RadixNetwork,
} from "@radixdlt/radix-dapp-toolkit";

import { RouterHead } from "~/components/router-head/router-head";
import { DarkThemeLauncher } from "~/components/common/dark-theme-launcher";
import ToggleTheme from "~/components/common/toggle-theme";
import "~/global.css";

type StringArrayFields = string[];
type FieldVariants = FullNameFields | StringArrayFields;
interface FullNameFields {
  variant: "western" | "eastern";
  familyName: string;
  nickname: string;
  givenNames: string;
}
interface Persona {
  entry: "fullName" | "emailAddresses" | "phoneNumbers";
  fields: FieldVariants;
}

export const PersonaContext = createContextId<Signal<string>>(
  "radix.persona-context"
);

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  const name = useSignal("");

  useVisibleTask$(() => {
    const rdt = RadixDappToolkit({
      dAppDefinitionAddress:
        "account_tdx_2_12ys5dcytt0hc0yhq5a78stl7upchljsvs36ujdunlszlrgu90mz44d",
      networkId: RadixNetwork.Stokenet,
      applicationName: "RadQwikStack",
      applicationVersion: "1.0.0",
    });
    rdt.buttonApi.setTheme("white");

    rdt.walletApi.provideConnectResponseCallback(async (result) => {
      if (result.isErr()) {
        console.log("Connect error", result.error);
      } else {
        // connected successfully - make one-time request for persona data
        console.log("Connected", result.value);
        try {
          const result = await rdt.walletApi.sendOneTimeRequest(
            OneTimeDataRequestBuilder.personaData().fullName()
          );
          if (result.isErr()) throw result.error;

          const walletData = result.value;
          const { personaData } = walletData;

          if (personaData.length > 0) {
            const persona: Persona = personaData[0];
            if (
              persona.entry === "fullName" &&
              !Array.isArray(persona.fields)
            ) {
              name.value = `${persona.fields.givenNames} ${persona.fields.familyName}`;
            }
          } else {
            console.log("No persona data available");
          }
        } catch (e: any) {
          console.error("Error fetching persona data", e.error);
        }
      }
    });
  });

  useContextProvider(PersonaContext, name);

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
        <DarkThemeLauncher />
      </head>
      <body lang="en">
        <div class="bg-gray-100 dark:bg-gray-900 h-svh">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div class="header absolute right-3 top-3">
              <div class="flex gap-3">
                <radix-connect-button />
                <ToggleTheme />
              </div>
            </div>
            <div class="max-w-3xl mx-auto py-16 sm:py-24">
              <RouterOutlet />
            </div>
          </div>
        </div>
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
