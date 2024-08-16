import { RowDataPacket } from "mysql2/promise";
import { conn } from ".";
import { TicketType } from "../types/TicketType";

/**
 * Retrieves tickets for a given username.
 * @param username - The username to search for tickets.
 * @returns A promise that resolves to an array of tickets or undefined if no tickets are found.
 */
export async function getTickets(
  username: string
): Promise<TicketType[] | undefined> {
  const sql =
    "SELECT * FROM tickets WHERE user_id = (SELECT id FROM users WHERE username = ?)";

  try {
    const [results] = await conn.query<TicketType[] & RowDataPacket[]>(sql, [
      username,
    ]);
    if (results.length) {
      return results;
    }
  } catch (err) {
    console.error("Error fetching tickets:", err);
    throw err;
  }
}

/**
 * Adds a new ticket to the database and updates the schedule capacity.
 * @param ticket - The ticket information to add.
 * @returns A promise that resolves when the ticket is added.
 */
export async function addTicket(ticket: TicketType): Promise<void> {
  const insertTicketSql =
    "INSERT INTO tickets (user_id, film_id, schedule_id, seat_number, price) VALUES (?, ?, ?, ?, ?)";
  const updateCapacitySql =
    "UPDATE schedule SET capacity = capacity - 1 WHERE id = ? AND capacity > 0";

  const connection = await conn.getConnection();
  try {
    await connection.beginTransaction();

    await connection.execute(insertTicketSql, [
      ticket.user_id,
      ticket.film_id,
      ticket.schedule_id,
      ticket.seat_number,
      ticket.price,
    ]);

    const [result] = await connection.execute(updateCapacitySql, [
      ticket.schedule_id,
    ]);

    if ((result as any).affectedRows === 0) {
      throw new Error("No seats available or invalid schedule ID");
    }

    await connection.commit();
  } catch (err) {
    await connection.rollback();
    console.error("Error adding ticket:", err);
    throw err;
  } finally {
    connection.release();
  }
}

/**
 * Deletes a ticket from the database and updates the schedule capacity.
 * @param ticketId - The ID of the ticket to delete.
 * @returns A promise that resolves when the ticket is deleted.
 */
export const deleteTicket = async (ticketId: number): Promise<void> => {
  const getTicketSql = "SELECT schedule_id FROM tickets WHERE id = ?";
  const deleteTicketSql = "DELETE FROM tickets WHERE id = ?";
  const updateCapacitySql =
    "UPDATE schedule SET capacity = capacity + 1 WHERE id = ?";

  const connection = await conn.getConnection();
  try {
    await connection.beginTransaction();

    const [rows] = await connection.execute(getTicketSql, [ticketId]);
    const ticket = (rows as any)[0];

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    const [deleteResult] = await connection.execute(deleteTicketSql, [
      ticketId,
    ]);

    if ((deleteResult as any).affectedRows === 0) {
      throw new Error("Failed to delete ticket");
    }

    const [updateResult] = await connection.execute(updateCapacitySql, [
      ticket.schedule_id,
    ]);

    if ((updateResult as any).affectedRows === 0) {
      throw new Error("Failed to update schedule capacity");
    }

    await connection.commit();
  } catch (err) {
    await connection.rollback();
    console.error("Error deleting ticket:", err);
    throw err;
  } finally {
    connection.release();
  }
};
