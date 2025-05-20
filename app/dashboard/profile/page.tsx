'use client'

import { useAuth } from '@/lib/auth-context';
import { ProfileForm } from './profile-form';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { user, profile, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/signin');
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  if (!profile) {
    return <div className="p-8">Profile not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      <ProfileForm profile={profile} />
    </div>
  );
} 