CREATE TABLE `enquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`account_email` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`occasion` text NOT NULL,
	`event_date` text DEFAULT '' NOT NULL,
	`guests` integer,
	`budget` integer,
	`ideas` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'New' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `enquiries_owner_created` ON `enquiries` (`user_id`,`created_at`);