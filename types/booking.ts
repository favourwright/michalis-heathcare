export type BookingData = {
  id?: string;
  patient: string;
  specialist: string | null;
  specialization: string | null;
  consultationSummary?: string;
  iKnowWhatImDoing?: boolean;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  status: BookingStatus;
}

export enum BookingStatus {
  UPCOMING = 'upcoming',
  PAST = 'past',
  CANCELED = 'canceled'
}