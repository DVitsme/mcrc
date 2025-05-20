import {
  BlogPostStatus,
  CaseParticipantRole,
  CaseStatus,
  EventModality,
  EventStatus,
  MainCaseCategory,
  MediationSessionModality,
  UserRole,
} from './enums';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image_url: string | null;
  author_id: string | null;
  status: BlogPostStatus;
  published_at: string | null;
  meta_description: string | null;
  read_time_minutes: number | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPostTag {
  blog_post_id: string;
  tag_id: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Case {
  id: string;
  case_reference_id: string | null;
  main_category: MainCaseCategory;
  case_subtype: string | null;
  p1_full_name: string | null;
  p1_email: string | null;
  p1_phone: string | null;
  p2_full_name_by_p1: string | null;
  p2_email_by_p1: string | null;
  p2_phone_by_p1: string | null;
  p2_relationship_to_p1: string | null;
  conflict_description_by_p1: string;
  desired_outcome_by_p1: string | null;
  attempts_to_resolve_by_p1: string | null;
  conflict_description_by_p2: string | null;
  p2_willing_to_mediate: boolean | null;
  source_of_referral: string | null;
  status: CaseStatus;
  assigned_coordinator_id: string | null;
  coordinator_notes: string | null;
  rejection_closure_reason: string | null;
  rejection_closure_details: string | null;
  intake_form_submitted_at: string | null;
  p2_form_submitted_at: string | null;
  case_closed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CaseParticipant {
  id: number;
  case_id: string;
  participant_profile_id: string;
  role_in_case: CaseParticipantRole;
  consent_form_link: string | null;
  consent_form_signed_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CaseMediator {
  id: number;
  case_id: string;
  mediator_profile_id: string;
  assigned_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface MediationSession {
  id: number;
  case_id: string;
  session_number: number;
  scheduled_start_time: string;
  scheduled_end_time: string | null;
  actual_start_time: string | null;
  actual_end_time: string | null;
  modality: MediationSessionModality;
  location_details: string | null;
  attendees_notes: string | null;
  session_summary: string | null;
  outcome: string | null;
  recorded_by_coordinator_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  name: string;
  slug: string;
  event_type_badge: string | null;
  summary: string | null;
  description_content: string | null;
  featured_image_url: string | null;
  created_by_profile_id: string | null;
  event_start_time: string;
  event_end_time: string | null;
  event_modality: EventModality;
  venue_name: string | null;
  location_address: string | null;
  online_meeting_url: string | null;
  online_meeting_details: string | null;
  is_free: boolean;
  cost_amount: number | null;
  cost_currency: string | null;
  cost_description: string | null;
  is_registration_required: boolean;
  external_registration_link: string | null;
  registration_deadline: string | null;
  event_contact_person_name: string | null;
  event_contact_email: string | null;
  event_contact_phone: string | null;
  additional_notes_structured: Record<string, unknown> | null;
  status: EventStatus;
  created_at: string;
  updated_at: string;
  supporting_image_url: string | null;
}

export interface EventSpeaker {
  id: string;
  event_id: string;
  speaker_name: string;
  speaker_title: string | null;
  speaker_bio: string | null;
  speaker_avatar_url: string | null;
  display_order: number | null;
}

export interface Profile {
  id: string;
  full_name: string | null;
  role: UserRole;
  is_active: boolean;
  contact_preferences: Record<string, unknown> | null;
  skills: string[] | null;
  preferred_case_types: string[] | null;
  languages_spoken: string[] | null;
  is_available_for_new_cases: boolean | null;
  created_at: string;
  updated_at: string;
  avatar_url: string | null;
  bio: string | null;
  email: string | null;
} 