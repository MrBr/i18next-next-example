import { PropsWithChildren } from "react";
import { notFound } from "next/navigation";
import { languages } from "@/i18n/settings";

import { Providers } from "@/app/[lang]/_components/providers";
import i18n from "@/i18n";
import TranslationProvider from "./_components/translation-provider";
import ResourceProvider from "./_components/resource-provider";
import { Badge } from "@/app/[lang]/_components/badge";

export default async function LocaleLayout({ children, params: { lang } }: PropsWithChildren & {
  params: { lang: string }
}) {
  // Ensure that the incoming `lang` is valid
  if (!languages.includes(lang as any)) {
    notFound();
  }

  await i18n.changeLanguage(lang);
  await i18n.loadNamespaces(['common']);

  return (
    <Providers>
      <TranslationProvider>
        <ResourceProvider locale={i18n.language} resources={i18n.store.data}>
          <div>
            {i18n.t('commonTranslation', { ns: 'common' })}
            <Badge/>
            {children}
          </div>
        </ResourceProvider>
      </TranslationProvider>
    </Providers>
  )
}
