import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import { BookingData, BookingStatus } from "@/types/booking";

const bookingCollection = "booking"; // where to store user data

export const createBooking = async (
  booking: Omit<BookingData, 'id' | 'createdAt' | 'updatedAt' | 'specialist' | 'status'>
) => {
  const ref = collection(db, bookingCollection); // Get a reference to the collection
  const docRef = await addDoc(ref, {
    ...booking,
    status: BookingStatus.UPCOMING,
    specialist: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return docRef
};
