# --- !Ups

ALTER TABLE order_modifier ADD COLUMN additional_cost INTEGER DEFAULT 0 not null;
ALTER TABLE orders ADD COLUMN total_cost INTEGER DEFAULT 0 not null;

# --- !Downs

ALTER TABLE order_modifier DROP COLUMN additional_cost;
ALTER TABLE orders DROP COLUMN total_cost;
