--
-- PostgreSQL database dump
--

-- Dumped from database version 10.4
-- Dumped by pg_dump version 10.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
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
-- Name: delivery_period; Type: TABLE; Schema: public; Owner: davis
--

CREATE TABLE public.delivery_period (
    id bigint NOT NULL,
    deprecated_at timestamp without time zone,
    status integer DEFAULT 0 NOT NULL,
    class_period integer,
    organization_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.delivery_period OWNER TO davis;

--
-- Name: delivery_period_id_seq; Type: SEQUENCE; Schema: public; Owner: davis
--

CREATE SEQUENCE public.delivery_period_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.delivery_period_id_seq OWNER TO davis;

--
-- Name: delivery_period_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: davis
--

ALTER SEQUENCE public.delivery_period_id_seq OWNED BY public.delivery_period.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: davis
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
    delivery_period_id bigint NOT NULL
);


ALTER TABLE public.orders OWNER TO davis;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: davis
--

CREATE SEQUENCE public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO davis;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: davis
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: organization; Type: TABLE; Schema: public; Owner: davis
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


ALTER TABLE public.organization OWNER TO davis;

--
-- Name: organization_id_seq; Type: SEQUENCE; Schema: public; Owner: davis
--

CREATE SEQUENCE public.organization_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.organization_id_seq OWNER TO davis;

--
-- Name: organization_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: davis
--

ALTER SEQUENCE public.organization_id_seq OWNED BY public.organization.id;


--
-- Name: payment; Type: TABLE; Schema: public; Owner: davis
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


ALTER TABLE public.payment OWNER TO davis;

--
-- Name: payment_id_seq; Type: SEQUENCE; Schema: public; Owner: davis
--

CREATE SEQUENCE public.payment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payment_id_seq OWNER TO davis;

--
-- Name: payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: davis
--

ALTER SEQUENCE public.payment_id_seq OWNED BY public.payment.id;


--
-- Name: play_evolutions; Type: TABLE; Schema: public; Owner: davis
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


ALTER TABLE public.play_evolutions OWNER TO davis;

--
-- Name: product; Type: TABLE; Schema: public; Owner: davis
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


ALTER TABLE public.product OWNER TO davis;

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: davis
--

CREATE SEQUENCE public.product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_id_seq OWNER TO davis;

--
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: davis
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;


--
-- Name: refund; Type: TABLE; Schema: public; Owner: davis
--

