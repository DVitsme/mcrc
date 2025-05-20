import {
  BlogPost,
  Case,
  CaseMediator,
  CaseParticipant,
  Event,
  EventSpeaker,
  MediationSession,
  Profile,
  Tag,
} from './tables';

// Blog System Relationships
export interface BlogPostWithRelations extends BlogPost {
  author: Profile | null;
  tags: Tag[];
}

export interface TagWithRelations extends Tag {
  blog_posts: BlogPost[];
}

// Case System Relationships
export interface CaseWithRelations extends Case {
  assigned_coordinator: Profile | null;
  participants: CaseParticipantWithRelations[];
  mediators: CaseMediatorWithRelations[];
  sessions: MediationSession[];
}

export interface CaseParticipantWithRelations extends CaseParticipant {
  profile: Profile;
  case: Case;
}

export interface CaseMediatorWithRelations extends CaseMediator {
  mediator: Profile;
  case: Case;
}

export interface MediationSessionWithRelations extends MediationSession {
  case: Case;
  recorded_by: Profile | null;
}

// Event System Relationships
export interface EventWithRelations extends Event {
  created_by: Profile | null;
  speakers: EventSpeaker[];
}

export interface EventSpeakerWithRelations extends EventSpeaker {
  event: Event;
}

// Profile Relationships
export interface ProfileWithRelations extends Profile {
  authored_posts: BlogPost[];
  assigned_cases: Case[];
  mediated_cases: Case[];
  participated_cases: CaseParticipant[];
  recorded_sessions: MediationSession[];
  created_events: Event[];
} 