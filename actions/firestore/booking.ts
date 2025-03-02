import { db } from "@/firebase";
import { collection, addDoc, Timestamp, getDocs, query, where } from "firebase/firestore";
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
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  return docRef
};

export const fetchUserBookings = async (uid: string): Promise<BookingData[]> => {
  const ref = collection(db, bookingCollection);
  const q = query(ref, where("patient", "==", uid)); // Filter by user ID
  const querySnapshot = await getDocs(q);

  const data: BookingData[] = querySnapshot.docs.map((doc) => {
    const docData = doc.data();
    return {
      ...docData,
      id: doc.id, // Ensure the document ID is included
      createdAt: docData.createdAt.toDate(), // Convert Firestore Timestamp to Date
      updatedAt: docData.updatedAt.toDate(),
      date: docData.date.toDate(),
    } as BookingData;
  });

  return data;
};