CREATE TABLE public.refund (
    id bigint NOT NULL,
    deprecated_at timestamp without time zone,
    status integer DEFAULT 0 NOT NULL,
    amount integer NOT NULL,
    user_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.refund OWNER TO davis;

--
-- Name: refund_id_seq; Type: SEQUENCE; Schema: public; Owner: davis
--

CREATE SEQUENCE public.refund_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.refund_id_seq OWNER TO davis;

--
-- Name: refund_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: davis
--

ALTER SEQUENCE public.refund_id_seq OWNED BY public.refund.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: davis
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


ALTER TABLE public.users OWNER TO davis;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: davis
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO davis;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: davis
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: delivery_period id; Type: DEFAULT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.delivery_period ALTER COLUMN id SET DEFAULT nextval('public.delivery_period_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: organization id; Type: DEFAULT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.organization ALTER COLUMN id SET DEFAULT nextval('public.organization_id_seq'::regclass);


--
-- Name: payment id; Type: DEFAULT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.payment ALTER COLUMN id SET DEFAULT nextval('public.payment_id_seq'::regclass);


--
-- Name: product id; Type: DEFAULT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- Name: refund id; Type: DEFAULT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.refund ALTER COLUMN id SET DEFAULT nextval('public.refund_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: delivery_period; Type: TABLE DATA; Schema: public; Owner: davis
--

COPY public.delivery_period (id, deprecated_at, status, class_period, organization_id, created_at, updated_at) FROM stdin;
0	\N	1	1	3	2019-03-23 23:58:06.574812	2019-03-23 23:58:06.574812
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: davis
--

COPY public.orders (id, deprecated_at, status, user_id, product_id, recipient, location, notes, created_at, updated_at, delivery_period_id) FROM stdin;
1	\N	1	1	3	Davis Mariotti	EJ308		2019-03-15 12:40:08.425	2019-03-15 12:40:08.425	0
2	\N	1	1	1	Davis Mariotti	EJ308		2019-03-15 12:40:18.246	2019-03-15 12:40:18.246	0
3	\N	1	1	2	Tom Dale	EJ308	Little bit of cream	2019-03-15 14:37:12.983	2019-03-15 14:37:12.983	0
\.


--
-- Data for Name: organization; Type: TABLE DATA; Schema: public; Owner: davis
--

COPY public.organization (id, deprecated_at, status, name, secret_api_key, created_at, updated_at, publishable_api_key) FROM stdin;
1	\N	1	Test Org	\N	2019-03-18 22:44:25.766703	2019-03-18 22:44:25.766703	\N
2	\N	1	Test Org	\N	2019-03-18 22:44:25.766703	2019-03-18 22:44:25.766703	\N
3	\N	1	Test Org	\N	2019-03-18 22:44:25.766703	2019-03-18 22:44:25.766703	\N
\.


--
-- Data for Name: payment; Type: TABLE DATA; Schema: public; Owner: davis
--

COPY public.payment (id, deprecated_at, status, amount, user_id, stripe_card_id, type, created_at, updated_at, stripe_charge_id, stripe_refund_id) FROM stdin;
\.


--
-- Data for Name: play_evolutions; Type: TABLE DATA; Schema: public; Owner: davis
--

COPY public.play_evolutions (id, hash, applied_at, apply_script, revert_script, state, last_problem) FROM stdin;
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: davis
--

COPY public.product (id, deprecated_at, status, name, price, description, organization_id, created_at, updated_at) FROM stdin;
1	\N	1	Latte	600	latte	3	2019-03-15 11:36:53.207539	2019-03-15 11:36:53.207539
2	\N	1	Drip Coffee	250	Drip drip drip	3	2019-03-15 17:13:28.017118	2019-03-15 17:13:28.017118
3	\N	1	Cappuccino	450	Frothy	3	2019-03-15 17:14:13.021665	2019-03-15 17:14:13.021665
\.


--
-- Data for Name: refund; Type: TABLE DATA; Schema: public; Owner: davis
--

COPY public.refund (id, deprecated_at, status, amount, user_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: davis
--

COPY public.users (id, deprecated_at, status, firstname, lastname, organization_id, email, last_logged_in, role, firebase_user_id, balance, created_at, updated_at, stripe_customer_id) FROM stdin;
1	\N	1	Davis	Mariotti	3	davismariotti@gmail.com	\N	0	76GqSI6ohMaBGAiDRvGOqgb6tp03	95950	2019-03-15 11:37:49.888	2019-03-21 17:57:13.458	\N
2	\N	1	Tom	Dale	3	tom.k.dale@gmail.com	\N	0	5uR1C21Z6hQI4aCrewu3TFfzmLB2	100000	2019-03-15 17:11:56.577988	2019-03-15 17:11:56.577988	\N
3	\N	1	Tersa	Almaw	3	tersaalmaw@gmail.com	\N	0	0h3WAUBDBOMtG1Onrg8zQjbBlzM2	100000	2019-03-15 17:12:40.347689	2019-03-15 17:12:40.347689	\N
\.


--
-- Name: delivery_period_id_seq; Type: SEQUENCE SET; Schema: public; Owner: davis
--

SELECT pg_catalog.setval('public.delivery_period_id_seq', 1, false);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: davis
--

SELECT pg_catalog.setval('public.orders_id_seq', 8, true);


--
-- Name: organization_id_seq; Type: SEQUENCE SET; Schema: public; Owner: davis
--

SELECT pg_catalog.setval('public.organization_id_seq', 1, true);


--
-- Name: payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: davis
--

SELECT pg_catalog.setval('public.payment_id_seq', 1, false);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: davis
--

SELECT pg_catalog.setval('public.product_id_seq', 3, true);


--
-- Name: refund_id_seq; Type: SEQUENCE SET; Schema: public; Owner: davis
--

SELECT pg_catalog.setval('public.refund_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: davis
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: delivery_period pk_delivery_period; Type: CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.delivery_period
    ADD CONSTRAINT pk_delivery_period PRIMARY KEY (id);


--
-- Name: orders pk_orders; Type: CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT pk_orders PRIMARY KEY (id);


--
-- Name: organization pk_organization; Type: CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.organization
    ADD CONSTRAINT pk_organization PRIMARY KEY (id);


--
-- Name: payment pk_payment; Type: CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT pk_payment PRIMARY KEY (id);


--
-- Name: product pk_product; Type: CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT pk_product PRIMARY KEY (id);


--
-- Name: refund pk_refund; Type: CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.refund
    ADD CONSTRAINT pk_refund PRIMARY KEY (id);


--
-- Name: users pk_users; Type: CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT pk_users PRIMARY KEY (id);


--
-- Name: play_evolutions play_evolutions_pkey; Type: CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.play_evolutions
    ADD CONSTRAINT play_evolutions_pkey PRIMARY KEY (id);


--
-- Name: ix_delivery_period_organization_id; Type: INDEX; Schema: public; Owner: davis
--

CREATE INDEX ix_delivery_period_organization_id ON public.delivery_period USING btree (organization_id);


--
-- Name: ix_orders_delivery_period_id; Type: INDEX; Schema: public; Owner: davis
--

CREATE INDEX ix_orders_delivery_period_id ON public.orders USING btree (delivery_period_id);


--
-- Name: ix_orders_product_id; Type: INDEX; Schema: public; Owner: davis
--

CREATE INDEX ix_orders_product_id ON public.orders USING btree (product_id);


--
-- Name: ix_orders_user_id; Type: INDEX; Schema: public; Owner: davis
--

CREATE INDEX ix_orders_user_id ON public.orders USING btree (user_id);


--
-- Name: ix_payment_user_id; Type: INDEX; Schema: public; Owner: davis
--

CREATE INDEX ix_payment_user_id ON public.payment USING btree (user_id);


--
-- Name: ix_product_organization_id; Type: INDEX; Schema: public; Owner: davis
--

CREATE INDEX ix_product_organization_id ON public.product USING btree (organization_id);


--
-- Name: ix_refund_user_id; Type: INDEX; Schema: public; Owner: davis
--

CREATE INDEX ix_refund_user_id ON public.refund USING btree (user_id);


--
-- Name: ix_users_organization_id; Type: INDEX; Schema: public; Owner: davis
--

CREATE INDEX ix_users_organization_id ON public.users USING btree (organization_id);


--
-- Name: delivery_period fk_delivery_period_organization_id; Type: FK CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.delivery_period
    ADD CONSTRAINT fk_delivery_period_organization_id FOREIGN KEY (organization_id) REFERENCES public.organization(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: orders fk_orders_delivery_period_id; Type: FK CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_orders_delivery_period_id FOREIGN KEY (delivery_period_id) REFERENCES public.delivery_period(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: orders fk_orders_product_id; Type: FK CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_orders_product_id FOREIGN KEY (product_id) REFERENCES public.product(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: orders fk_orders_user_id; Type: FK CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_orders_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: payment fk_payment_user_id; Type: FK CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT fk_payment_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: product fk_product_organization_id; Type: FK CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT fk_product_organization_id FOREIGN KEY (organization_id) REFERENCES public.organization(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: refund fk_refund_user_id; Type: FK CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.refund
    ADD CONSTRAINT fk_refund_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: users fk_users_organization_id; Type: FK CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_users_organization_id FOREIGN KEY (organization_id) REFERENCES public.organization(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

