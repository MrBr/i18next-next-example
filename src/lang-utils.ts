import type { Route } from 'next';

import { languages } from './i18n/settings';
import i18n from "i18next";

export type RouteWithoutLang<TPath extends string> = Extract<
  Route<`/${string}${TPath}`>,
  `/${string}${TPath}`
> extends never
  ? never
  : TPath;

const langUrlPrefixRegex = new RegExp((languages ?? []).join('|'));
export const getLangFromUrl = (route: string) =>
  route.match(/^\/[a-z]+/)?.[0].match(langUrlPrefixRegex)?.[0];

const supportedLangPrefixRegex = new RegExp(`^/(${(languages ?? []).join('|')})`);
export const withoutLang = (route: string) => route.replace(supportedLangPrefixRegex, '');

export const withLang = <TPath extends string>(
  // Extract returns string only if TPath is valid.
  // Used to make param typesafe.
  route: RouteWithoutLang<TPath>
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return `/${i18n.language}${route}` as const;
};
