export type BookingData = {
  id?: string;
  patient: string;
  specialist: string | null;
  specialization: string | null;
  consultationSummary?: string;
  iKnowWhatImDoing?: boolean;
  meetingLink?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  status: BookingStatus;
}

export enum BookingStatus {
  UPCOMING = 'upcoming',
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}