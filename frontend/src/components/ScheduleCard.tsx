import { useState } from "react";
import { useStore } from "zustand";
import { ScheduleType } from "../types/ScheduleType";
import { filmStore } from "../zustand/filmStore";
import { formatIsoDate } from "../utils/isoDate";
import { authStore } from "../zustand/AuthStore";
import { notify } from "../utils/notify";
import { useNavigate } from "react-router-dom";
import { TicketType } from "../types/TicketType"; // Importa TicketType

export const ScheduleCard = ({
  id,
  film_id,
  schedule_datetime,
  capacity,
}: ScheduleType) => {
  const films = useStore(filmStore);
  const film = films.getFilm(film_id);
  const auth = useStore(authStore);
  const navigate = useNavigate();

  const handleBookNow = () => {
    if (capacity > 0) {
      const modal = document.getElementById(`modal_${id}`) as HTMLDialogElement;
      modal?.showModal();
    } else {
      notify("No more seats available", "error", auth.theme);
    }
  };

  const handleConfirmBooking = async () => {
    if (!auth.username) {
      notify("Please login to book a ticket", "error", auth.theme);
      navigate("/login");
      return;
    } else {
      try {
        const modal = document.getElementById(
          `modal_${id}`
        ) as HTMLDialogElement;
        modal?.close();

        const ticketData: TicketType = {
          user_id: Number(auth.userId),
          film_id: film_id,
          schedule_id: Number(id),
          price: 10.0,
          seat_number: 2,
        };

        await films.addTicket(ticketData);
      } catch (error) {
        console.error("Failed to book ticket:", error);
        notify("Failed to book ticket. Please try again.", "error", auth.theme);
      }
    }
  };

  const handleCancelBooking = () => {
    const modal = document.getElementById(`modal_${id}`) as HTMLDialogElement;
    modal?.close();
  };

  return (
    <>
      <div className="relative group bg-base-100 w-64 image-full shadow-2xl">
        <figure>
          <img
            src={film?.img}
            alt="Film image"
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-70 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h2 className="text-xl font-bold">{film?.title}</h2>
          <p className="mt-2 text-wrap">{formatIsoDate(schedule_datetime)}</p>
          <div className="mt-4">
            <button className="btn btn-primary" onClick={handleBookNow}>
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <dialog id={`modal_${id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{film?.title}</h3>
          <p className="py-4">
            Are you sure you want to book a ticket for this schedule?
          </p>
          <p>Date and Time: {formatIsoDate(schedule_datetime)}</p>
          <p>Seats available: {capacity}</p>
          <div className="modal-action">
            <button className="btn" onClick={handleCancelBooking}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleConfirmBooking}>
              Confirm Booking
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
