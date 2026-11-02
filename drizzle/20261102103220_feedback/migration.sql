CREATE TYPE "feedback_kind" AS ENUM('idea', 'problem', 'other', 'avatar_suggestion', 'reward_suggestion');--> statement-breakpoint
CREATE TYPE "feedback_source" AS ENUM('student_home', 'registration_avatar', 'profile_avatar', 'shop');--> statement-breakpoint
CREATE TABLE "feedback" (
	"id" uuid PRIMARY KEY,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"kind" "feedback_kind" NOT NULL,
	"source" "feedback_source" NOT NULL,
	"message" text NOT NULL,
	"student_id" integer,
	"student_name" text,
	CONSTRAINT "feedback_message_length_check" CHECK (char_length("message") between 3 and 2000),
	CONSTRAINT "feedback_message_trimmed_check" CHECK ("message" = btrim("message")),
	CONSTRAINT "feedback_author_check" CHECK (("student_id" is null and "student_name" is null) or ("student_id" is not null and "student_name" is not null)),
	CONSTRAINT "feedback_source_author_check" CHECK ("source" = 'registration_avatar' or "student_id" is not null),
	CONSTRAINT "feedback_source_kind_check" CHECK (("source" = 'student_home' and "kind" in ('idea', 'problem', 'other')) or ("source" in ('registration_avatar', 'profile_avatar') and "kind" = 'avatar_suggestion') or ("source" = 'shop' and "kind" = 'reward_suggestion'))
);
--> statement-breakpoint
CREATE TABLE "feedback_rate_limit" (
	"bucket" text PRIMARY KEY,
	"window_started_at" timestamp with time zone NOT NULL,
	"count" integer NOT NULL,
	CONSTRAINT "feedback_rate_limit_count_check" CHECK ("count" > 0)
);
--> statement-breakpoint
CREATE INDEX "feedback_created_at_idx" ON "feedback" ("created_at");