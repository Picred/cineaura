// components/BookTicketForm.tsx
import { useState } from "react";
import { TicketType } from "../types/TicketType";
import { useSearchParams } from "react-router-dom";

/**
 * BookTicket component allows users to book a ticket by filling out a form.
 *
 * @returns {JSX.Element} The rendered BookTicket component.
 */
export const BookTicket = (): JSX.Element => {
  const [params] = useSearchParams();
  const film_id = Number(params.get("film_id"));
  const schedule_id = Number(params.get("schedule_id"));
  const [ticket, setTicket] = useState<TicketType>({
    user_id: 1,
    film_id,
    schedule_id,
    seat_number: 0,
    price: 5.0,
  } as TicketType);

  /**
   * Updates the ticket state based on user input.
   *
   * @param e - The change event from the input field.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTicket((prev: TicketType) => ({
      ...prev,
      [name]: value,
    }));
    console.log(ticket);
  };

  /**
   * Handles the form submission to book a ticket.
   * Resets the ticket state after booking.
   *
   * @param e - The form submission event.
   */
  const handleBookTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setTicket({
        user_id: 1,
        film_id,
        schedule_id,
        seat_number: 0,
        price: 0.0,
      } as TicketType);
    } catch (error) {
      console.error("Failed to book ticket:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleBookTicket} className="form-control">
        <label className="flex flex-col gap-1">
          <span className="font-bold">Seat Number</span>
          <input
            required
            type="number"
            name="seat_number"
            min={1}
            value={ticket.seat_number}
            placeholder="A1"
            className="input input-bordered"
            onChange={handleChange}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-bold">Price</span>
          <input
            required
            type="number"
            name="price"
            value={ticket.price}
            placeholder="10.00"
            className="input input-bordered"
            onChange={handleChange}
          />
        </label>
        <div className="form-actions justify-end">
          <button type="submit" className="btn btn-primary">
            Book Ticket
          </button>
        </div>
      </form>
    </>
  );
};
