import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { BookingData } from "@/types/booking";

const bookingColledtion = "booking"; // where to store user data

export const createBooking = async (booking: BookingData) => {
  const ref = doc(db, bookingColledtion);
  await setDoc(ref, booking);
}