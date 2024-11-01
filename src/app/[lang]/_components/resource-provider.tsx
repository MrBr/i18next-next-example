'use client';

import {  useSSR } from 'react-i18next';
import { PropsWithChildren } from "react";

export default function ResourceProvider({
children,
locale,
resources
}: PropsWithChildren & {locale: string, resources: any}) {
  useSSR(resources, locale);

  return children;
}
