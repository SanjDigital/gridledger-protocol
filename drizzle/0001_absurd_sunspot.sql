CREATE TABLE `friction_analytics` (
	`event_id` varchar(36) NOT NULL,
	`event_type` enum('mode_selection','anchor_link_open','friction_point_enter','friction_point_exit','form_start','form_submit','form_abandon') NOT NULL,
	`mode_selected` enum('Executive','Technical','Audit'),
	`anchor_link_type` enum('audit_trail','cycle_data','cycle_replay'),
	`section_name` varchar(100),
	`duration_ms` bigint,
	`scroll_position` int,
	`session_id` varchar(36),
	`user_agent` text,
	`ip_address` varchar(45),
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `friction_analytics_event_id` PRIMARY KEY(`event_id`)
);
--> statement-breakpoint
CREATE TABLE `mandate_submissions` (
	`submission_id` varchar(36) NOT NULL,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	`institution_name` varchar(255) NOT NULL,
	`authorisation_level` enum('Board','Risk Committee','Credit Officer','IT Operations') NOT NULL,
	`capital_range` enum('<10M','10M-100M','100M-1B','>1B') NOT NULL,
	`sector` varchar(100) NOT NULL,
	`mode_viewed` enum('Executive','Technical','Audit') NOT NULL DEFAULT 'Executive',
	`friction_point` varchar(255),
	`anchor_links_opened` json,
	`declaration_text` text NOT NULL,
	`user_agent` text,
	`ip_address` varchar(45),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `mandate_submissions_submission_id` PRIMARY KEY(`submission_id`)
);
