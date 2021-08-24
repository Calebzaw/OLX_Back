--
-- PostgreSQL database dump
--

-- Dumped from database version 12.8 (Ubuntu 12.8-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.8 (Ubuntu 12.8-0ubuntu0.20.04.1)

-- Started on 2021-08-24 14:28:31 -03

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
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3028 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 211 (class 1259 OID 17126)
-- Name: ads; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ads (
    idad bigint NOT NULL,
    adstatus boolean DEFAULT true NOT NULL,
    iduser bigint NOT NULL,
    idstate bigint NOT NULL,
    title character varying(50) NOT NULL,
    idcat bigint NOT NULL,
    price numeric(12,2) NOT NULL,
    priceneg boolean DEFAULT false NOT NULL,
    description text NOT NULL,
    adviews integer DEFAULT 0 NOT NULL,
    datecreated timestamp without time zone NOT NULL
);


ALTER TABLE public.ads OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 17124)
-- Name: ads_idads_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ads_idads_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ads_idads_seq OWNER TO postgres;

--
-- TOC entry 3029 (class 0 OID 0)
-- Dependencies: 210
-- Name: ads_idads_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ads_idads_seq OWNED BY public.ads.idad;


--
-- TOC entry 207 (class 1259 OID 17074)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    idcat bigint NOT NULL,
    dscat character varying(30) NOT NULL,
    slug character varying(30) NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 17072)
-- Name: categories_idcat_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_idcat_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_idcat_seq OWNER TO postgres;

--
-- TOC entry 3030 (class 0 OID 0)
-- Dependencies: 206
-- Name: categories_idcat_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_idcat_seq OWNED BY public.categories.idcat;


--
-- TOC entry 213 (class 1259 OID 17165)
-- Name: images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.images (
    idimage bigint NOT NULL,
    idad bigint,
    url text NOT NULL,
    flimage boolean DEFAULT false NOT NULL
);


ALTER TABLE public.images OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 17163)
-- Name: images_idimage_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.images_idimage_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.images_idimage_seq OWNER TO postgres;

--
-- TOC entry 3031 (class 0 OID 0)
-- Dependencies: 212
-- Name: images_idimage_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.images_idimage_seq OWNED BY public.images.idimage;


--
-- TOC entry 205 (class 1259 OID 17068)
-- Name: states; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.states (
    idstate bigint NOT NULL,
    dsstate character varying(10) NOT NULL
);


ALTER TABLE public.states OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 17066)
-- Name: states_idstate_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.states_idstate_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.states_idstate_seq OWNER TO postgres;

--
-- TOC entry 3032 (class 0 OID 0)
-- Dependencies: 204
-- Name: states_idstate_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.states_idstate_seq OWNED BY public.states.idstate;


--
-- TOC entry 209 (class 1259 OID 17084)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    iduser bigint NOT NULL,
    nmuser character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    phash text NOT NULL,
    utoken text NOT NULL,
    idstate bigint NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 17082)
-- Name: users_iduser_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_iduser_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_iduser_seq OWNER TO postgres;

--
-- TOC entry 3033 (class 0 OID 0)
-- Dependencies: 208
-- Name: users_iduser_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_iduser_seq OWNED BY public.users.iduser;


--
-- TOC entry 2864 (class 2604 OID 17129)
-- Name: ads idad; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ads ALTER COLUMN idad SET DEFAULT nextval('public.ads_idads_seq'::regclass);


--
-- TOC entry 2862 (class 2604 OID 17077)
-- Name: categories idcat; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN idcat SET DEFAULT nextval('public.categories_idcat_seq'::regclass);


--
-- TOC entry 2868 (class 2604 OID 17168)
-- Name: images idimage; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images ALTER COLUMN idimage SET DEFAULT nextval('public.images_idimage_seq'::regclass);


--
-- TOC entry 2861 (class 2604 OID 17071)
-- Name: states idstate; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.states ALTER COLUMN idstate SET DEFAULT nextval('public.states_idstate_seq'::regclass);


--
-- TOC entry 2863 (class 2604 OID 17087)
-- Name: users iduser; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN iduser SET DEFAULT nextval('public.users_iduser_seq'::regclass);


--
-- TOC entry 3020 (class 0 OID 17126)
-- Dependencies: 211
-- Data for Name: ads; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ads (idad, adstatus, iduser, idstate, title, idcat, price, priceneg, description, adviews, datecreated) FROM stdin;
27	t	1	2	Ad sem imagem	1	100.35	f	Alguma descrição qualquer	5	2021-08-23 17:32:17.178
26	t	1	2	Ad de teste	1	100.35	t	Alguma descrição qualquer	39	2021-08-20 20:36:14.466
\.


--
-- TOC entry 3016 (class 0 OID 17074)
-- Dependencies: 207
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (idcat, dscat, slug) FROM stdin;
1	Bebês	baby
2	Carros	cars
3	Roupas	clothes
4	Eletrônicos	eletronics
5	Esportes	sports
\.


