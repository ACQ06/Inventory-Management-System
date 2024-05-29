PGDMP      -                |            IMS_DB    16.3    16.3 5    -           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            .           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            /           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            0           1262    16398    IMS_DB    DATABASE     �   CREATE DATABASE "IMS_DB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "IMS_DB";
                postgres    false            �            1259    16416    admin    TABLE     }   CREATE TABLE public.admin (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    password text NOT NULL
);
    DROP TABLE public.admin;
       public         heap    postgres    false            �            1259    16415    admin_id_seq    SEQUENCE     �   ALTER TABLE public.admin ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.admin_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218            �            1259    16408    customer    TABLE     �   CREATE TABLE public.customer (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    password text NOT NULL,
    status smallint NOT NULL,
    comment text
);
    DROP TABLE public.customer;
       public         heap    postgres    false            �            1259    16407    customer_id_seq    SEQUENCE     �   ALTER TABLE public.customer ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.customer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216            �            1259    16451    inventory_manager    TABLE     �   CREATE TABLE public.inventory_manager (
    id integer NOT NULL,
    name character varying(255)[] NOT NULL,
    password text NOT NULL
);
 %   DROP TABLE public.inventory_manager;
       public         heap    postgres    false            �            1259    16450    inventory_manager_id_seq    SEQUENCE     �   ALTER TABLE public.inventory_manager ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.inventory_manager_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    222            �            1259    16496    product    TABLE     �   CREATE TABLE public.product (
    id integer NOT NULL,
    supplier_id integer NOT NULL,
    name character varying(255)[] NOT NULL,
    price double precision NOT NULL,
    quantity integer NOT NULL
);
    DROP TABLE public.product;
       public         heap    postgres    false            �            1259    16526    product_batch    TABLE     �   CREATE TABLE public.product_batch (
    id integer NOT NULL,
    product_id integer NOT NULL,
    expiration date NOT NULL,
    quantity integer NOT NULL
);
 !   DROP TABLE public.product_batch;
       public         heap    postgres    false            �            1259    16544    product_batch_id_seq    SEQUENCE     �   ALTER TABLE public.product_batch ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.product_batch_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    229            �            1259    16495    product_id_seq    SEQUENCE     �   ALTER TABLE public.product ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    226            �            1259    16519    purchase_order    TABLE     6  CREATE TABLE public.purchase_order (
    id integer NOT NULL,
    customer_id integer NOT NULL,
    manager_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    date date NOT NULL,
    total_value double precision NOT NULL,
    status smallint NOT NULL,
    comment text
);
 "   DROP TABLE public.purchase_order;
       public         heap    postgres    false            �            1259    16518    purchase_order_id_seq    SEQUENCE     �   ALTER TABLE public.purchase_order ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.purchase_order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    228            �            1259    16478    sales_order    TABLE     R  CREATE TABLE public.sales_order (
    id integer NOT NULL,
    customer_id integer NOT NULL,
    manager_id integer NOT NULL,
    product_id integer NOT NULL,
    batch_id integer NOT NULL,
    quantity integer NOT NULL,
    date date NOT NULL,
    total_value double precision NOT NULL,
    status smallint NOT NULL,
    comment text
);
    DROP TABLE public.sales_order;
       public         heap    postgres    false            �            1259    16477    sales_order_id_seq    SEQUENCE     �   ALTER TABLE public.sales_order ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.sales_order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    224            �            1259    16432    supplier    TABLE     �   CREATE TABLE public.supplier (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    password text NOT NULL
);
    DROP TABLE public.supplier;
       public         heap    postgres    false            �            1259    16431    supplier_id_seq    SEQUENCE     �   ALTER TABLE public.supplier ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.supplier_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    220                      0    16416    admin 
   TABLE DATA           3   COPY public.admin (id, name, password) FROM stdin;
    public          postgres    false    218   �@                 0    16408    customer 
   TABLE DATA           G   COPY public.customer (id, name, password, status, comment) FROM stdin;
    public          postgres    false    216   �@       "          0    16451    inventory_manager 
   TABLE DATA           ?   COPY public.inventory_manager (id, name, password) FROM stdin;
    public          postgres    false    222   �@       &          0    16496    product 
   TABLE DATA           I   COPY public.product (id, supplier_id, name, price, quantity) FROM stdin;
    public          postgres    false    226   �@       )          0    16526    product_batch 
   TABLE DATA           M   COPY public.product_batch (id, product_id, expiration, quantity) FROM stdin;
    public          postgres    false    229   A       (          0    16519    purchase_order 
   TABLE DATA              COPY public.purchase_order (id, customer_id, manager_id, product_id, quantity, date, total_value, status, comment) FROM stdin;
    public          postgres    false    228   A       $          0    16478    sales_order 
   TABLE DATA           �   COPY public.sales_order (id, customer_id, manager_id, product_id, batch_id, quantity, date, total_value, status, comment) FROM stdin;
    public          postgres    false    224   <A                  0    16432    supplier 
   TABLE DATA           6   COPY public.supplier (id, name, password) FROM stdin;
    public          postgres    false    220   YA       1           0    0    admin_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.admin_id_seq', 1, false);
          public          postgres    false    217            2           0    0    customer_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.customer_id_seq', 1, false);
          public          postgres    false    215            3           0    0    inventory_manager_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.inventory_manager_id_seq', 1, false);
          public          postgres    false    221            4           0    0    product_batch_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.product_batch_id_seq', 1, false);
          public          postgres    false    230            5           0    0    product_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.product_id_seq', 1, false);
          public          postgres    false    225            6           0    0    purchase_order_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.purchase_order_id_seq', 1, false);
          public          postgres    false    227            7           0    0    sales_order_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.sales_order_id_seq', 1, false);
          public          postgres    false    223            8           0    0    supplier_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.supplier_id_seq', 1, false);
          public          postgres    false    219            v           2606    16422    admin admin_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.admin DROP CONSTRAINT admin_pkey;
       public            postgres    false    218            t           2606    16414    customer customer_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.customer DROP CONSTRAINT customer_pkey;
       public            postgres    false    216            z           2606    16457 (   inventory_manager inventory_manager_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.inventory_manager
    ADD CONSTRAINT inventory_manager_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.inventory_manager DROP CONSTRAINT inventory_manager_pkey;
       public            postgres    false    222            �           2606    16549     product_batch product_batch_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.product_batch
    ADD CONSTRAINT product_batch_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.product_batch DROP CONSTRAINT product_batch_pkey;
       public            postgres    false    229            ~           2606    16502    product product_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.product DROP CONSTRAINT product_pkey;
       public            postgres    false    226            �           2606    16525 "   purchase_order purchase_order_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.purchase_order
    ADD CONSTRAINT purchase_order_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.purchase_order DROP CONSTRAINT purchase_order_pkey;
       public            postgres    false    228            |           2606    16484    sales_order sales_order_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.sales_order
    ADD CONSTRAINT sales_order_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.sales_order DROP CONSTRAINT sales_order_pkey;
       public            postgres    false    224            x           2606    16438    supplier supplier_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.supplier
    ADD CONSTRAINT supplier_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.supplier DROP CONSTRAINT supplier_pkey;
       public            postgres    false    220            �           2606    16550    product_batch batch_product_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_batch
    ADD CONSTRAINT batch_product_fk FOREIGN KEY (product_id) REFERENCES public.product(id) ON DELETE RESTRICT NOT VALID;
 H   ALTER TABLE ONLY public.product_batch DROP CONSTRAINT batch_product_fk;
       public          postgres    false    4734    226    229            �           2606    16513    product product_supplier_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_supplier_fk FOREIGN KEY (supplier_id) REFERENCES public.supplier(id) ON DELETE RESTRICT NOT VALID;
 E   ALTER TABLE ONLY public.product DROP CONSTRAINT product_supplier_fk;
       public          postgres    false    226    220    4728            �           2606    16560 )   purchase_order purchase_order_customer_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.purchase_order
    ADD CONSTRAINT purchase_order_customer_fk FOREIGN KEY (customer_id) REFERENCES public.customer(id) ON DELETE RESTRICT NOT VALID;
 S   ALTER TABLE ONLY public.purchase_order DROP CONSTRAINT purchase_order_customer_fk;
       public          postgres    false    4724    228    216            �           2606    16565 (   purchase_order purchase_order_manager_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.purchase_order
    ADD CONSTRAINT purchase_order_manager_fk FOREIGN KEY (manager_id) REFERENCES public.inventory_manager(id) ON DELETE RESTRICT NOT VALID;
 R   ALTER TABLE ONLY public.purchase_order DROP CONSTRAINT purchase_order_manager_fk;
       public          postgres    false    228    4730    222            �           2606    16570 (   purchase_order purchase_order_product_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.purchase_order
    ADD CONSTRAINT purchase_order_product_fk FOREIGN KEY (product_id) REFERENCES public.product(id) ON DELETE RESTRICT NOT VALID;
 R   ALTER TABLE ONLY public.purchase_order DROP CONSTRAINT purchase_order_product_fk;
       public          postgres    false    228    226    4734            �           2606    16555     sales_order sales_order_batch_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.sales_order
    ADD CONSTRAINT sales_order_batch_fk FOREIGN KEY (batch_id) REFERENCES public.product_batch(id) ON DELETE RESTRICT NOT VALID;
 J   ALTER TABLE ONLY public.sales_order DROP CONSTRAINT sales_order_batch_fk;
       public          postgres    false    229    4738    224            �           2606    16485 #   sales_order sales_order_customer_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.sales_order
    ADD CONSTRAINT sales_order_customer_fk FOREIGN KEY (customer_id) REFERENCES public.customer(id) ON DELETE RESTRICT;
 M   ALTER TABLE ONLY public.sales_order DROP CONSTRAINT sales_order_customer_fk;
       public          postgres    false    216    224    4724            �           2606    16490 "   sales_order sales_order_manager_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.sales_order
    ADD CONSTRAINT sales_order_manager_fk FOREIGN KEY (manager_id) REFERENCES public.inventory_manager(id) ON DELETE RESTRICT;
 L   ALTER TABLE ONLY public.sales_order DROP CONSTRAINT sales_order_manager_fk;
       public          postgres    false    4730    224    222            �           2606    16508 "   sales_order sales_order_product_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.sales_order
    ADD CONSTRAINT sales_order_product_fk FOREIGN KEY (product_id) REFERENCES public.product(id) ON DELETE RESTRICT NOT VALID;
 L   ALTER TABLE ONLY public.sales_order DROP CONSTRAINT sales_order_product_fk;
       public          postgres    false    224    4734    226                  x������ � �            x������ � �      "      x������ � �      &      x������ � �      )      x������ � �      (      x������ � �      $      x������ � �             x������ � �     