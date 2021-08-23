--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4 (Debian 13.4-1.pgdg100+1)
-- Dumped by pg_dump version 13.4

-- Started on 2021-08-23 23:17:44

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


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 2964 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 16421)
-- Name: activities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activities (
    id uuid NOT NULL,
    "resourceId" uuid,
    "resourceName" character varying(255),
    type character varying(255),
    content character varying(255),
    occurred timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.activities OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16391)
-- Name: brands; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.brands (
    id uuid NOT NULL,
    name character varying(255),
    "creationDate" timestamp with time zone NOT NULL,
    "updatedOn" timestamp with time zone NOT NULL,
    "deletionDate" timestamp with time zone
);


ALTER TABLE public.brands OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16394)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id uuid NOT NULL,
    name character varying(255),
    "creationDate" timestamp with time zone NOT NULL,
    "updatedOn" timestamp with time zone NOT NULL,
    "deletionDate" timestamp with time zone
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16397)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id uuid NOT NULL,
    name character varying(255),
    price double precision,
    "brandId" uuid,
    color character varying(255),
    "categoryId" uuid,
    "creationDate" timestamp with time zone NOT NULL,
    "updatedOn" timestamp with time zone NOT NULL,
    "deletionDate" timestamp with time zone
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 2958 (class 0 OID 16421)
-- Dependencies: 203
-- Data for Name: activities; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2955 (class 0 OID 16391)
-- Dependencies: 200
-- Data for Name: brands; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.brands VALUES ('249176ea-24d8-40e5-a729-fab46430986c', 'Gigabyte', '2021-08-22 08:27:06.138+00', '2021-08-22 08:27:06.138+00', NULL);
INSERT INTO public.brands VALUES ('e430a5de-b63a-43da-b98a-447f733e1118', 'Asus', '2021-08-22 08:27:06.141+00', '2021-08-22 08:27:06.141+00', NULL);
INSERT INTO public.brands VALUES ('faf9cae8-626e-4197-8ea5-6184881c12e3', 'MSI', '2021-08-22 08:27:06.144+00', '2021-08-22 08:27:06.144+00', NULL);
INSERT INTO public.brands VALUES ('16cf2599-357d-4748-b72a-2addde5113ca', 'Intel', '2021-08-22 08:27:06+00', '2021-08-22 08:27:06+00', NULL);
INSERT INTO public.brands VALUES ('2fa5b74c-279c-4503-83b4-433fa8df261c', 'AMD', '2021-08-22 08:27:06+00', '2021-08-22 08:27:06+00', NULL);
INSERT INTO public.brands VALUES ('39203700-7d95-4bac-bc5e-e2520b130b73', 'Corsair', '2021-08-22 08:27:06+00', '2021-08-22 08:27:06+00', NULL);


--
-- TOC entry 2956 (class 0 OID 16394)
-- Dependencies: 201
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categories VALUES ('aa4ef1f7-7956-43cd-9b28-cf921e249c51', 'VGA - Card Đồ Họa', '2021-08-22 08:12:15.325+00', '2021-08-22 08:12:15.325+00', NULL);
INSERT INTO public.categories VALUES ('e2caf318-7ac6-44ce-97c5-aa57927c3f4c', 'CPU - Bộ Vi Xử Lý', '2021-08-22 08:27:06.115+00', '2021-08-22 08:27:06.115+00', NULL);
INSERT INTO public.categories VALUES ('68a1dffd-e702-41e9-9c93-9c594ba0d975', 'RAM - Bộ Nhớ Trong', '2021-08-22 08:27:06.134+00', '2021-08-22 08:27:06.134+00', NULL);
INSERT INTO public.categories VALUES ('8cd6b8a0-f51d-4b6e-a006-e04aeb5db2f3', 'Mainboard - Bo Mạch Chủ', '2021-08-22 08:27:06+00', '2021-08-22 08:27:06+00', NULL);


