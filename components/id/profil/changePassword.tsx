'use client'
import React, { useEffect, useState } from 'react'
import ChangePasswordForm from './changePasswordForm'
import { Locale, getDictionary } from '@/components/dictionaries/dictionaries';
import { useSearchParams } from 'next/navigation';

export default function ChangePassword() {
  const searchParams = useSearchParams();
  const query = searchParams.get("lang");
  const [intl, setIntl] = useState<any>(null);
  const lang: Locale = query ? (query as Locale) : "id";

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(lang);
      setIntl(dictionary);
    };

    fetchDictionary();
  }, [lang, query, searchParams]);
  
  return (
    <div className='flex flex-col gap-3 mb-4'>
      <p className='text-4xl font-extrabold'>{intl ? intl.profile.changePassword.title  : ""}</p>
      <ChangePasswordForm/>
    </div>
  )
}
