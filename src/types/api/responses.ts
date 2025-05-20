import {
  CaseMediator,
  CaseParticipant,
  EventSpeaker,
  MediationSession,
  Tag,
} from '../database/tables';
import {
  BlogPostWithRelations,
  CaseWithRelations,
  EventWithRelations,
  ProfileWithRelations,
} from '../database/relationships';

// Base API Response Types
export interface ApiResponse<T> {
  data: T;
  error: null;
}

export interface ApiError {
  data: null;
  error: {
    message: string;
    code: string;
    details?: unknown;
  };
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

// Pagination Types
export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

// Blog API Response Types
export type BlogPostResponse = ApiResult<BlogPostWithRelations>;
export type BlogPostsResponse = ApiResult<PaginatedResponse<BlogPostWithRelations>>;
export type TagResponse = ApiResult<Tag>;
export type TagsResponse = ApiResult<Tag[]>;

// Case API Response Types
export type CaseResponse = ApiResult<CaseWithRelations>;
export type CasesResponse = ApiResult<PaginatedResponse<CaseWithRelations>>;
export type CaseParticipantResponse = ApiResult<CaseParticipant>;
export type CaseParticipantsResponse = ApiResult<CaseParticipant[]>;
export type CaseMediatorResponse = ApiResult<CaseMediator>;
export type CaseMediatorsResponse = ApiResult<CaseMediator[]>;
export type MediationSessionResponse = ApiResult<MediationSession>;
export type MediationSessionsResponse = ApiResult<MediationSession[]>;

// Event API Response Types
export type EventResponse = ApiResult<EventWithRelations>;
export type EventsResponse = ApiResult<PaginatedResponse<EventWithRelations>>;
export type EventSpeakerResponse = ApiResult<EventSpeaker>;
export type EventSpeakersResponse = ApiResult<EventSpeaker[]>;

// Profile API Response Types
export type ProfileResponse = ApiResult<ProfileWithRelations>;
export type ProfilesResponse = ApiResult<PaginatedResponse<ProfileWithRelations>>;

// Dashboard Stats Response Types
export interface DashboardStats {
  cases: {
    total: number;
    byStatus: Record<string, number>;
    byCategory: Record<string, number>;
  };
  events: {
    total: number;
    upcoming: number;
    byModality: Record<string, number>;
  };
  mediators: {
    total: number;
    available: number;
    byLanguage: Record<string, number>;
  };
  blogPosts: {
    total: number;
    published: number;
    byStatus: Record<string, number>;
  };
}

export type DashboardStatsResponse = ApiResult<DashboardStats>;

// Search Response Types
export interface SearchResult<T> {
  item: T;
  score: number;
  highlights?: Record<string, string[]>;
}

export interface SearchResponse<T> {
  results: SearchResult<T>[];
  total: number;
  query: string;
  filters?: Record<string, unknown>;
}

export type CaseSearchResponse = ApiResult<SearchResponse<CaseWithRelations>>;
export type EventSearchResponse = ApiResult<SearchResponse<EventWithRelations>>;
export type ProfileSearchResponse = ApiResult<SearchResponse<ProfileWithRelations>>; 