--
-- TOC entry 3022 (class 0 OID 17165)
-- Dependencies: 213
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.images (idimage, idad, url, flimage) FROM stdin;
19	26	21be363e-7f9e-4e32-a4da-3309e755800b.jpg	t
\.


--
-- TOC entry 3014 (class 0 OID 17068)
-- Dependencies: 205
-- Data for Name: states; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.states (idstate, dsstate) FROM stdin;
1	SC
2	SP
3	RJ
4	RS
5	PR
\.


--
-- TOC entry 3018 (class 0 OID 17084)
-- Dependencies: 209
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (iduser, nmuser, email, phash, utoken, idstate) FROM stdin;
3	teste	teste2@teste.com	$2b$10$ru2ax.O0MoCwb87pdEzj.uV4m7SWr.LZIRWj89zhKRlC/3WiPDtXS	$2b$10$zGLx087mRpQmLrDteMZZQuB.IJqXVHxp3yO6ChF5N3jFlz6Gax9MC	1
4	teste	teste4@teste.com	$2b$10$Lhw1pvYDlagy286icYBDb.lJWBR1rfISBYs7Eer6Vn/7CBPs3ZGfC	$2b$10$3O8laBEun5vYvNmcLs0WDeN.K5ictKfWLevp/Cg2UZklf7p5tZ//C	1
5	teste	teste5@teste.com	$2b$10$dJmBMRjDzqzUpg5g7wZ/EuqNHCXRnmNnPmj6cmjoqbmhIb.IIO4z6	$2b$10$04T5YCHC3K3l2recPx4HP.RPHue4OgBZCrTTSOEcn4JsXVCyEoji.	1
1	João	teste@teste.com	$2b$10$cDwdXodOCzm3kRVVwQN43uTfrESY2rZrYfluTvFWM.v7sRDvj.7ZW	$2b$10$gr6OTAkjz3bk73SL4KxUHe/SquT77WF.gv2sHRpOYqOuex0qDZo0m	2
\.


--
-- TOC entry 3034 (class 0 OID 0)
-- Dependencies: 210
-- Name: ads_idads_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ads_idads_seq', 27, true);


--
-- TOC entry 3035 (class 0 OID 0)
-- Dependencies: 206
-- Name: categories_idcat_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_idcat_seq', 5, true);


--
-- TOC entry 3036 (class 0 OID 0)
-- Dependencies: 212
-- Name: images_idimage_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.images_idimage_seq', 19, true);


--
-- TOC entry 3037 (class 0 OID 0)
-- Dependencies: 204
-- Name: states_idstate_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.states_idstate_seq', 5, true);


--
-- TOC entry 3038 (class 0 OID 0)
-- Dependencies: 208
-- Name: users_iduser_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_iduser_seq', 12, true);


--
-- TOC entry 2879 (class 2606 OID 17137)
-- Name: ads ads_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ads
    ADD CONSTRAINT ads_pk PRIMARY KEY (idad);


--
-- TOC entry 2873 (class 2606 OID 17081)
-- Name: categories categories_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pk PRIMARY KEY (idcat);


--
-- TOC entry 2881 (class 2606 OID 17174)
-- Name: images images_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pk PRIMARY KEY (idimage);


--
-- TOC entry 2871 (class 2606 OID 17079)
-- Name: states states_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.states
    ADD CONSTRAINT states_pk PRIMARY KEY (idstate);


--
-- TOC entry 2875 (class 2606 OID 17092)
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (iduser);


--
-- TOC entry 2877 (class 2606 OID 17094)
-- Name: users users_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_un UNIQUE (email);


--
-- TOC entry 2883 (class 2606 OID 17138)
-- Name: ads ads_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ads
    ADD CONSTRAINT ads_fk FOREIGN KEY (iduser) REFERENCES public.users(iduser);


--
-- TOC entry 2884 (class 2606 OID 17143)
-- Name: ads ads_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ads
    ADD CONSTRAINT ads_fk_1 FOREIGN KEY (idstate) REFERENCES public.states(idstate);


--
-- TOC entry 2885 (class 2606 OID 17148)
-- Name: ads ads_fk_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ads
    ADD CONSTRAINT ads_fk_2 FOREIGN KEY (idcat) REFERENCES public.categories(idcat);


--
-- TOC entry 2886 (class 2606 OID 17175)
-- Name: images images_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_fk FOREIGN KEY (idad) REFERENCES public.ads(idad);


--
-- TOC entry 2882 (class 2606 OID 17095)
-- Name: users users_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_fk FOREIGN KEY (idstate) REFERENCES public.states(idstate);


-- Completed on 2021-08-24 14:28:31 -03

--
-- PostgreSQL database dump complete
--

