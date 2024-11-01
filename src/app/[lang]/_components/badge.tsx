'use client';

import { useTranslation } from "react-i18next";

export const Badge = () => {
  const { t } = useTranslation('common');
  return <span>{t('badge')}</span>
}
