import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "~/components/router-head/router-head";
import { DarkThemeLauncher } from "~/components/common/dark-theme-launcher";
import ToggleTheme from "~/components/common/toggle-theme";

import "~/global.css";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

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
              <ToggleTheme />
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
