// components/AddNewSchedule.tsx
import { useState } from "react";
import { useStore } from "zustand";
import { filmStore } from "../../zustand/filmStore";
import { ScheduleType } from "../../types/ScheduleType";

/**
 * The AddSchedule component provides a form for adding a new schedule to the film store. It uses Zustand for state management
 * and maintains local state for the schedule details being added.
 *
 * @returns {JSX.Element} The rendered AddSchedule component.
 */
export const AddSchedule = (): JSX.Element => {
  const { films, addSchedule } = useStore(filmStore);
  const [scheduleToAdd, setScheduleToAdd] = useState<ScheduleType>({
    film_id: films?.length > 0 ? films[0].id : 0,
    schedule_datetime: "",
    capacity: 50,
  } as ScheduleType);

  /**
   * Handles changes to the form inputs and updates the local state `scheduleToAdd`.
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - The change event triggered by the form input.
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setScheduleToAdd((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Handles the form submission to add a new schedule to the film store.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleAddSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    await addSchedule(scheduleToAdd);
    setScheduleToAdd({
      film_id: films.length > 0 ? films[0].id : 0,
      schedule_datetime: "",
      capacity: 50,
    } as ScheduleType);
  };
  /**
   * Returns the current date and time in a format suitable for the `datetime-local` input.
   *
   * @returns {string} - The current date and time in ISO format, sliced to remove seconds.
   */
  const getCurrentDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };
  return (
    <form
      className="card bg-base-300 max-w-lg mx-auto shadow-xl form-control max-h-screen overflow-y-auto"
      onSubmit={handleAddSchedule}
    >
      <div className="card-body flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="font-bold">Film</span>
          <select
            name="film_id"
            value={scheduleToAdd.film_id}
            className="select select-bordered"
            onChange={handleChange}
            required
          >
            {films?.map((film) => (
              <option key={film.id} value={film.id}>
                {film.title}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-bold">Schedule Datetime</span>
          <input
            required
            type="datetime-local"
            name="schedule_datetime"
            value={scheduleToAdd.schedule_datetime}
            className="input input-bordered"
            onChange={handleChange}
            min={getCurrentDateTime()}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-bold">Capacity</span>
          <input
            required
            type="number"
            name="capacity"
            value={scheduleToAdd.capacity}
            min={1}
            className="input input-bordered"
            onChange={handleChange}
          />
        </label>

        <div className="card-actions justify-end">
          <button type="submit" className="btn btn-info">
            Add schedule
          </button>
        </div>
      </div>
    </form>
  );
};
