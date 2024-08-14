// components/AddNewSchedule.tsx
import { useState } from "react";
import { useStore } from "zustand";
import { filmStore } from "../../zustand/filmStore";
import { ScheduleType } from "../../types/ScheduleType";

export const AddSchedule = () => {
  const { films, addSchedule } = useStore(filmStore);
  const [scheduleToAdd, setScheduleToAdd] = useState<ScheduleType>({
    film_id: films?.length > 0 ? films[0].id : 0,
    schedule_datetime: "",
    capacity: 50,
  } as ScheduleType);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setScheduleToAdd((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    await addSchedule(scheduleToAdd);
    setScheduleToAdd({
      film_id: films.length > 0 ? films[0].id : 0,
      schedule_datetime: "",
      capacity: 50,
    } as ScheduleType);
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };
  return (
    <form
      className="card bg-base-300 w-screen max-w-lg mx-auto shadow-xl form-control max-h-screen overflow-y-auto"
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
