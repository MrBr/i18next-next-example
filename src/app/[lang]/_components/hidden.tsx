'use client';

import { useTranslation } from "react-i18next";

export const Hidden = () => {
  const { t } = useTranslation('hidden');
  return <div>{t('label')}</div>
}
