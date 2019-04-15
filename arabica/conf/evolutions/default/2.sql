# --- !Ups

ALTER TABLE delivery_period ADD COLUMN monday varchar;
ALTER TABLE delivery_period ADD COLUMN tuesday varchar;
ALTER TABLE delivery_period ADD COLUMN wednesday varchar;
ALTER TABLE delivery_period ADD COLUMN thursday varchar;
ALTER TABLE delivery_period ADD COLUMN friday varchar;

# --- !Downs

ALTER TABLE delivery_period DROP COLUMN monday;
ALTER TABLE delivery_period DROP COLUMN tuesday;
ALTER TABLE delivery_period DROP COLUMN wednesday;
ALTER TABLE delivery_period DROP COLUMN thursday;
ALTER TABLE delivery_period DROP COLUMN friday;
