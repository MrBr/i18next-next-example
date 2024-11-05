// import the original type declarations
import "i18next";
// import all namespaces (for the default language, only)
import bots from "./locales/en/bots.json";
import trade from "./locales/en/trade.json";
import hidden from "./locales/en/hidden.json";
import common from "./locales/en/common.json";


declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: "common";
    // custom resources type
    resources: {
      bots: typeof bots;
      common: typeof common;
      hidden: typeof hidden;
      trade: typeof trade;
    };
    // other
  }
}
