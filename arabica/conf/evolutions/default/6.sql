# --- !Ups

ALTER TABLE orders ADD COLUMN drink_size varchar DEFAULT 'medium' not null;

# --- !Downs

ALTER TABLE orders DROP COLUMN drink_size;
