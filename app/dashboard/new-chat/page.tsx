'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';

export default function NewChat() {
  const router = useRouter();
  const setActiveChat = useStore((state) => state.setActiveChat);

  useEffect(() => {
    setActiveChat(null);
    router.push('/dashboard/chat');
  }, [router, setActiveChat]);

  return null;
}
