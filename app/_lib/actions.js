"use server";
import { revalidatePath } from "next/cache";

import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const regex = /^[a-zA-Z0-9]{6,12}$/;
  if (!regex.test(nationalID))
    throw new Error("Please provide a valid national ID");
  const updatedData = {
    nationalID,
    nationality,
    countryFlag,
  };
  const { data, error } = await supabase
    .from("guests")
    .update(updatedData)
    .eq("id", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}

export async function signInAction() {
  await signIn("google", {
    redirectTo: "/account",
  });
}

export async function updateReservation(formData) {
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations").slice(0, 100);
  const id = Number(formData.get("id"));
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const guestBookings = await getBookings(session.user.guestId);
  const guesBookingIds = guestBookings.map((booking) => booking.id);
  if (!guesBookingIds.includes(id))
    throw new Error("You are not allowed to update this reservation");
  const updatedFields = { numGuests, observations };
  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${id}`);
  redirect("/account/reservations");
}

export async function signOutAction() {
  await signOut({
    redirectTo: "/",
  });
}

//-----------------
//-----------------
//-----------------
export async function createReservation(bookingData, formData) {
  const session = await auth();
  if (!session)
    throw new Error("You are not allowed to create this reservation");
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations").slice(0, 100);
  const newBooking = {
    ...bookingData,
    numGuests,
    observations,
    guestId: session.user.guestId,
  };
  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }
  revalidatePath("/account/reservations");
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}
