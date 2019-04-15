# --- !Ups

ALTER TABLE delivery_period ADD COLUMN max_queue_size INTEGER DEFAULT 0 not null;
ALTER TABLE delivery_period ALTER COLUMN class_period SET DEFAULT 0;
ALTER TABLE delivery_period ALTER COLUMN class_period SET NOT NULL;

# --- !Downs

ALTER TABLE delivery_period DROP COLUMN max_queue_size;
ALTER TABLE delivery_period ALTER COLUMN class_period SET DEFAULT NULL;
ALTER TABLE delivery_period ALTER COLUMN class_period DROP NOT NULL;
