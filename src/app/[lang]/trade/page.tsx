'use client';
import Link from "next/link";
import { withLang } from "@/lang-utils";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import dynamic from "next/dynamic";
import i18n from "@/i18n";

const DynamicHidden = dynamic(() => import('@/app/[lang]/_components/hidden').then(({Hidden}) => Hidden), {
  loading: () => <> Loading...</>
})

export default function TradePage() {
  const {t} = useTranslation('trade')
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div>
      <h1>{t('title')}</h1>
      <Link style={{color: 'red'}} href={withLang('/bots')}>{t('bots')}</Link> - Has bots translations = {`${ typeof window !== 'undefined' && i18n.hasLoadedNamespace('bots')}`}
      <br/>
      {!isVisible && <button onClick={() => setIsVisible(true)}>Show</button>}
      {isVisible && <DynamicHidden/>}
    </div>
  )
}
