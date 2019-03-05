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
-- Name: card; Type: TABLE; Schema: public; Owner: davis
--

CREATE TABLE public.card (
    id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    deprecated_at timestamp without time zone,
    status integer DEFAULT 0,
    token character varying NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.card OWNER TO davis;

--
-- Name: card_id_seq; Type: SEQUENCE; Schema: public; Owner: davis
--

CREATE SEQUENCE public.card_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.card_id_seq OWNER TO davis;

--
-- Name: card_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: davis
--

ALTER SEQUENCE public.card_id_seq OWNED BY public.card.id;


--
-- Name: cardrefund; Type: TABLE; Schema: public; Owner: davis
--

CREATE TABLE public.cardrefund (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT '2019-03-03 17:42:29.029802'::timestamp without time zone NOT NULL,
    updated_at timestamp without time zone DEFAULT '2019-03-03 17:42:29.029802'::timestamp without time zone NOT NULL,
    deprecated_at timestamp without time zone,
    status integer DEFAULT 0 NOT NULL,
    card_id bigint NOT NULL,
    payment_id bigint NOT NULL
);


ALTER TABLE public.cardrefund OWNER TO davis;

--
-- Name: cardrefund_id_seq; Type: SEQUENCE; Schema: public; Owner: davis
--

CREATE SEQUENCE public.cardrefund_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cardrefund_id_seq OWNER TO davis;

--
-- Name: cardrefund_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: davis
--

ALTER SEQUENCE public.cardrefund_id_seq OWNED BY public.cardrefund.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: davis
--

CREATE TABLE public.orders (
    id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deprecated_at timestamp without time zone,
    status integer DEFAULT 0 NOT NULL,
    user_id integer NOT NULL,
    product_id integer NOT NULL,
    location character varying NOT NULL,
    notes character varying
);


ALTER TABLE public.orders OWNER TO davis;

--
-- Name: order_id_seq; Type: SEQUENCE; Schema: public; Owner: davis
--

CREATE SEQUENCE public.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_id_seq OWNER TO davis;

--
-- Name: order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: davis
--

ALTER SEQUENCE public.order_id_seq OWNED BY public.orders.id;


--
-- Name: organization; Type: TABLE; Schema: public; Owner: davis
--

CREATE TABLE public.organization (
    id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deprecated_at timestamp without time zone,
    status integer DEFAULT 0 NOT NULL,
    name character varying
);


ALTER TABLE public.organization OWNER TO davis;

--
-- Name: organization_id_seq; Type: SEQUENCE; Schema: public; Owner: davis
--

CREATE SEQUENCE public.organization_id_seq
    AS integer
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
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deprecated_at timestamp without time zone,
    status integer DEFAULT 0 NOT NULL,
    user_id integer NOT NULL,
    type character varying NOT NULL,
    amount integer NOT NULL,
    card_id integer
);


ALTER TABLE public.payment OWNER TO davis;

--
-- Name: payment_id_seq; Type: SEQUENCE; Schema: public; Owner: davis
--

CREATE SEQUENCE public.payment_id_seq
    AS integer
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
-- Name: product; Type: TABLE; Schema: public; Owner: davis
--

CREATE TABLE public.product (
    id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deprecated_at timestamp without time zone,
    status integer DEFAULT 0 NOT NULL,
    organization_id integer NOT NULL,
    name character varying NOT NULL,
    description character varying,
    price integer NOT NULL
);


ALTER TABLE public.product OWNER TO davis;

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: davis
--

CREATE SEQUENCE public.product_id_seq
    AS integer
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
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deprecated_at timestamp without time zone,
    status integer DEFAULT 0 NOT NULL,
    user_id integer NOT NULL,
    order_id integer NOT NULL,
    amount integer NOT NULL
);


ALTER TABLE public.refund OWNER TO davis;

--
-- Name: refund_id_seq; Type: SEQUENCE; Schema: public; Owner: davis
--

CREATE SEQUENCE public.refund_id_seq
    AS integer
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
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deprecated_at timestamp without time zone,
    status integer DEFAULT 0 NOT NULL,
    organization_id integer NOT NULL,
    firstname character varying NOT NULL,
    lastname character varying NOT NULL,
    firebase_user_id character varying NOT NULL,
    last_logged_in timestamp without time zone,
    role integer NOT NULL,
    email character varying NOT NULL,
    balance integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.users OWNER TO davis;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: davis
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO davis;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: davis
--

ALTER SEQUENCE public.user_id_seq OWNED BY public.users.id;


--
-- Name: card id; Type: DEFAULT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.card ALTER COLUMN id SET DEFAULT nextval('public.card_id_seq'::regclass);


