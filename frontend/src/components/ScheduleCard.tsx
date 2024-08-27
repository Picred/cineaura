import { useState } from "react";
import { useStore } from "zustand";
import { ScheduleType } from "../types/ScheduleType";
import { filmStore } from "../zustand/filmStore";
import { formatIsoDate } from "../utils/isoDate";
import { authStore } from "../zustand/AuthStore";
import { notify } from "../utils/notify";
import { useNavigate } from "react-router-dom";
import { TicketType } from "../types/TicketType";
import { socket } from "../utils/socket";

/**
 * ScheduleCard component displays a card with schedule details and options to book or delete the schedule.
 *
 * @param {ScheduleType} props - The schedule details to display in the card.
 * @param {number} props.id - The ID of the schedule.
 * @param {number} props.film_id - The ID of the film associated with the schedule.
 * @param {string} props.schedule_datetime - The date and time of the schedule.
 * @param {number} props.capacity - The number of available seats for the schedule.
 * @returns {JSX.Element} The rendered ScheduleCard component.
 */
export const ScheduleCard = ({
  id,
  film_id,
  schedule_datetime,
  capacity,
}: ScheduleType): JSX.Element => {
  const films = useStore(filmStore);
  const film = films.getFilm(film_id);
  const auth = useStore(authStore);
  const navigate = useNavigate();

  /**
   * Opens the booking modal if there are available seats. Otherwise, shows a notification.
   */
  const handleBookNow = () => {
    if (capacity > 0) {
      const modal = document.getElementById(`modal_${id}`) as HTMLDialogElement;
      modal?.showModal();
    } else {
      notify("No more seats available", "error", auth.theme);
    }
  };

  /**
   * Confirms the booking of a ticket. If the user is not logged in, redirects to the login page.
   * Otherwise, attempts to book the ticket and updates the user's tickets.
   */
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
        films.updateTickets(auth.username);
      } catch (error) {
        console.error("Failed to book ticket:", error);
        notify("Failed to book ticket. Please try again.", "error", auth.theme);
      }
    }
  };

  /**
   * Closes the booking modal.
   */
  const handleCancelBooking = () => {
    const modal = document.getElementById(`modal_${id}`) as HTMLDialogElement;
    modal?.close();
  };

  /**
   * Emits a socket event to delete the specified schedule by its ID.
   */
  const deleteSchedule = async () => {
    socket.emit("deleteSchedule", id);
  };

  /**
   * Navigates to the film details page for the specified film ID.
   * @param filmId
   */
  const showDetails = (filmId: number) => {
    navigate(`/films/${filmId}`);
  };

  return (
    <>
      <div className="relative group bg-base-100 w-64 image-full min-h-44 shadow-2xl">
        <figure>
          <img
            src={film?.img}
            alt="Film image"
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-70 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h2 className="text-xl font-bold truncate max-w-full">
            {film?.title}
          </h2>
          <p className="mt-2 text-wrap">{formatIsoDate(schedule_datetime)}</p>
          <div className="mt-4">
            <button className="btn btn-primary" onClick={handleBookNow}>
              Book Now
            </button>

            {!auth.isAdmin && (
              <button
                className="btn btn-warning lg:ml-1"
                onClick={() => showDetails(film_id)}
              >
                Details
              </button>
            )}

            {auth.isAdmin && (
              <button
                className="btn btn-error lg:ml-1"
                onClick={deleteSchedule}
              >
                Delete Schedule
              </button>
            )}
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
