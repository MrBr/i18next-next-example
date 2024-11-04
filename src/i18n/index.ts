import resourcesToBackend from 'i18next-resources-to-backend'

import i18n from 'i18next';
import { languages, fallbackLng } from './settings';
import { initReactI18next } from "react-i18next/initReactI18next";


i18n
  .use(
    resourcesToBackend(
      (language: string, namespace: string) => namespace === 'hidden' ?
        new Promise(async (resolve) => {
          // Simulate long delayed translation load
          setTimeout(async () => resolve(await import(`./locales/${language}/${namespace}.json`)), 3000);
        }) : import(`./locales/${language}/${namespace}.json`)
    )
  )
  .use(initReactI18next)
  .init({
    fallbackLng,
    supportedLngs: languages,
  });

export default i18n;
