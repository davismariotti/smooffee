# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table card (
  id                            bigint auto_increment not null,
  deprecated_at                 timestamp,
  status                        INTEGER DEFAULT 0 not null,
  user_id                       bigint not null,
  token                         varchar(255),
  created_at                    timestamp not null,
  updated_at                    timestamp not null,
  constraint pk_card primary key (id)
);

create table orders (
  id                            bigint auto_increment not null,
  deprecated_at                 timestamp,
  status                        INTEGER DEFAULT 0 not null,
  user_id                       bigint not null,
  location                      varchar(255) not null,
  notes                         varchar(255),
  created_at                    timestamp not null,
  updated_at                    timestamp not null,
  constraint pk_orders primary key (id)
);

create table organization (
  id                            bigint auto_increment not null,
  deprecated_at                 timestamp,
  status                        INTEGER DEFAULT 0 not null,
  name                          varchar(255),
  created_at                    timestamp not null,
  updated_at                    timestamp not null,
  constraint pk_organization primary key (id)
);

create table product (
  id                            bigint auto_increment not null,
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
  id                            bigint auto_increment not null,
  deprecated_at                 timestamp,
  status                        INTEGER DEFAULT 0 not null,
  amount                        integer not null,
  user_id                       bigint not null,
  created_at                    timestamp not null,
  updated_at                    timestamp not null,
  constraint pk_refund primary key (id)
);

create table users (
  id                            bigint auto_increment not null,
  deprecated_at                 timestamp,
  status                        INTEGER DEFAULT 0 not null,
  firstname                     varchar(255) not null,
  lastname                      varchar(255) not null,
  organization_id               bigint not null,
  email                         varchar(255) not null,
  last_logged_in                timestamp,
  role                          integer not null,
  firebase_user_id              varchar(255),
  created_at                    timestamp not null,
  updated_at                    timestamp not null,
  constraint pk_users primary key (id)
);

create index ix_card_user_id on card (user_id);
alter table card add constraint fk_card_user_id foreign key (user_id) references users (id) on delete restrict on update restrict;

create index ix_orders_user_id on orders (user_id);
alter table orders add constraint fk_orders_user_id foreign key (user_id) references users (id) on delete restrict on update restrict;

create index ix_product_organization_id on product (organization_id);
alter table product add constraint fk_product_organization_id foreign key (organization_id) references organization (id) on delete restrict on update restrict;

create index ix_refund_user_id on refund (user_id);
alter table refund add constraint fk_refund_user_id foreign key (user_id) references users (id) on delete restrict on update restrict;

create index ix_users_organization_id on users (organization_id);
alter table users add constraint fk_users_organization_id foreign key (organization_id) references organization (id) on delete restrict on update restrict;


# --- !Downs

alter table card drop constraint if exists fk_card_user_id;
drop index if exists ix_card_user_id;

alter table orders drop constraint if exists fk_orders_user_id;
drop index if exists ix_orders_user_id;

alter table product drop constraint if exists fk_product_organization_id;
drop index if exists ix_product_organization_id;

alter table refund drop constraint if exists fk_refund_user_id;
drop index if exists ix_refund_user_id;

alter table users drop constraint if exists fk_users_organization_id;
drop index if exists ix_users_organization_id;

drop table if exists card;

drop table if exists orders;

drop table if exists organization;

drop table if exists product;

drop table if exists refund;

drop table if exists users;

