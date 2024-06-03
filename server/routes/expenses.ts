import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { pinoLogger } from "../logger";
import { getUser } from "../kinde";
import { db } from "../db/drizzleClient";
import { expensesTable } from "../db/schema";
import { eq } from "drizzle-orm";

//expenses type

// creeate some expenses

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  created_at: z.date(),
  title: z.string().min(3).max(255),
  amount: z.number().int().positive(),
  user_id: z.string(),
});

const postSchema = expenseSchema.omit({
  id: true,
  created_at: true,
  user_id: true,
});

export const expensesRoute = new Hono()
  .get("/", getUser, async (c) => {
    const user = c.var.user;
    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.user_id, user.id));
    return c.json({
      expenses: expenses,
    });
  })
  .post(
    "/",
    getUser,
    zValidator("json", postSchema, (result, c) => {
      if (!result.success) {
        pinoLogger.error("Invalid type");
        return c.text("Invalid informations", 400);
      }
    }),
    async (c) => {
      const expense = await c.req.valid("json");
      const user = c.var.user;
      pinoLogger.info({ ...expense, user_id: user.id });
      await db.insert(expensesTable).values({ ...expense, user_id: user.id });
      return c.json({ message: "Expense created" });
    }
  )
  .get("/:id{[0-9]+}", getUser, async (c) => {
    const id = c.req.param("id");
    const expense = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.id, parseInt(id)));
    return c.json(
      expense || {
        message: "Expense not found",
        status: 404,
      }
    );
  })
  .get("/total-spent", getUser, async (c) => {
    const user = c.var.user;
    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.user_id, user.id));
    return c.json({
      total: expenses.reduce((acc, e) => acc + e.amount, 0),
    });
  })
  .delete("/:id{[0-9]+}", getUser, async (c) => {
    const id = c.req.param("id");
    // remove it
    const deletedExpense = await db
      .delete(expensesTable)
      .where(eq(expensesTable.id, parseInt(id)))
      .returning();
    return deletedExpense
      ? c.json({
          message: "Expense Deleted",
          status: 200,
        })
      : c.json({
          message: "Expense not found",
          status: 404,
        });
  })
  .put("/:id", getUser, (c) => {
    return c.json({ message: "Expense updated" });
  });
