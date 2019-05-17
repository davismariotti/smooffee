--
-- PostgreSQL database dump
--

-- Dumped from database version 10.8 (Ubuntu 10.8-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.8 (Ubuntu 10.8-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: delivery_period; Type: TABLE; Schema: public; Owner: tom
--

CREATE TABLE public.delivery_period (
    id bigint NOT NULL,
    deprecated_at timestamp without time zone,
    status integer DEFAULT 0 NOT NULL,
    class_period integer DEFAULT 0 NOT NULL,
    organization_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    monday character varying,
    tuesday character varying,
    wednesday character varying,
    thursday character varying,
    friday character varying,
    max_queue_size integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.delivery_period OWNER TO tom;

--
-- Name: delivery_period_id_seq; Type: SEQUENCE; Schema: public; Owner: tom
--

CREATE SEQUENCE public.delivery_period_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.delivery_period_id_seq OWNER TO tom;

--
-- Name: delivery_period_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tom
--

ALTER SEQUENCE public.delivery_period_id_seq OWNED BY public.delivery_period.id;


--
-- Name: order_modifier; Type: TABLE; Schema: public; Owner: tom
--

CREATE TABLE public.order_modifier (
    id bigint NOT NULL,
    deprecated_at timestamp without time zone,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    status integer DEFAULT 0 NOT NULL,
    name character varying(255) NOT NULL,
    organization_id bigint,
    additional_cost integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.order_modifier OWNER TO tom;

--
-- Name: order_modifier_id_seq; Type: SEQUENCE; Schema: public; Owner: tom
--

CREATE SEQUENCE public.order_modifier_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_modifier_id_seq OWNER TO tom;

--
-- Name: order_modifier_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tom
--

ALTER SEQUENCE public.order_modifier_id_seq OWNED BY public.order_modifier.id;


--
-- Name: order_modifier_orders; Type: TABLE; Schema: public; Owner: tom
--

CREATE TABLE public.order_modifier_orders (
    order_id bigint NOT NULL,
    order_modifier_id bigint NOT NULL
);


ALTER TABLE public.order_modifier_orders OWNER TO tom;

--
-- Name: order_modifier_orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: tom
--

CREATE SEQUENCE public.order_modifier_orders_order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_modifier_orders_order_id_seq OWNER TO tom;

--
-- Name: order_modifier_orders_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tom
--

ALTER SEQUENCE public.order_modifier_orders_order_id_seq OWNED BY public.order_modifier_orders.order_id;


--
-- Name: order_modifier_orders_order_modifier_id_seq; Type: SEQUENCE; Schema: public; Owner: tom
--

CREATE SEQUENCE public.order_modifier_orders_order_modifier_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_modifier_orders_order_modifier_id_seq OWNER TO tom;

--
-- Name: order_modifier_orders_order_modifier_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tom
--

ALTER SEQUENCE public.order_modifier_orders_order_modifier_id_seq OWNED BY public.order_modifier_orders.order_modifier_id;


--
-- Name: order_modifier_products; Type: TABLE; Schema: public; Owner: tom
--

CREATE TABLE public.order_modifier_products (
    product_id bigint NOT NULL,
    order_modifier_id bigint NOT NULL
);


ALTER TABLE public.order_modifier_products OWNER TO tom;

--
-- Name: order_modifier_products_order_modifier_id_seq; Type: SEQUENCE; Schema: public; Owner: tom
--

CREATE SEQUENCE public.order_modifier_products_order_modifier_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_modifier_products_order_modifier_id_seq OWNER TO tom;

--
-- Name: order_modifier_products_order_modifier_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tom
--

ALTER SEQUENCE public.order_modifier_products_order_modifier_id_seq OWNED BY public.order_modifier_products.order_modifier_id;


--
-- Name: order_modifier_products_product_id_seq; Type: SEQUENCE; Schema: public; Owner: tom
--

CREATE SEQUENCE public.order_modifier_products_product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_modifier_products_product_id_seq OWNER TO tom;

--
-- Name: order_modifier_products_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tom
--

ALTER SEQUENCE public.order_modifier_products_product_id_seq OWNED BY public.order_modifier_products.product_id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: tom
--

CREATE TABLE public.orders (
    id bigint NOT NULL,
    deprecated_at timestamp without time zone,
    status integer DEFAULT 0 NOT NULL,
    user_id bigint NOT NULL,
    product_id bigint NOT NULL,
    recipient character varying(255) NOT NULL,
    location character varying(255) NOT NULL,
    notes character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    delivery_period_id bigint NOT NULL,
    total_cost integer DEFAULT 0 NOT NULL,
    drink_size character varying DEFAULT 'medium'::character varying NOT NULL
);


ALTER TABLE public.orders OWNER TO tom;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: tom
--

CREATE SEQUENCE public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO tom;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tom
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: organization; Type: TABLE; Schema: public; Owner: tom
--

CREATE TABLE public.organization (
    id bigint NOT NULL,
    deprecated_at timestamp without time zone,
    status integer DEFAULT 0 NOT NULL,
    name character varying(255),
    secret_api_key character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    publishable_api_key character varying(255)
);


ALTER TABLE public.organization OWNER TO tom;

--
-- Name: organization_id_seq; Type: SEQUENCE; Schema: public; Owner: tom
--

CREATE SEQUENCE public.organization_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.organization_id_seq OWNER TO tom;

--
-- Name: organization_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tom
--

ALTER SEQUENCE public.organization_id_seq OWNED BY public.organization.id;


--
-- Name: payment; Type: TABLE; Schema: public; Owner: tom
--

CREATE TABLE public.payment (
    id bigint NOT NULL,
    deprecated_at timestamp without time zone,
    status integer DEFAULT 0 NOT NULL,
    amount integer NOT NULL,
    user_id bigint NOT NULL,
    stripe_card_id character varying,
    type character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    stripe_charge_id character varying(255),
    stripe_refund_id character varying(255)
);


ALTER TABLE public.payment OWNER TO tom;

--
-- Name: payment_id_seq; Type: SEQUENCE; Schema: public; Owner: tom
--

CREATE SEQUENCE public.payment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payment_id_seq OWNER TO tom;

--
-- Name: payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tom
--

ALTER SEQUENCE public.payment_id_seq OWNED BY public.payment.id;


--
-- Name: play_evolutions; Type: TABLE; Schema: public; Owner: tom
--

CREATE TABLE public.play_evolutions (
    id integer NOT NULL,
    hash character varying(255) NOT NULL,
    applied_at timestamp without time zone NOT NULL,
    apply_script text,
    revert_script text,
    state character varying(255),
    last_problem text
);


ALTER TABLE public.play_evolutions OWNER TO tom;

--
-- Name: product; Type: TABLE; Schema: public; Owner: tom
--

CREATE TABLE public.product (
    id bigint NOT NULL,
    deprecated_at timestamp without time zone,
    status integer DEFAULT 0 NOT NULL,
    name character varying(255) NOT NULL,
    price integer NOT NULL,
    description character varying(255),
    organization_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.product OWNER TO tom;

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: tom
--

CREATE SEQUENCE public.product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_id_seq OWNER TO tom;

--
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tom
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;


--
-- Name: refund; Type: TABLE; Schema: public; Owner: tom
--

CREATE TABLE public.refund (
    id bigint NOT NULL,
    deprecated_at timestamp without time zone,
    status integer DEFAULT 0 NOT NULL,
    amount integer NOT NULL,
    order_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.refund OWNER TO tom;

--
-- Name: refund_id_seq; Type: SEQUENCE; Schema: public; Owner: tom
--

CREATE SEQUENCE public.refund_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.refund_id_seq OWNER TO tom;

--
-- Name: refund_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tom
--

ALTER SEQUENCE public.refund_id_seq OWNED BY public.refund.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: tom
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    deprecated_at timestamp without time zone,
    status integer DEFAULT 0 NOT NULL,
    firstname character varying(255) NOT NULL,
    lastname character varying(255) NOT NULL,
    organization_id bigint NOT NULL,
    email character varying(255) NOT NULL,
    last_logged_in timestamp without time zone,
    role integer NOT NULL,
    firebase_user_id character varying(255),
    balance integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    stripe_customer_id character varying(255)
);


ALTER TABLE public.users OWNER TO tom;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: tom
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO tom;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tom
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: delivery_period id; Type: DEFAULT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.delivery_period ALTER COLUMN id SET DEFAULT nextval('public.delivery_period_id_seq'::regclass);


--
-- Name: order_modifier id; Type: DEFAULT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.order_modifier ALTER COLUMN id SET DEFAULT nextval('public.order_modifier_id_seq'::regclass);


--
-- Name: order_modifier_orders order_id; Type: DEFAULT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.order_modifier_orders ALTER COLUMN order_id SET DEFAULT nextval('public.order_modifier_orders_order_id_seq'::regclass);


--
-- Name: order_modifier_orders order_modifier_id; Type: DEFAULT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.order_modifier_orders ALTER COLUMN order_modifier_id SET DEFAULT nextval('public.order_modifier_orders_order_modifier_id_seq'::regclass);


--
-- Name: order_modifier_products product_id; Type: DEFAULT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.order_modifier_products ALTER COLUMN product_id SET DEFAULT nextval('public.order_modifier_products_product_id_seq'::regclass);


--
-- Name: order_modifier_products order_modifier_id; Type: DEFAULT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.order_modifier_products ALTER COLUMN order_modifier_id SET DEFAULT nextval('public.order_modifier_products_order_modifier_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: organization id; Type: DEFAULT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.organization ALTER COLUMN id SET DEFAULT nextval('public.organization_id_seq'::regclass);


--
-- Name: payment id; Type: DEFAULT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.payment ALTER COLUMN id SET DEFAULT nextval('public.payment_id_seq'::regclass);


--
-- Name: product id; Type: DEFAULT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- Name: refund id; Type: DEFAULT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.refund ALTER COLUMN id SET DEFAULT nextval('public.refund_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: delivery_period; Type: TABLE DATA; Schema: public; Owner: tom
--

COPY public.delivery_period (id, deprecated_at, status, class_period, organization_id, created_at, updated_at, monday, tuesday, wednesday, thursday, friday, max_queue_size) FROM stdin;
0	\N	1	3	3	2019-03-23 23:58:06.574812	2019-05-02 14:28:35.922	8:00-9:55	8:45-9:40	10:25-11:20	11:45-12:40	12:50-1:45	0
2	\N	1	4	3	2019-05-16 12:26:24.277	2019-05-16 12:26:24.277	10:00-10:55	11:00-11:55	12:00-1:00	11:00-1:00	11:00-3:00	0
\.


--
-- Data for Name: order_modifier; Type: TABLE DATA; Schema: public; Owner: tom
--

COPY public.order_modifier (id, deprecated_at, created_at, updated_at, status, name, organization_id, additional_cost) FROM stdin;
2	\N	2019-05-15 16:05:35.711	2019-05-15 16:05:35.711	1	Almond Milk	3	75
1	\N	2019-05-02 14:29:06.454	2019-05-16 12:24:23.859	1	Caramel Syrup	3	50
3	\N	2019-05-17 08:36:39.411	2019-05-17 08:36:39.411	1	Almond Syrup	3	50
4	\N	2019-05-17 08:36:55.051	2019-05-17 08:36:55.051	1	Cinnamon Syrup	3	50
5	\N	2019-05-17 08:37:03.816	2019-05-17 08:37:03.816	1	Coconut Syrup	3	50
6	\N	2019-05-17 08:37:12.949	2019-05-17 08:37:12.949	1	Cupcake Syrup	3	50
7	\N	2019-05-17 08:37:25.159	2019-05-17 08:37:25.159	1	Hazelnut Syrup	3	50
8	\N	2019-05-17 08:37:36.973	2019-05-17 08:37:36.973	1	Irish Cream	3	50
9	\N	2019-05-17 08:37:45.792	2019-05-17 08:37:45.792	1	Orange Syrup	3	50
10	\N	2019-05-17 08:38:21.067	2019-05-17 08:38:21.067	1	Passion Fruit Syrup	3	50
11	\N	2019-05-17 08:38:36.314	2019-05-17 08:38:36.314	1	Peppermint Syrup	3	50
12	\N	2019-05-17 08:38:53.139	2019-05-17 08:38:53.139	1	Rasberry Sauce	3	50
13	\N	2019-05-17 08:39:05.047	2019-05-17 08:39:05.047	1	Strawberry Syrup	3	50
14	\N	2019-05-17 08:39:15.226	2019-05-17 08:39:15.226	1	Toffee Syrup	3	50
15	\N	2019-05-17 08:39:22.39	2019-05-17 08:39:22.39	1	Vanilla	3	50
16	\N	2019-05-17 08:39:52.715	2019-05-17 08:39:52.715	1	Coconut Milk	3	75
\.


--
-- Data for Name: order_modifier_orders; Type: TABLE DATA; Schema: public; Owner: tom
--

COPY public.order_modifier_orders (order_id, order_modifier_id) FROM stdin;
4	1
6	1
\.


--
-- Data for Name: order_modifier_products; Type: TABLE DATA; Schema: public; Owner: tom
--

COPY public.order_modifier_products (product_id, order_modifier_id) FROM stdin;
2	1
3	1
3	2
4	2
4	1
13	2
15	2
15	1
14	1
14	2
16	1
16	2
17	2
17	1
10	8
10	15
10	12
10	6
10	14
10	2
10	13
5	3
5	11
5	1
5	12
5	14
5	16
5	13
5	15
5	10
8	7
8	1
8	12
8	13
8	6
8	16
8	4
6	3
6	8
6	9
6	10
6	1
6	4
6	16
6	7
6	11
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: tom
--

COPY public.orders (id, deprecated_at, status, user_id, product_id, recipient, location, notes, created_at, updated_at, delivery_period_id, total_cost, drink_size) FROM stdin;
3	\N	3	1	2	Tom Dale	EJ308	Little bit of cream	2019-03-15 14:37:12.983	2019-05-13 09:34:47.825	0	0	medium
1	\N	3	1	3	Davis Mariotti	EJ308		2019-03-15 12:40:08.425	2019-05-13 09:34:50.734	0	0	medium
2	\N	3	1	1	Davis Mariotti	EJ308		2019-03-15 12:40:18.246	2019-05-16 10:27:42.608	0	0	medium
4	\N	1	9	2	Tom	rob	na	2019-05-16 16:47:53.388	2019-05-16 16:47:53.388	2	300	Medium
5	\N	1	9	3	Tom	nowhere	\N	2019-05-16 16:50:09.151	2019-05-16 16:50:09.151	2	450	Medium
6	\N	1	9	2	aiodf	asdf	qwer	2019-05-17 08:14:14.464	2019-05-17 08:14:14.464	2	300	Medium
\.


--
-- Data for Name: organization; Type: TABLE DATA; Schema: public; Owner: tom
--

COPY public.organization (id, deprecated_at, status, name, secret_api_key, created_at, updated_at, publishable_api_key) FROM stdin;
1	\N	1	Test Org	\N	2019-03-18 22:44:25.766703	2019-03-18 22:44:25.766703	\N
2	\N	1	Test Org	\N	2019-03-18 22:44:25.766703	2019-03-18 22:44:25.766703	\N
3	\N	1	Northwest Christian High School		2019-03-18 22:44:25.766703	2019-03-18 22:44:25.766703	
\.


--
-- Data for Name: payment; Type: TABLE DATA; Schema: public; Owner: tom
--

COPY public.payment (id, deprecated_at, status, amount, user_id, stripe_card_id, type, created_at, updated_at, stripe_charge_id, stripe_refund_id) FROM stdin;
1	\N	3	1000	9	\N	cash	2019-05-13 09:29:34.963	2019-05-13 09:29:34.963	\N	\N
2	\N	3	2	9	\N	cash	2019-05-13 09:31:28.552	2019-05-13 09:31:28.552	\N	\N
\.


--
-- Data for Name: play_evolutions; Type: TABLE DATA; Schema: public; Owner: tom
--

COPY public.play_evolutions (id, hash, applied_at, apply_script, revert_script, state, last_problem) FROM stdin;
1	2028f40063d78f2beac7e0fc94fa006aa767844a	2019-04-10 14:55:42.825	create table delivery_period (\nid                            bigserial not null,\ndeprecated_at                 timestamp,\nstatus                        INTEGER DEFAULT 0 not null,\nclass_period                  integer,\norganization_id               bigint,\ncreated_at                    timestamp not null,\nupdated_at                    timestamp not null,\nconstraint pk_delivery_period primary key (id)\n);\n\ncreate table orders (\nid                            bigserial not null,\ndeprecated_at                 timestamp,\nstatus                        INTEGER DEFAULT 0 not null,\nuser_id                       bigint not null,\nproduct_id                    bigint not null,\nrecipient                     varchar(255) not null,\nlocation                      varchar(255) not null,\ndelivery_period_id            bigint not null,\nnotes                         varchar(255),\ncreated_at                    timestamp not null,\nupdated_at                    timestamp not null,\nconstraint pk_orders primary key (id)\n);\n\ncreate table organization (\nid                            bigserial not null,\ndeprecated_at                 timestamp,\nstatus                        INTEGER DEFAULT 0 not null,\nname                          varchar(255),\nsecret_api_key                varchar(255),\npublishable_api_key           varchar(255),\ncreated_at                    timestamp not null,\nupdated_at                    timestamp not null,\nconstraint pk_organization primary key (id)\n);\n\ncreate table payment (\nid                            bigserial not null,\ndeprecated_at                 timestamp,\nstatus                        INTEGER DEFAULT 0 not null,\namount                        integer not null,\nuser_id                       bigint not null,\ntype                          varchar(255) not null,\nstripe_charge_id              varchar(255),\nstripe_card_id                varchar(255),\nstripe_refund_id              varchar(255),\ncreated_at                    timestamp not null,\nupdated_at                    timestamp not null,\nconstraint pk_payment primary key (id)\n);\n\ncreate table product (\nid                            bigserial not null,\ndeprecated_at                 timestamp,\nstatus                        INTEGER DEFAULT 0 not null,\nname                          varchar(255) not null,\nprice                         integer not null,\ndescription                   varchar(255),\norganization_id               bigint not null,\ncreated_at                    timestamp not null,\nupdated_at                    timestamp not null,\nconstraint pk_product primary key (id)\n);\n\ncreate table refund (\nid                            bigserial not null,\ndeprecated_at                 timestamp,\nstatus                        INTEGER DEFAULT 0 not null,\namount                        integer not null,\norder_id                       bigint not null,\ncreated_at                    timestamp not null,\nupdated_at                    timestamp not null,\nconstraint pk_refund primary key (id)\n);\n\ncreate table users (\nid                            bigserial not null,\ndeprecated_at                 timestamp,\nstatus                        INTEGER DEFAULT 0 not null,\nfirstname                     varchar(255) not null,\nlastname                      varchar(255) not null,\norganization_id               bigint not null,\nemail                         varchar(255) not null,\nlast_logged_in                timestamp,\nrole                          integer not null,\nfirebase_user_id              varchar(255),\nbalance                       integer not null,\nstripe_customer_id            varchar(255),\ncreated_at                    timestamp not null,\nupdated_at                    timestamp not null,\nconstraint pk_users primary key (id)\n);\n\ncreate index ix_delivery_period_organization_id on delivery_period (organization_id);\nalter table delivery_period add constraint fk_delivery_period_organization_id foreign key (organization_id) references organization (id) on delete restrict on update restrict;\n\ncreate index ix_orders_user_id on orders (user_id);\nalter table orders add constraint fk_orders_user_id foreign key (user_id) references users (id) on delete restrict on update restrict;\n\ncreate index ix_orders_product_id on orders (product_id);\nalter table orders add constraint fk_orders_product_id foreign key (product_id) references product (id) on delete restrict on update restrict;\n\ncreate index ix_orders_delivery_period_id on orders (delivery_period_id);\nalter table orders add constraint fk_orders_delivery_period_id foreign key (delivery_period_id) references delivery_period (id) on delete restrict on update restrict;\n\ncreate index ix_payment_user_id on payment (user_id);\nalter table payment add constraint fk_payment_user_id foreign key (user_id) references users (id) on delete restrict on update restrict;\n\ncreate index ix_product_organization_id on product (organization_id);\nalter table product add constraint fk_product_organization_id foreign key (organization_id) references organization (id) on delete restrict on update restrict;\n\ncreate index ix_refund_order_id on refund (order_id);\nalter table refund add constraint fk_refund_order_id foreign key (order_id) references orders (id) on delete restrict on update restrict;\n\ncreate index ix_users_organization_id on users (organization_id);\nalter table users add constraint fk_users_organization_id foreign key (organization_id) references organization (id) on delete restrict on update restrict;	alter table if exists delivery_period drop constraint if exists fk_delivery_period_organization_id;\ndrop index if exists ix_delivery_period_organization_id;\n\nalter table if exists orders drop constraint if exists fk_orders_user_id;\ndrop index if exists ix_orders_user_id;\n\nalter table if exists orders drop constraint if exists fk_orders_product_id;\ndrop index if exists ix_orders_product_id;\n\nalter table if exists orders drop constraint if exists fk_orders_delivery_period_id;\ndrop index if exists ix_orders_delivery_period_id;\n\nalter table if exists payment drop constraint if exists fk_payment_user_id;\ndrop index if exists ix_payment_user_id;\n\nalter table if exists product drop constraint if exists fk_product_organization_id;\ndrop index if exists ix_product_organization_id;\n\nalter table if exists refund drop constraint if exists fk_refund_user_id;\ndrop index if exists ix_refund_user_id;\n\nalter table if exists users drop constraint if exists fk_users_organization_id;\ndrop index if exists ix_users_organization_id;\n\ndrop table if exists delivery_period cascade;\n\ndrop table if exists orders cascade;\n\ndrop table if exists organization cascade;\n\ndrop table if exists payment cascade;\n\ndrop table if exists product cascade;\n\ndrop table if exists refund cascade;\n\ndrop table if exists users cascade;	applied	
2	440b52137b8be9dc9a7f0da154d33b1573adfbeb	2019-04-14 20:44:59.242	ALTER TABLE delivery_period ADD COLUMN monday varchar;\nALTER TABLE delivery_period ADD COLUMN tuesday varchar;\nALTER TABLE delivery_period ADD COLUMN wednesday varchar;\nALTER TABLE delivery_period ADD COLUMN thursday varchar;\nALTER TABLE delivery_period ADD COLUMN friday varchar;	ALTER TABLE delivery_period DROP COLUMN monday;\nALTER TABLE delivery_period DROP COLUMN tuesday;\nALTER TABLE delivery_period DROP COLUMN wednesday;\nALTER TABLE delivery_period DROP COLUMN thursday;\nALTER TABLE delivery_period DROP COLUMN friday;	applied	
3	ae644d408cc66f80bd6224ab211ec03c0b60b08e	2019-04-15 14:02:29.655	ALTER TABLE delivery_period ADD COLUMN max_queue_size INTEGER DEFAULT 0 not null;\nALTER TABLE delivery_period ALTER COLUMN class_period SET DEFAULT 0;\nALTER TABLE delivery_period ALTER COLUMN class_period SET NOT NULL;	ALTER TABLE delivery_period DROP COLUMN max_queue_size;\nALTER TABLE delivery_period ALTER COLUMN class_period SET DEFAULT NULL;\nALTER TABLE delivery_period ALTER COLUMN class_period DROP NOT NULL;	applied	
4	0f617cb73915c0684e9b39083e6be1578a7a541d	2019-04-29 13:42:04.52	create table order_modifier (\nid                           bigserial not null,\ndeprecated_at                timestamp,\ncreated_at                   timestamp not null,\nupdated_at                   timestamp not null,\nstatus                       INTEGER DEFAULT 0 not null,\nname                         varchar(255) not null,\norganization_id              bigint,\nconstraint pk_order_modifier primary key (id)\n);\n\ncreate table order_modifier_orders (\norder_id                     bigserial not null,\norder_modifier_id            bigserial not null,\nconstraint pk_order_modifier_orders primary key (order_id, order_modifier_id)\n);\n\ncreate table order_modifier_products (\nproduct_id                   bigserial not null,\norder_modifier_id            bigserial not null,\nconstraint pk_order_modifier_products primary key (product_id, order_modifier_id)\n);\n\ncreate index ix_order_modifier_orders_order_id            on order_modifier_orders   (order_id);\ncreate index ix_order_modifier_orders_order_modifier_id   on order_modifier_orders   (order_modifier_id);\ncreate index ix_order_modifier_products_product_id        on order_modifier_products (product_id);\ncreate index ix_order_modifier_products_order_modifier_id on order_modifier_products (order_modifier_id);\n\nalter table order_modifier_orders   add constraint fk_order_modifier_orders_order_id            foreign key (order_id)          references orders         (id) on delete restrict on update restrict;\nalter table order_modifier_orders   add constraint fk_order_modifier_orders_order_modifier_id   foreign key (order_modifier_id) references order_modifier (id) on delete restrict on update restrict;\nalter table order_modifier_products add constraint fk_order_modifier_products_product_id        foreign key (product_id)        references product        (id) on delete restrict on update restrict;\nalter table order_modifier_products add constraint fk_order_modifier_products_order_modifier_id foreign key (order_modifier_id) references order_modifier (id) on delete restrict on update restrict;	alter table if exists order_modifier_orders   drop constraint if exists fk_order_modifier_orders_order_id;\nalter table if exists order_modifier_orders   drop constraint if exists fk_order_modifier_orders_order_modifier_id;\nalter table if exists order_modifier_products drop constraint if exists fk_order_modifier_products_product_id;\nalter table if exists order_modifier_products drop constraint if exists fk_order_modifier_products_order_modifier_id;\n\ndrop index if exists ix_order_modifier_orders_order_id;\ndrop index if exists ix_order_modifier_orders_order_modifier_id;\ndrop index if exists ix_order_modifier_products_product_id;\ndrop index if exists ix_order_modifier_products_order_modifier_id;\n\n\ndrop table if exists order_modifier_orders   cascade;\ndrop table if exists order_modifier_products cascade;\ndrop table if exists order_modifier          cascade;	applied	
5	2ab9ce43a29529ba8e4b3259243d7e975906bd60	2019-05-13 14:11:17.301	ALTER TABLE order_modifier ADD COLUMN additional_cost INTEGER DEFAULT 0 not null;\nALTER TABLE orders ADD COLUMN total_cost INTEGER DEFAULT 0 not null;	ALTER TABLE order_modifier DROP COLUMN additional_cost;\nALTER TABLE orders DROP COLUMN total_cost;	applied	
6	72c30b66e493f74e87403f780c79f71205a1325b	2019-05-14 09:17:16.212	ALTER TABLE orders ADD COLUMN drink_size varchar DEFAULT 'medium' not null;	ALTER TABLE orders DROP COLUMN drink_size;	applied	
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: tom
--

COPY public.product (id, deprecated_at, status, name, price, description, organization_id, created_at, updated_at) FROM stdin;
1	\N	1	Latte	600	latte	3	2019-03-15 11:36:53.207539	2019-03-15 11:36:53.207539
3	\N	1	Cappuccino	450	Frothy	3	2019-03-15 17:14:13.021665	2019-04-14 23:36:17.268
2	\N	1	Drip Coffee	250	Drip drip drip	3	2019-03-15 17:13:28.017118	2019-05-16 12:24:30.921
4	\N	1	Strawberry Smoothie	500	Made with Real Stawberries	3	2019-05-16 12:25:03.901	2019-05-16 12:25:03.901
5	\N	1	Americano	200	Water & Espresso	3	2019-05-17 08:36:11.624	2019-05-17 08:36:11.624
6	\N	1	Mocha	200	Coffee- Dairy	3	2019-05-17 08:57:19.034	2019-05-17 08:57:19.034
7	\N	1	Chocolate Milk	200	Non-Coffee	3	2019-05-17 08:59:03.691	2019-05-17 08:59:03.691
8	\N	1	Hot Chocolate	200	Non-Chocolate	3	2019-05-17 08:59:55.773	2019-05-17 08:59:55.773
9	\N	1	Italian Sodas	200	Iced/Non-Coffee	3	2019-05-17 09:00:35.422	2019-05-17 09:00:35.422
11	\N	1	Black Tea	200	Tea, Add flavor	3	2019-05-17 09:02:20.427	2019-05-17 09:02:20.427
10	\N	1	Chai	200	Non-coffee, Add flavors	3	2019-05-17 09:01:18.594	2019-05-17 09:02:43.307
12	\N	1	Green Tea	200	Tea, add flavor	3	2019-05-17 09:03:46.47	2019-05-17 09:03:46.47
13	\N	1	London Fog	200	Tea	3	2019-05-17 09:04:38.843	2019-05-17 09:04:38.843
15	\N	1	Frappe Coconut Mocha	200	Coffee/Blended Drink	3	2019-05-17 09:07:55.578	2019-05-17 09:09:53.26
14	\N	1	Frappe 	200	Coffee/Blended Drink	3	2019-05-17 09:06:29.321	2019-05-17 09:10:25.494
16	\N	1	Frappe Mocha	200	Coffee/Blended Drink	3	2019-05-17 09:09:38.01	2019-05-17 09:10:35.884
17	\N	1	Frappe Toffee Coffee	200	Coffee/Blended Drink	3	2019-05-17 09:11:48.847	2019-05-17 09:11:48.847
18	\N	1	Huckleberry Lemonade	200	Frozen Drink	3	2019-05-17 09:12:23.382	2019-05-17 09:12:23.382
19	\N	1	Mango Lemonade	300	mangolicious!!	3	2019-05-17 09:14:04.234	2019-05-17 09:14:04.234
\.


--
-- Data for Name: refund; Type: TABLE DATA; Schema: public; Owner: tom
--

COPY public.refund (id, deprecated_at, status, amount, order_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: tom
--

COPY public.users (id, deprecated_at, status, firstname, lastname, organization_id, email, last_logged_in, role, firebase_user_id, balance, created_at, updated_at, stripe_customer_id) FROM stdin;
2	\N	1	Tom	Dale	3	tom.k.dale@gmail.com	\N	0	5uR1C21Z6hQI4aCrewu3TFfzmLB2	100000	2019-03-15 17:11:56.577988	2019-03-15 17:11:56.577988	\N
3	\N	1	Tersa	Almaw	3	tersaalmaw@gmail.com	\N	0	0h3WAUBDBOMtG1Onrg8zQjbBlzM2	100000	2019-03-15 17:12:40.347689	2019-03-15 17:12:40.347689	\N
1	\N	1	Davis	Mariotti	3	davismariotti@gmail.com	\N	0	76GqSI6ohMaBGAiDRvGOqgb6tp03	155949	2019-03-15 11:37:49.888	2019-04-14 23:53:21.12	\N
4	\N	1	tom	tester3	3	tomtester3@tester.com	\N	4	6n0kJYdqHNQQKUDctOA4byIn5dj1	0	2019-04-29 13:42:42.217	2019-04-29 13:42:42.217	\N
5	\N	1	t	tester3	3	tester4@tester.com	\N	4	ctG3ry0dEyQJzLg8HaU31IPtC722	0	2019-04-29 13:44:06.697	2019-04-29 13:44:06.697	\N
6	\N	1	Hllo	Hi	3	tester5@tester.com	\N	4	Fd9X2xsh6aXpg2KsZ6kNDHsXgSH2	0	2019-04-29 13:48:58.128	2019-04-29 13:48:58.128	\N
7	\N	1	tom	tester7	3	tester@tester.com	\N	4	8fkJID2GbgNEF7qm7S9UGR6ebmz1	0	2019-04-29 14:16:32.198	2019-04-29 14:16:32.198	\N
8	\N	1	Tester	Tom	3	testertester@tester.com	\N	4	fz0sIDnWEqeaPEfrZBzmGGlQllq1	0	2019-04-29 16:30:13.502	2019-04-29 16:30:13.502	\N
10	\N	1	tom	t	3	tester2000@tester.com	\N	4	PLLSQUq1v7hCgpUnKoG3gfqtSi22	0	2019-05-02 14:32:55.941	2019-05-02 14:32:55.941	\N
9	\N	1	Tommy	Tester	3	tester@tester.com	\N	1	at1zBFEe25ZRqO9Z58Xp8BtbwgR2	52	2019-04-30 08:37:38.873	2019-05-17 08:14:14.464	\N
\.


--
-- Name: delivery_period_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tom
--

SELECT pg_catalog.setval('public.delivery_period_id_seq', 2, true);


--
-- Name: order_modifier_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tom
--

SELECT pg_catalog.setval('public.order_modifier_id_seq', 16, true);


--
-- Name: order_modifier_orders_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tom
--

SELECT pg_catalog.setval('public.order_modifier_orders_order_id_seq', 1, false);


--
-- Name: order_modifier_orders_order_modifier_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tom
--

SELECT pg_catalog.setval('public.order_modifier_orders_order_modifier_id_seq', 1, false);


--
-- Name: order_modifier_products_order_modifier_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tom
--

SELECT pg_catalog.setval('public.order_modifier_products_order_modifier_id_seq', 1, false);


--
-- Name: order_modifier_products_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tom
--

SELECT pg_catalog.setval('public.order_modifier_products_product_id_seq', 1, false);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tom
--

SELECT pg_catalog.setval('public.orders_id_seq', 6, true);


--
-- Name: organization_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tom
--

SELECT pg_catalog.setval('public.organization_id_seq', 3, true);


--
-- Name: payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tom
--

SELECT pg_catalog.setval('public.payment_id_seq', 2, true);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tom
--

SELECT pg_catalog.setval('public.product_id_seq', 19, true);


--
-- Name: refund_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tom
--

SELECT pg_catalog.setval('public.refund_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tom
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


--
-- Name: delivery_period pk_delivery_period; Type: CONSTRAINT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.delivery_period
    ADD CONSTRAINT pk_delivery_period PRIMARY KEY (id);


--
-- Name: order_modifier pk_order_modifier; Type: CONSTRAINT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.order_modifier
    ADD CONSTRAINT pk_order_modifier PRIMARY KEY (id);


--
-- Name: order_modifier_orders pk_order_modifier_orders; Type: CONSTRAINT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.order_modifier_orders
    ADD CONSTRAINT pk_order_modifier_orders PRIMARY KEY (order_id, order_modifier_id);


--
-- Name: order_modifier_products pk_order_modifier_products; Type: CONSTRAINT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.order_modifier_products
    ADD CONSTRAINT pk_order_modifier_products PRIMARY KEY (product_id, order_modifier_id);


--
-- Name: orders pk_orders; Type: CONSTRAINT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT pk_orders PRIMARY KEY (id);


--
-- Name: organization pk_organization; Type: CONSTRAINT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.organization
    ADD CONSTRAINT pk_organization PRIMARY KEY (id);


--
-- Name: payment pk_payment; Type: CONSTRAINT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT pk_payment PRIMARY KEY (id);


--
-- Name: product pk_product; Type: CONSTRAINT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT pk_product PRIMARY KEY (id);


--
-- Name: refund pk_refund; Type: CONSTRAINT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.refund
    ADD CONSTRAINT pk_refund PRIMARY KEY (id);


--
-- Name: users pk_users; Type: CONSTRAINT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT pk_users PRIMARY KEY (id);


--
-- Name: play_evolutions play_evolutions_pkey; Type: CONSTRAINT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.play_evolutions
    ADD CONSTRAINT play_evolutions_pkey PRIMARY KEY (id);


--
-- Name: ix_delivery_period_organization_id; Type: INDEX; Schema: public; Owner: tom
--

CREATE INDEX ix_delivery_period_organization_id ON public.delivery_period USING btree (organization_id);


--
-- Name: ix_order_modifier_orders_order_id; Type: INDEX; Schema: public; Owner: tom
--

CREATE INDEX ix_order_modifier_orders_order_id ON public.order_modifier_orders USING btree (order_id);


--
-- Name: ix_order_modifier_orders_order_modifier_id; Type: INDEX; Schema: public; Owner: tom
--

CREATE INDEX ix_order_modifier_orders_order_modifier_id ON public.order_modifier_orders USING btree (order_modifier_id);


--
-- Name: ix_order_modifier_products_order_modifier_id; Type: INDEX; Schema: public; Owner: tom
--

CREATE INDEX ix_order_modifier_products_order_modifier_id ON public.order_modifier_products USING btree (order_modifier_id);


--
-- Name: ix_order_modifier_products_product_id; Type: INDEX; Schema: public; Owner: tom
--

CREATE INDEX ix_order_modifier_products_product_id ON public.order_modifier_products USING btree (product_id);


--
-- Name: ix_orders_delivery_period_id; Type: INDEX; Schema: public; Owner: tom
--

CREATE INDEX ix_orders_delivery_period_id ON public.orders USING btree (delivery_period_id);


--
-- Name: ix_orders_product_id; Type: INDEX; Schema: public; Owner: tom
--

CREATE INDEX ix_orders_product_id ON public.orders USING btree (product_id);


--
-- Name: ix_orders_user_id; Type: INDEX; Schema: public; Owner: tom
--

CREATE INDEX ix_orders_user_id ON public.orders USING btree (user_id);


--
-- Name: ix_payment_user_id; Type: INDEX; Schema: public; Owner: tom
--

CREATE INDEX ix_payment_user_id ON public.payment USING btree (user_id);


--
-- Name: ix_product_organization_id; Type: INDEX; Schema: public; Owner: tom
--

CREATE INDEX ix_product_organization_id ON public.product USING btree (organization_id);


--
-- Name: ix_refund_order_id; Type: INDEX; Schema: public; Owner: tom
--

CREATE INDEX ix_refund_order_id ON public.refund USING btree (order_id);


--
-- Name: ix_users_organization_id; Type: INDEX; Schema: public; Owner: tom
--

CREATE INDEX ix_users_organization_id ON public.users USING btree (organization_id);


--
-- Name: delivery_period fk_delivery_period_organization_id; Type: FK CONSTRAINT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.delivery_period
    ADD CONSTRAINT fk_delivery_period_organization_id FOREIGN KEY (organization_id) REFERENCES public.organization(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: order_modifier_orders fk_order_modifier_orders_order_id; Type: FK CONSTRAINT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.order_modifier_orders
    ADD CONSTRAINT fk_order_modifier_orders_order_id FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: order_modifier_orders fk_order_modifier_orders_order_modifier_id; Type: FK CONSTRAINT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.order_modifier_orders
    ADD CONSTRAINT fk_order_modifier_orders_order_modifier_id FOREIGN KEY (order_modifier_id) REFERENCES public.order_modifier(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: order_modifier_products fk_order_modifier_products_order_modifier_id; Type: FK CONSTRAINT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.order_modifier_products
    ADD CONSTRAINT fk_order_modifier_products_order_modifier_id FOREIGN KEY (order_modifier_id) REFERENCES public.order_modifier(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: order_modifier_products fk_order_modifier_products_product_id; Type: FK CONSTRAINT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.order_modifier_products
    ADD CONSTRAINT fk_order_modifier_products_product_id FOREIGN KEY (product_id) REFERENCES public.product(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: orders fk_orders_delivery_period_id; Type: FK CONSTRAINT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_orders_delivery_period_id FOREIGN KEY (delivery_period_id) REFERENCES public.delivery_period(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: orders fk_orders_product_id; Type: FK CONSTRAINT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_orders_product_id FOREIGN KEY (product_id) REFERENCES public.product(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: orders fk_orders_user_id; Type: FK CONSTRAINT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_orders_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: payment fk_payment_user_id; Type: FK CONSTRAINT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT fk_payment_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: product fk_product_organization_id; Type: FK CONSTRAINT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT fk_product_organization_id FOREIGN KEY (organization_id) REFERENCES public.organization(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: refund fk_refund_user_id; Type: FK CONSTRAINT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.refund
    ADD CONSTRAINT fk_refund_user_id FOREIGN KEY (order_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: users fk_users_organization_id; Type: FK CONSTRAINT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_users_organization_id FOREIGN KEY (organization_id) REFERENCES public.organization(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: refund refund_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tom
--

ALTER TABLE ONLY public.refund
    ADD CONSTRAINT refund_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- PostgreSQL database dump complete
--

