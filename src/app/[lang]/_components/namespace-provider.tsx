import { PropsWithChildren } from "react";
import i18n from "@/i18n";
import ResourceProvider from "@/app/[lang]/_components/resource-provider";

export default async function NamespaceProvider({
children,
namespace,
}: PropsWithChildren & {namespace: string}) {
  await i18n.loadNamespaces(namespace);

  return <ResourceProvider locale={i18n.language} namespace={namespace} resources={i18n.getResourceBundle(i18n.language, namespace)}>{children}</ResourceProvider>;
}
