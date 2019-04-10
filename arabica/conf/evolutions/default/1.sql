# --- !Ups

create table delivery_period (
  id                            bigserial not null,
  deprecated_at                 timestamp,
  status                        INTEGER DEFAULT 0 not null,
  class_period                  integer,
  organization_id               bigint,
  created_at                    timestamp not null,
  updated_at                    timestamp not null,
  constraint pk_delivery_period primary key (id)
);

create table orders (
  id                            bigserial not null,
  deprecated_at                 timestamp,
  status                        INTEGER DEFAULT 0 not null,
  user_id                       bigint not null,
  product_id                    bigint not null,
  recipient                     varchar(255) not null,
  location                      varchar(255) not null,
  delivery_period_id            bigint not null,
  notes                         varchar(255),
  created_at                    timestamp not null,
  updated_at                    timestamp not null,
  constraint pk_orders primary key (id)
);

create table organization (
  id                            bigserial not null,
  deprecated_at                 timestamp,
  status                        INTEGER DEFAULT 0 not null,
  name                          varchar(255),
  secret_api_key                varchar(255),
  publishable_api_key           varchar(255),
  created_at                    timestamp not null,
  updated_at                    timestamp not null,
  constraint pk_organization primary key (id)
);

create table payment (
  id                            bigserial not null,
  deprecated_at                 timestamp,
  status                        INTEGER DEFAULT 0 not null,
  amount                        integer not null,
  user_id                       bigint not null,
  type                          varchar(255) not null,
  stripe_charge_id              varchar(255),
  stripe_card_id                varchar(255),
  stripe_refund_id              varchar(255),
  created_at                    timestamp not null,
  updated_at                    timestamp not null,
  constraint pk_payment primary key (id)
);

create table product (
  id                            bigserial not null,
  deprecated_at                 timestamp,
  status                        INTEGER DEFAULT 0 not null,
  name                          varchar(255) not null,
  price                         integer not null,
  description                   varchar(255),
  organization_id               bigint not null,
  created_at                    timestamp not null,
  updated_at                    timestamp not null,
  constraint pk_product primary key (id)
);

create table refund (
  id                            bigserial not null,
  deprecated_at                 timestamp,
  status                        INTEGER DEFAULT 0 not null,
  amount                        integer not null,
  user_id                       bigint not null,
  created_at                    timestamp not null,
  updated_at                    timestamp not null,
  constraint pk_refund primary key (id)
);

create table users (
  id                            bigserial not null,
  deprecated_at                 timestamp,
  status                        INTEGER DEFAULT 0 not null,
  firstname                     varchar(255) not null,
  lastname                      varchar(255) not null,
  organization_id               bigint not null,
  email                         varchar(255) not null,
  last_logged_in                timestamp,
  role                          integer not null,
  firebase_user_id              varchar(255),
  balance                       integer not null,
  stripe_customer_id            varchar(255),
  created_at                    timestamp not null,
  updated_at                    timestamp not null,
  constraint pk_users primary key (id)
);

create index ix_delivery_period_organization_id on delivery_period (organization_id);
alter table delivery_period add constraint fk_delivery_period_organization_id foreign key (organization_id) references organization (id) on delete restrict on update restrict;

create index ix_orders_user_id on orders (user_id);
alter table orders add constraint fk_orders_user_id foreign key (user_id) references users (id) on delete restrict on update restrict;

create index ix_orders_product_id on orders (product_id);
alter table orders add constraint fk_orders_product_id foreign key (product_id) references product (id) on delete restrict on update restrict;

create index ix_orders_delivery_period_id on orders (delivery_period_id);
alter table orders add constraint fk_orders_delivery_period_id foreign key (delivery_period_id) references delivery_period (id) on delete restrict on update restrict;

create index ix_payment_user_id on payment (user_id);
alter table payment add constraint fk_payment_user_id foreign key (user_id) references users (id) on delete restrict on update restrict;

create index ix_product_organization_id on product (organization_id);
alter table product add constraint fk_product_organization_id foreign key (organization_id) references organization (id) on delete restrict on update restrict;

create index ix_refund_user_id on refund (user_id);
alter table refund add constraint fk_refund_user_id foreign key (user_id) references users (id) on delete restrict on update restrict;

create index ix_users_organization_id on users (organization_id);
alter table users add constraint fk_users_organization_id foreign key (organization_id) references organization (id) on delete restrict on update restrict;


# --- !Downs

alter table if exists delivery_period drop constraint if exists fk_delivery_period_organization_id;
drop index if exists ix_delivery_period_organization_id;

alter table if exists orders drop constraint if exists fk_orders_user_id;
drop index if exists ix_orders_user_id;

alter table if exists orders drop constraint if exists fk_orders_product_id;
drop index if exists ix_orders_product_id;

alter table if exists orders drop constraint if exists fk_orders_delivery_period_id;
drop index if exists ix_orders_delivery_period_id;

alter table if exists payment drop constraint if exists fk_payment_user_id;
drop index if exists ix_payment_user_id;

alter table if exists product drop constraint if exists fk_product_organization_id;
drop index if exists ix_product_organization_id;

alter table if exists refund drop constraint if exists fk_refund_user_id;
drop index if exists ix_refund_user_id;

alter table if exists users drop constraint if exists fk_users_organization_id;
drop index if exists ix_users_organization_id;

drop table if exists delivery_period cascade;

drop table if exists orders cascade;

drop table if exists organization cascade;

drop table if exists payment cascade;

drop table if exists product cascade;

drop table if exists refund cascade;

drop table if exists users cascade;

