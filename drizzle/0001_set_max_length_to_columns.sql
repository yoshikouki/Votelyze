ALTER TABLE "poll_options" ALTER COLUMN "label" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "polls" ALTER COLUMN "title" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "polls" ALTER COLUMN "description" SET DATA TYPE varchar(1000);