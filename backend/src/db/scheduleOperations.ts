import { RowDataPacket } from "mysql2/promise";
import { conn } from ".";
import { ScheduleType } from "../types/ScheduleType";

/**
 * Retrieves the schedule from the database.
 * @returns A promise that resolves to an array of schedules or undefined if no schedules are found.
 */
export async function getSchedule(): Promise<ScheduleType[] | undefined> {
  const sql = "SELECT * FROM schedule";

  try {
    const [results] = await conn.query<ScheduleType[] & RowDataPacket[]>(sql);

    if (results.length) {
      return results;
    }
  } catch (err) {
    console.error("Error fetching schedule:", err);
    throw err;
  }
}

/**
 * Adds a new schedule to the database.
 * @param schedule - The schedule information to add.
 * @returns A promise that resolves when the schedule is added.
 */
export async function addSchedule(schedule: ScheduleType): Promise<void> {
  const sql =
    "INSERT INTO schedule (film_id, schedule_datetime, capacity) VALUES (?, ?, ?)";

  try {
    await conn.execute(sql, [
      schedule.film_id,
      schedule.schedule_datetime,
      schedule.capacity,
    ]);
  } catch (err) {
    console.error("Error adding schedule:", err);
    throw err;
  }
}

/**
 * Removes a schedule from the database by schedule datetime.
 * @param schedule - The schedule information to remove.
 * @returns A promise that resolves when the schedule is removed.
 */
export async function removeSchedule(schedule: any): Promise<void> {
  const sql = "DELETE FROM schedule WHERE schedule_datetime = ?";

  try {
    await conn.execute(sql, [schedule.schedule_datetime]);
  } catch (err) {
    console.error("Error removing schedule:", err);
    throw err;
  }
}

/**
 * Removes a schedule from the database by schedule ID.
 * @param scheduleId - The ID of the schedule to remove.
 * @returns A promise that resolves when the schedule is removed.
 */
export async function removeScheduleById(scheduleId: number): Promise<void> {
  const sql = "DELETE FROM schedule WHERE id = ?";

  try {
    await conn.execute(sql, [scheduleId]);
  } catch (err) {
    console.error("Error removing schedule:", err);
    throw err;
  }
}
