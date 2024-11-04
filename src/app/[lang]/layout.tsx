import { PropsWithChildren } from "react";
import { notFound } from "next/navigation";
import { languages } from "@/i18n/settings";

import { Providers } from "@/app/[lang]/_components/providers";
import i18n from "@/i18n";
import TranslationProvider from "./_components/translation-provider";
import { Badge } from "@/app/[lang]/_components/badge";
import NamespaceProvider from "@/app/[lang]/_components/namespace-provider";

export default async function LocaleLayout({ children, params: { lang } }: PropsWithChildren & {
  params: { lang: string }
}) {
  // Ensure that the incoming `lang` is valid
  if (!languages.includes(lang as any)) {
    notFound();
  }

  // TODO - is this the right moment?
  await i18n.changeLanguage(lang);

  return (
    <Providers>
      <TranslationProvider>
        <NamespaceProvider namespace="common">
          <div>
            {i18n.t('commonTranslation', { ns: 'common' })}
            <Badge/>
            {children}
          </div>
        </NamespaceProvider>
      </TranslationProvider>
    </Providers>
  )
}
