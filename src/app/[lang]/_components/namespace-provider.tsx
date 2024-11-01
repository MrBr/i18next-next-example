import { PropsWithChildren } from "react";
import i18n from "@/i18n";

export default async function NamespaceProvider({
children,
namespaces,
}: PropsWithChildren & {namespaces: string | Array<string>}) {
  await i18n.loadNamespaces(namespaces);

  return <>{children}</>;
}
