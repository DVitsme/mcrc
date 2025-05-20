'use client'

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { createBrowserClient } from '@supabase/ssr';
import { useAuth } from '@/lib/auth-context';
import type { Profile } from '@/lib/auth-context';
import Image from 'next/image';

interface ProfileFormProps {
  profile: Profile;
}

const MAX_AVATAR_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_NAME_LENGTH = 100;
const MAX_SKILLS_LENGTH = 255;
const MAX_CASE_TYPES_LENGTH = 255;
const MAX_LANGUAGES_LENGTH = 255;
const MAX_CONTACT_PREF_LENGTH = 255;
const MAX_BIO_LENGTH = 1000;

export function ProfileForm({ profile }: ProfileFormProps) {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { refreshProfile } = useAuth();

  const form = useForm<Profile>({
    defaultValues: {
      ...profile,
      is_available_for_new_cases: !!profile.is_available_for_new_cases,
    },
    mode: 'onBlur',
  });

  const validateAvatar = (file: File | null) => {
    if (!file) return true;
    if (!file.type.startsWith('image/')) {
      setAvatarError('Avatar must be an image file.');
      return false;
    }
    if (file.size > MAX_AVATAR_SIZE) {
      setAvatarError('Avatar must be less than 5MB.');
      return false;
    }
    setAvatarError(null);
    return true;
  };

  const onSubmit = async (values: Profile) => {
    if (!validateAvatar(avatarFile)) return;

    startTransition(async () => {
      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        let avatar_url = values.avatar_url;
        if (avatarFile) {
          const ext = avatarFile.name.split('.').pop();
          const filePath = `${profile.id}/avatar.${ext}`;
          const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, avatarFile, { upsert: true });

          if (uploadError) {
            toast.error('Failed to upload avatar');
            return;
          }

          const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
          avatar_url = data.publicUrl;
        }

        const { error } = await supabase
          .from('profiles')
          .update({
            full_name: values.full_name,
            skills: values.skills,
            preferred_case_types: values.preferred_case_types,
            languages_spoken: values.languages_spoken,
            is_available_for_new_cases: values.is_available_for_new_cases,
            contact_preferences: values.contact_preferences,
            bio: values.bio,
            avatar_url,
          })
          .eq('id', profile.id)
          .select()
          .single();

        if (error) {
          console.error('Profile update error:', error);
          toast.error('Failed to update profile');
        } else {
          toast.success('Profile updated successfully');
          await refreshProfile();
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        toast.error('An unexpected error occurred');
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormItem className="flex flex-col items-center gap-4">
          <div className="relative h-24 w-24">
            <Image
              src={avatarFile ? URL.createObjectURL(avatarFile) : profile.avatar_url || '/images/default-avatar.png'}
              alt="Avatar"
              className="rounded-full object-cover border"
              width={96}
              height={96}
              priority
            />
          </div>
          <FormLabel htmlFor="avatar">Avatar</FormLabel>
          <Input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={e => {
              const file = e.target.files?.[0] || null;
              setAvatarFile(file);
              validateAvatar(file);
            }}
          />
          {avatarError && <FormMessage>{avatarError}</FormMessage>}
        </FormItem>
        <FormField
          control={form.control}
          name="full_name"
          rules={{ required: 'Full name is required', maxLength: { value: MAX_NAME_LENGTH, message: `Max ${MAX_NAME_LENGTH} chars` } }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} maxLength={MAX_NAME_LENGTH} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="skills"
          rules={{ maxLength: { value: MAX_SKILLS_LENGTH, message: `Max ${MAX_SKILLS_LENGTH} chars` } }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} maxLength={MAX_SKILLS_LENGTH} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preferred_case_types"
          rules={{ maxLength: { value: MAX_CASE_TYPES_LENGTH, message: `Max ${MAX_CASE_TYPES_LENGTH} chars` } }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Case Types</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} maxLength={MAX_CASE_TYPES_LENGTH} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="languages_spoken"
          rules={{ maxLength: { value: MAX_LANGUAGES_LENGTH, message: `Max ${MAX_LANGUAGES_LENGTH} chars` } }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Languages Spoken</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} maxLength={MAX_LANGUAGES_LENGTH} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_available_for_new_cases"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <input
                  id="is_available_for_new_cases"
                  type="checkbox"
                  checked={!!field.value}
                  onChange={e => field.onChange(e.target.checked)}
                />
              </FormControl>
              <FormLabel htmlFor="is_available_for_new_cases">Available for New Cases</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact_preferences"
          rules={{ maxLength: { value: MAX_CONTACT_PREF_LENGTH, message: `Max ${MAX_CONTACT_PREF_LENGTH} chars` } }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Preferences</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} maxLength={MAX_CONTACT_PREF_LENGTH} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          rules={{ maxLength: { value: MAX_BIO_LENGTH, message: `Max ${MAX_BIO_LENGTH} chars` } }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea {...field} rows={4} value={field.value ?? ''} maxLength={MAX_BIO_LENGTH} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </Form>
  );
} 