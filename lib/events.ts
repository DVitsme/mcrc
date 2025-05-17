import { supabase } from '@/lib/supabase';

export interface Event {
  id: string;
  name: string;
  slug: string;
  event_type_badge?: string;
  summary?: string;
  description_content?: string;
  featured_image_url?: string;
  supporting_image_url?: string;
  event_start_time: string;
  event_end_time?: string;
  event_modality: string;
  venue_name?: string;
  location_address?: string;
  online_meeting_url?: string;
  online_meeting_details?: string;
  is_free: boolean;
  cost_amount?: number;
  cost_currency?: string;
  cost_description?: string;
  is_registration_required: boolean;
  external_registration_link?: string;
  registration_deadline?: string;
  event_contact_person_name?: string;
  event_contact_email?: string;
  event_contact_phone?: string;
  additional_notes_structured?: { item: string }[];
  status: string;
  created_at: string;
  updated_at: string;
}

export interface EventSpeaker {
  id: string;
  speaker_name: string;
  speaker_title?: string;
  speaker_bio?: string;
  speaker_avatar_url?: string;
  display_order?: number;
}

export async function getEventBySlug(slug: string) {
  // Fetch event
  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !event) return null;

  // Fetch speakers
  const { data: speakers } = await supabase
    .from('event_speakers')
    .select('*')
    .eq('event_id', event.id)
    .order('display_order', { ascending: true });

  // Parse notes
  let notes: { item: string }[] = [];
  try {
    notes = event.additional_notes_structured ? JSON.parse(event.additional_notes_structured) : [];
  } catch {
    notes = [];
  }

  return {
    ...event,
    additional_notes_structured: notes,
    speakers: speakers || [],
  };
}

export async function getAllPublishedEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'published')
    .order('event_start_time', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }
  return data || [];
}

export async function getAllEventTypeBadges() {
  const { data, error } = await supabase
    .from('events')
    .select('event_type_badge')
    .eq('status', 'published')
    .neq('event_type_badge', null)
    .order('event_type_badge', { ascending: true });

  if (error) {
    console.error('Error fetching event_type_badge:', error);
    return [];
  }
  // Get unique, non-empty badges
  const badges = Array.from(new Set((data || []).map(e => e.event_type_badge).filter(Boolean)));
  return badges;
}