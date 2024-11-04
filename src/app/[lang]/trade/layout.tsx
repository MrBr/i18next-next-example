import { PropsWithChildren } from "react";
import NamespaceProvider from "@/app/[lang]/_components/namespace-provider";

export default async function TradeLayout({children}: PropsWithChildren) {
  return <NamespaceProvider namespace="trade">{children}</NamespaceProvider>;
}
