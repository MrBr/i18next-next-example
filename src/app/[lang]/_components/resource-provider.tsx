'use client';

import { PropsWithChildren } from "react";
import i18n from "i18next";

export default function ResourceProvider({
children,
locale,
  namespace,
resources
}: PropsWithChildren & {locale: string, namespace: string, resources: any}) {
  if (!i18n.hasLoadedNamespace(namespace)) {
    i18n.addResources(locale, namespace, resources);
  }

  return children;
}
