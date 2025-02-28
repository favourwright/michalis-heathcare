export type BookingData = {
  id: string;
  patient: string;
  specialist?: string;
  consultationSummary?: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  status: BookingStatus;
}

export enum BookingStatus {
  UPCOMING = 'upcoming',
  PAST = 'past',
  CANCELED = 'canceled'
}