export const BlogPostStatus = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const;

export const CaseParticipantRole = {
  PARTICIPANT_1: 'participant_1',
  PARTICIPANT_2: 'participant_2',
  OTHER_INVOLVED_PARTY: 'other_involved_party',
} as const;

export const CaseStatus = {
  NEW: 'new',
  UNDER_REVIEW: 'under_review',
  AWAITING_PARTICIPANT_2: 'awaiting_participant_2',
  P2_RESPONSE_RECEIVED: 'p2_response_received',
  P2_DECLINED_PENDING_CLOSURE: 'p2_declined_pending_closure',
  AWAITING_MEDIATOR_ASSIGNMENT: 'awaiting_mediator_assignment',
  AWAITING_CONSENT: 'awaiting_consent',
  SCHEDULED: 'scheduled',
  IN_PROGRESS: 'in_progress',
  FOLLOW_UP_REQUIRED: 'follow_up_required',
  ON_HOLD: 'on_hold',
  CLOSED_RESOLVED_AGREEMENT: 'closed_resolved_agreement',
  CLOSED_RESOLVED_NO_AGREEMENT: 'closed_resolved_no_agreement',
  CLOSED_UNRESOLVED: 'closed_unresolved',
  CLOSED_REJECTED_INTAKE: 'closed_rejected_intake',
  CLOSED_P2_DECLINED: 'closed_p2_declined',
  CLOSED_OTHER: 'closed_other',
} as const;

export const EventModality = {
  IN_PERSON: 'in_person',
  ONLINE: 'online',
  HYBRID: 'hybrid',
} as const;

export const EventStatus = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
} as const;

export const MainCaseCategory = {
  MEDIATION: 'Mediation',
  RESTORATIVE_JUSTICE: 'Restorative Justice',
} as const;

export const MediationSessionModality = {
  IN_PERSON: 'in_person',
  ONLINE_VIDEO: 'online_video',
  ONLINE_AUDIO_ONLY: 'online_audio_only',
  PHONE: 'phone',
  HYBRID: 'hybrid',
} as const;

export const UserRole = {
  COORDINATOR: 'coordinator',
  MEDIATOR: 'mediator',
  PARTICIPANT: 'participant',
} as const;

// Type definitions for the enums
export type BlogPostStatus = typeof BlogPostStatus[keyof typeof BlogPostStatus];
export type CaseParticipantRole = typeof CaseParticipantRole[keyof typeof CaseParticipantRole];
export type CaseStatus = typeof CaseStatus[keyof typeof CaseStatus];
export type EventModality = typeof EventModality[keyof typeof EventModality];
export type EventStatus = typeof EventStatus[keyof typeof EventStatus];
export type MainCaseCategory = typeof MainCaseCategory[keyof typeof MainCaseCategory];
export type MediationSessionModality = typeof MediationSessionModality[keyof typeof MediationSessionModality];
export type UserRole = typeof UserRole[keyof typeof UserRole]; 