--
-- TOC entry 2957 (class 0 OID 16397)
-- Dependencies: 202
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.products VALUES ('edcf6c53-728f-4fa9-ab52-669a30cda0fb', 'Gigabyte GeForce RTX™ 3090 FTW3 ULTRA GAMING – 24GB GDDR6X', 60990000, '249176ea-24d8-40e5-a729-fab46430986c', 'black', 'aa4ef1f7-7956-43cd-9b28-cf921e249c51', '2021-08-22 08:34:10.073+00', '2021-08-22 08:34:10.073+00', NULL);
INSERT INTO public.products VALUES ('ecc2f4f1-b498-426e-96a9-2dde94d27a7a', 'Intel Core i7-11700 8C/16T 16MB Cache 2.50 GHz Upto 4.90 GHz', 9150000, '16cf2599-357d-4748-b72a-2addde5113ca', NULL, 'e2caf318-7ac6-44ce-97c5-aa57927c3f4c', '2021-08-22 08:34:10+00', '2021-08-22 08:34:10+00', NULL);
INSERT INTO public.products VALUES ('090afe5e-ec69-47dc-a2f6-6277f5e762a4', 'AMD Ryzen™ 9 5900X 12C/24T Upto 4.8GHz', 15090000, '2fa5b74c-279c-4503-83b4-433fa8df261c', NULL, 'e2caf318-7ac6-44ce-97c5-aa57927c3f4c', '2021-08-22 08:34:10+00', '2021-08-22 08:34:10+00', NULL);
INSERT INTO public.products VALUES ('c88c4f48-0f8d-402c-a6d2-ebf4e05bc9a1', 'Intel Core I5-10400 6C/12T 12MB Cache 2.90 GHz Upto 4.30 GHz', 4950000, '16cf2599-357d-4748-b72a-2addde5113ca', NULL, 'e2caf318-7ac6-44ce-97c5-aa57927c3f4c', '2021-08-22 08:34:10+00', '2021-08-22 08:34:10+00', NULL);
INSERT INTO public.products VALUES ('1171ad26-3fb9-4548-84b6-847f2360c25d', 'AMD Radeon™ RX 6900 XT 16G – 16GB GDDR6', 45000000, '2fa5b74c-279c-4503-83b4-433fa8df261c', 'gray', 'aa4ef1f7-7956-43cd-9b28-cf921e249c51', '2021-08-22 08:34:10+00', '2021-08-22 08:34:10+00', NULL);
INSERT INTO public.products VALUES ('40a4a6ae-468d-474c-9261-2665eeb6d021', 'Gigabyte B460 HD3 V2 (Rev 1.0) – Socket 1200', 5000000, '249176ea-24d8-40e5-a729-fab46430986c', NULL, '8cd6b8a0-f51d-4b6e-a006-e04aeb5db2f3', '2021-08-22 08:34:10+00', '2021-08-22 08:34:10+00', NULL);
INSERT INTO public.products VALUES ('1a1cb795-41b4-45ae-aed8-27623a133395', 'MSI MAG B560M MORTAR – Socket 1200', 3490000, 'faf9cae8-626e-4197-8ea5-6184881c12e3', NULL, '8cd6b8a0-f51d-4b6e-a006-e04aeb5db2f3', '2021-08-22 08:34:10+00', '2021-08-22 08:34:10+00', NULL);
INSERT INTO public.products VALUES ('c620ed0d-c78a-43ae-af4d-a0db89703cfa', 'Corsair Dominator Platinum RGB 32GB (2x16GB) Bus 3000 Cas15 – DDR4', 5850000, '39203700-7d95-4bac-bc5e-e2520b130b73', 'red', '68a1dffd-e702-41e9-9c93-9c594ba0d975', '2021-08-22 08:34:10+00', '2021-08-22 08:34:10+00', NULL);
INSERT INTO public.products VALUES ('c1408c08-047b-40b8-acaf-4bccb4ead4d4', 'Corsair Vengeance RGB PRO 64GB (2 x32GB) DDR4 3200C16', 10590000, '39203700-7d95-4bac-bc5e-e2520b130b73', 'black', '68a1dffd-e702-41e9-9c93-9c594ba0d975', '2021-08-22 08:34:10+00', '2021-08-22 08:34:10+00', NULL);
INSERT INTO public.products VALUES ('c020ca3e-dda2-4948-b5c1-2280f948c37e', 'MSI Geforce RTX™ 3060Ti GAMING X 8G – 8GB GDDR6 ( LHR )', 17990000, 'faf9cae8-626e-4197-8ea5-6184881c12e3', 'black', 'aa4ef1f7-7956-43cd-9b28-cf921e249c51', '2021-08-22 08:34:10+00', '2021-08-22 08:34:10+00', NULL);


--
-- TOC entry 2822 (class 2606 OID 16428)
-- Name: activities activities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_pkey PRIMARY KEY (id);


--
-- TOC entry 2816 (class 2606 OID 16406)
-- Name: brands brands_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (id);


--
-- TOC entry 2818 (class 2606 OID 16408)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 2820 (class 2606 OID 16410)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 2823 (class 2606 OID 16411)
-- Name: products products_brandId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES public.brands(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2824 (class 2606 OID 16416)
-- Name: products products_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2021-08-23 23:17:45

--
-- PostgreSQL database dump complete
--

