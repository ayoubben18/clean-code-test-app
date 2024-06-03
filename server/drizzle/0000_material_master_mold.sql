CREATE TABLE `expenses` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`title` text NOT NULL,
	`amount` integer DEFAULT 0 NOT NULL,
	`user_id` text NOT NULL
);
