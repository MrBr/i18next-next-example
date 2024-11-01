'use client'

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { withLang } from "@/lang-utils";

export default function Bots() {
  const { t, i18n } = useTranslation('bots')
  const [counter, setCounter] = useState(0)
  const router = useRouter()

  useEffect(() => {
    console.log('TEST')
  }, [t]);

  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>{counter}</button>
      <h1>{t('title')}</h1>
      <Link href={withLang('/trade')}>{t('trade')}</Link>
      <div>
        <button onClick={async () => {
          const newLanguage = i18n.language === 'en' ? 'de' : 'en';
          await i18n.changeLanguage(newLanguage)
          router.replace(`/${newLanguage}/bots`)
        }}>Switch lang</button>
      </div>
    </div>
  )
}

