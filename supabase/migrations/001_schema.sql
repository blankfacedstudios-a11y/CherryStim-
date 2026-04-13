create extension if not exists "uuid-ossp";

create table profiles (
  id uuid primary key references auth.users,
  display_name text,
  role text check (role in ('client', 'dancer')),
  tier text default 'Pro',
  created_at timestamp default now()
);

create table coin_wallets (
  user_id uuid primary key references profiles(id),
  balance bigint default 0
);

create table dancer_profiles (
  user_id uuid primary key references profiles(id),
  bio text,
  gear_owner text default 'cherrystim'
);

create table transactions (
  id uuid primary key default uuid_generate_v4(),
  from_user uuid references profiles(id),
  to_user uuid references profiles(id),
  amount bigint,
  type text,
  created_at timestamp default now()
);
