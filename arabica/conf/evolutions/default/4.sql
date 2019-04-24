# --- !Ups

create table order_modifier (
  id                           bigserial not null,
  deprecated_at                timestamp,
  created_at                   timestamp not null,
  updated_at                   timestamp not null,
  status                       INTEGER DEFAULT 0 not null,
  name                         varchar(255) not null,
  organization_id              bigint,
  constraint pk_order_modifier primary key (id)
);

create table order_modifier_orders (
  order_id                     bigserial not null,
  order_modifier_id            bigserial not null,
  constraint pk_order_modifier_orders primary key (order_id, order_modifier_id)
);

create index ix_order_modifier_orders_order_id on order_modifier_orders (order_id);
create index ix_order_modifier_orders_order_modifier_id on order_modifier_orders (order_modifier_id);

alter table order_modifier_orders add constraint fk_order_modifier_orders_order_id foreign key (order_id) references orders (id) on delete restrict on update restrict;
alter table order_modifier_orders add constraint fk_order_modifier_orders_order_modifier_id foreign key (order_modifier_id) references order_modifier (id) on delete restrict on update restrict;

# --- !Downs


alter table if exists order_modifier_orders drop constraint if exists fk_order_modifier_orders_order_id;
alter table if exists order_modifier_orders drop constraint if exists fk_order_modifier_orders_order_modifier_id;
drop index if exists ix_order_modifier_orders_order_id;
drop index if exists ix_order_modifier_orders_order_modifier_id;


drop table if exists order_modifier_orders cascade;
drop table if exists order_modifier cascade;
