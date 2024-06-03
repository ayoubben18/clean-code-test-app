import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { pinoLogger } from "../logger";

//expenses type

// creeate some expenses

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(255),
  amount: z.number().int().positive(),
});

const postSchema = expenseSchema.omit({ id: true });

const expensesList: z.infer<typeof expenseSchema>[] = [
  { id: 1, title: "Rent", amount: 1000 },
  { id: 2, title: "Food", amount: 200 },
  { id: 3, title: "Transport", amount: 100 },
];

export const expensesRoute = new Hono()
  .get("/", async (c) => {
    return c.json({
      expenses: expensesList,
    });
  })
  .post(
    "/",
    zValidator("json", postSchema, (result, c) => {
      if (!result.success) {
        pinoLogger.error("Invalid type");
        return c.text("Invalid informations", 400);
      }
    }),
    async (c) => {
      const expense = await c.req.valid("json");
      pinoLogger.info(expense);
      return c.json({ message: "Expense created" });
    }
  )
  .get("/:id{[0-9]+}", (c) => {
    const id = c.req.param("id");
    return c.json(
      expensesList.find((e) => e.id === Number.parseInt(id)) || {
        message: "Expense not found",
        status: 404,
      }
    );
  })
  .get("/total-spent", (c) => {
    return c.json({
      total: expensesList.reduce((acc, e) => acc + e.amount, 0),
    });
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = c.req.param("id");
    // remove it
    const index = expensesList.findIndex((e) => e.id === Number.parseInt(id));
    if (index < 0) {
      return c.json({
        message: "Expense not found",
        status: 404,
      });
    }
    expensesList.splice(index, 1);
    return c.json({
      message: "Expense Deleted",
      status: 200,
    });
  })
  .put("/:id", (c) => {
    return c.json({ message: "Expense updated" });
  });
