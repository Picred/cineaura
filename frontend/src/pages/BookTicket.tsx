// components/BookTicketForm.tsx
import { useState } from "react";
import { useStore } from "zustand";
import { filmStore } from "../zustand/filmStore";
import { TicketType } from "../types/TicketType";
import { useSearchParams } from "react-router-dom";

export const BookTicket = () => {
  const films = useStore(filmStore);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTicket((prev: TicketType) => ({
      ...prev,
      [name]: value,
    }));
    console.log(ticket);
  };

  const handleBookTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      //   await films.addTicket(ticket);
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