--
-- Name: cardrefund id; Type: DEFAULT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.cardrefund ALTER COLUMN id SET DEFAULT nextval('public.cardrefund_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);


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

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: card; Type: TABLE DATA; Schema: public; Owner: davis
--

COPY public.card (id, created_at, updated_at, deprecated_at, status, token, user_id) FROM stdin;
\.


--
-- Data for Name: cardrefund; Type: TABLE DATA; Schema: public; Owner: davis
--

COPY public.cardrefund (id, created_at, updated_at, deprecated_at, status, card_id, payment_id) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: davis
--

COPY public.orders (id, created_at, updated_at, deprecated_at, status, user_id, product_id, location, notes) FROM stdin;
\.


--
-- Data for Name: organization; Type: TABLE DATA; Schema: public; Owner: davis
--

COPY public.organization (id, created_at, updated_at, deprecated_at, status, name) FROM stdin;
3	2019-02-22 00:52:18.773749	2019-02-22 00:52:18.773749	\N	0	Test Org
\.


--
-- Data for Name: payment; Type: TABLE DATA; Schema: public; Owner: davis
--

COPY public.payment (id, created_at, updated_at, deprecated_at, status, user_id, type, amount, card_id) FROM stdin;
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: davis
--

COPY public.product (id, created_at, updated_at, deprecated_at, status, organization_id, name, description, price) FROM stdin;
\.


--
-- Data for Name: refund; Type: TABLE DATA; Schema: public; Owner: davis
--

COPY public.refund (id, created_at, updated_at, deprecated_at, status, user_id, order_id, amount) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: davis
--

COPY public.users (id, created_at, updated_at, deprecated_at, status, organization_id, firstname, lastname, firebase_user_id, last_logged_in, role, email, balance) FROM stdin;
5	2019-03-04 21:56:04.264	2019-03-04 21:56:04.264	\N	0	3	Davis	Mariotti	76GqSI6ohMaBGAiDRvGOqgb6tp03	\N	0	davismariotti@gmail.com	0
\.


--
-- Name: card_id_seq; Type: SEQUENCE SET; Schema: public; Owner: davis
--

SELECT pg_catalog.setval('public.card_id_seq', 1, false);


--
-- Name: cardrefund_id_seq; Type: SEQUENCE SET; Schema: public; Owner: davis
--

SELECT pg_catalog.setval('public.cardrefund_id_seq', 1, false);


--
-- Name: order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: davis
--

SELECT pg_catalog.setval('public.order_id_seq', 1, false);


--
-- Name: organization_id_seq; Type: SEQUENCE SET; Schema: public; Owner: davis
--

SELECT pg_catalog.setval('public.organization_id_seq', 12, true);


--
-- Name: payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: davis
--

SELECT pg_catalog.setval('public.payment_id_seq', 1, false);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: davis
--

SELECT pg_catalog.setval('public.product_id_seq', 1, false);


--
-- Name: refund_id_seq; Type: SEQUENCE SET; Schema: public; Owner: davis
--

SELECT pg_catalog.setval('public.refund_id_seq', 1, false);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: davis
--

SELECT pg_catalog.setval('public.user_id_seq', 5, true);


--
-- Name: card card_pkey; Type: CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.card
    ADD CONSTRAINT card_pkey PRIMARY KEY (id);


--
-- Name: cardrefund cardrefund_pkey; Type: CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.cardrefund
    ADD CONSTRAINT cardrefund_pkey PRIMARY KEY (id);


--
-- Name: orders order_pkey; Type: CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);


--
-- Name: organization organization_pkey; Type: CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_pkey PRIMARY KEY (id);


--
-- Name: payment payment_pkey; Type: CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT payment_pkey PRIMARY KEY (id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: refund refund_pkey; Type: CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.refund
    ADD CONSTRAINT refund_pkey PRIMARY KEY (id);


--
-- Name: users user_pkey; Type: CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user_firebase_token; Type: INDEX; Schema: public; Owner: davis
--

CREATE UNIQUE INDEX user_firebase_token ON public.users USING btree (firebase_user_id);


--
-- Name: card card_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.card
    ADD CONSTRAINT card_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: cardrefund cardrefund_card_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.cardrefund
    ADD CONSTRAINT cardrefund_card_id_fkey FOREIGN KEY (card_id) REFERENCES public.card(id);


--
-- Name: cardrefund cardrefund_payment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.cardrefund
    ADD CONSTRAINT cardrefund_payment_id_fkey FOREIGN KEY (payment_id) REFERENCES public.payment(id);


--
-- Name: orders order_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT order_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: orders order_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT order_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: payment payment_card_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT payment_card_id_fkey FOREIGN KEY (card_id) REFERENCES public.card(id);


--
-- Name: payment payment_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT payment_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: product product_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organization(id);


--
-- Name: refund refund_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.refund
    ADD CONSTRAINT refund_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: refund refund_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.refund
    ADD CONSTRAINT refund_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: users user_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: davis
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organization(id);


--
-- PostgreSQL database dump complete
--

