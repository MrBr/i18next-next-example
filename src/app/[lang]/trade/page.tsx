'use client';
import Link from "next/link";
import { withLang } from "@/lang-utils";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import dynamic from "next/dynamic";

const DynamicHidden = dynamic(() => import('@/app/[lang]/_components/hidden').then(({Hidden}) => Hidden))

export default function TradePage() {
  const {t} = useTranslation('trade')
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div>
      <h1>{t('title')}</h1>
      <Link href={withLang('/bots')}>{t('bots')}</Link>
      {!isVisible && <button onClick={() => setIsVisible(true)}>Show</button>}
      {isVisible && <DynamicHidden/>}
    </div>
  )
}
