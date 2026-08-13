-- Seed data mirrored from lib/mock-data.js, for local testing against a real
-- database instead of an empty one.
--
-- profiles.id is a foreign key into auth.users, but real accounts only exist
-- once someone signs up (a later phase). To satisfy that FK for seed data we
-- insert matching placeholder rows into auth.users below. These are NOT real
-- accounts — the passwords are throwaway values and nobody should sign in as
-- them. Don't run this against a database with real users unless you're
-- comfortable with these placeholder accounts existing alongside them.
--
-- Note on likes/comments: lib/mock-data.js stored like/comment counts as
-- plain integers (e.g. 32 likes). Now that likes/comments are real rows,
-- this seed only creates one row per seeded profile per post at most (8
-- profiles total), so the resulting counts will be much lower than the old
-- mock numbers. That's expected — the UI should count rows, not read a
-- stored number.

-- ---------------------------------------------------------------------------
-- Placeholder auth.users rows (so profiles.id FK is satisfiable)
-- ---------------------------------------------------------------------------
insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
  created_at, updated_at, confirmation_token, email_change,
  email_change_token_new, recovery_token
)
values
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'authenticated', 'authenticated', 'sok.dara@pp.bbu.edu.kh', crypt('placeholder', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{}', now(), now(), '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222222', 'authenticated', 'authenticated', 'chanthorn.pich@pp.bbu.edu.kh', crypt('placeholder', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{}', now(), now(), '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '33333333-3333-3333-3333-333333333333', 'authenticated', 'authenticated', 'ratanak.chea@pp.bbu.edu.kh', crypt('placeholder', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{}', now(), now(), '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '44444444-4444-4444-4444-444444444444', 'authenticated', 'authenticated', 'vanna.ung@pp.bbu.edu.kh', crypt('placeholder', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{}', now(), now(), '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '55555555-5555-5555-5555-555555555555', 'authenticated', 'authenticated', 'rithy.sok@pp.bbu.edu.kh', crypt('placeholder', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{}', now(), now(), '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '66666666-6666-6666-6666-666666666666', 'authenticated', 'authenticated', 'sokha.ly@pp.bbu.edu.kh', crypt('placeholder', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{}', now(), now(), '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '77777777-7777-7777-7777-777777777777', 'authenticated', 'authenticated', 'bunthoeun.prak@pp.bbu.edu.kh', crypt('placeholder', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{}', now(), now(), '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '88888888-8888-8888-8888-888888888888', 'authenticated', 'authenticated', 'chenda.mao@pp.bbu.edu.kh', crypt('placeholder', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{}', now(), now(), '', '', '', '')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- profiles (from lib/mock-data.js `members` / `idCardMember`)
-- ---------------------------------------------------------------------------
insert into public.profiles (id, name, initials, department, batch, id_number, role, verified_at)
values
  ('11111111-1111-1111-1111-111111111111', 'Sok Dara', 'SD', 'Department of Information Technology', 'Gen 25 · Year 3', 'BBU-2024-00147', 'student', now() - interval '30 days'),
  ('22222222-2222-2222-2222-222222222222', 'Chan Thorn Pich', 'CP', 'Department of Information Technology', 'Gen 25 · Year 3', 'BBU-2024-00148', 'student', now() - interval '29 days'),
  ('33333333-3333-3333-3333-333333333333', 'Ratanak Chea', 'RC', 'Department of Information Technology', 'Gen 23 · Year 4', 'BBU-2024-00149', 'student', now() - interval '60 days'),
  ('44444444-4444-4444-4444-444444444444', 'Vanna Ung', 'VU', 'Department of Information Technology', 'Gen 25 · Year 3', 'BBU-2024-00150', 'student', now() - interval '28 days'),
  ('55555555-5555-5555-5555-555555555555', 'Rithy Sok', 'RS', 'Department of Information Technology', 'Faculty', 'BBU-2024-00151', 'lecturer', now() - interval '90 days'),
  ('66666666-6666-6666-6666-666666666666', 'Sokha Ly', 'SL', 'Department of Information Technology', 'Gen 26 · Year 2', 'BBU-2024-00152', 'student', now() - interval '20 days'),
  ('77777777-7777-7777-7777-777777777777', 'Bunthoeun Prak', 'BP', 'Department of Information Technology', 'Gen 23 · Year 4', 'BBU-2024-00153', 'student', now() - interval '55 days'),
  ('88888888-8888-8888-8888-888888888888', 'Chenda Mao', 'CM', 'Department of Information Technology', 'Gen 27 · Year 1', 'BBU-2024-00154', 'student', now() - interval '10 days')
-- `on conflict do nothing` would lose this data: the auth.users insert
-- above sets email_confirmed_at directly, which fires
-- handle_verified_user() (0003_profile_on_signup.sql) immediately and
-- creates an empty (name/department/etc. all null) profiles row for each
-- id *before* this statement runs. `do update` makes the real seed values
-- win over that placeholder instead of silently losing to it.
on conflict (id) do update set
  name = excluded.name,
  initials = excluded.initials,
  department = excluded.department,
  batch = excluded.batch,
  id_number = excluded.id_number,
  role = excluded.role,
  verified_at = excluded.verified_at;

-- ---------------------------------------------------------------------------
-- posts — type = 'feed' (from lib/mock-data.js `feedPosts`)
-- ---------------------------------------------------------------------------
insert into public.posts (id, author_id, type, title, excerpt, cover, icon, views, created_at)
values
  ('10000000-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222', 'feed', '5 mistakes first-year IT students always make', 'Sharing personal experience and how to avoid common mistakes when starting to learn programming.', 'cover-a', 'arrows', 210, now() - interval '2 hours'),
  ('10000000-0000-0000-0000-000000000002', '55555555-5555-5555-5555-555555555555', 'feed', 'A quick debugging checklist for beginners', 'Simple checks to run before you assume it''s a compiler bug.', 'cover-b', 'laptop', 158, now() - interval '1 day'),
  ('10000000-0000-0000-0000-000000000003', '44444444-4444-4444-4444-444444444444', 'feed', 'Smart Attendance QR', 'A QR-based attendance system built to speed up roll call in large lecture halls.', 'cover-c', 'grid', 176, now() - interval '5 days'),
  ('10000000-0000-0000-0000-000000000004', '66666666-6666-6666-6666-666666666666', 'feed', 'Building my first REST API with Node.js', 'Notes from my first backend project, including the routing mistakes I had to fix twice.', 'cover-a', 'grid', 132, now() - interval '7 days'),
  ('10000000-0000-0000-0000-000000000005', '77777777-7777-7777-7777-777777777777', 'feed', 'Comparing SQL vs NoSQL for our capstone project', 'Why our team switched schemas halfway through the semester, and what we''d do differently.', 'cover-b', 'laptop', 147, now() - interval '14 days')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- posts — type = 'showcase' (from lib/mock-data.js `showcaseItems`)
-- ---------------------------------------------------------------------------
insert into public.posts (id, author_id, type, title, excerpt, category, tags, created_at)
values
  ('20000000-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333', 'showcase', 'Campus Bus Tracker', 'A live bus-tracking prototype built for the BBU shuttle route, showing real-time position on a campus map.', 'Web Dev', array['React', 'Leaflet'], now() - interval '1 day'),
  ('20000000-0000-0000-0000-000000000002', '22222222-2222-2222-2222-222222222222', 'showcase', '5 mistakes first-year IT students always make', 'Sharing personal experience and how to avoid common mistakes when starting to learn programming.', 'Web Dev', array['Article'], now() - interval '2 hours'),
  ('20000000-0000-0000-0000-000000000003', '44444444-4444-4444-4444-444444444444', 'showcase', 'Smart Attendance QR', 'A QR-based attendance system built to speed up roll call in large lecture halls.', 'Networking', array['Python', 'QR Code'], now() - interval '5 days'),
  ('20000000-0000-0000-0000-000000000004', '55555555-5555-5555-5555-555555555555', 'showcase', 'A quick debugging checklist for beginners', 'Simple checks to run before you assume it''s a compiler bug.', 'Web Dev', array['Article'], now() - interval '1 day'),
  ('20000000-0000-0000-0000-000000000005', '66666666-6666-6666-6666-666666666666', 'showcase', 'Building my first REST API with Node.js', 'Notes from my first backend project, including the routing mistakes I had to fix twice.', 'Web Dev', array['Node.js', 'Express'], now() - interval '7 days'),
  ('20000000-0000-0000-0000-000000000006', '77777777-7777-7777-7777-777777777777', 'showcase', 'Comparing SQL vs NoSQL for our capstone project', 'Why our team switched schemas halfway through the semester, and what we''d do differently.', 'Data & AI', array['Database', 'Capstone'], now() - interval '14 days'),
  ('20000000-0000-0000-0000-000000000007', '88888888-8888-8888-8888-888888888888', 'showcase', 'Predicting exam scores with a simple linear model', 'A first attempt at applying regression to our department''s own study-hours survey data.', 'Data & AI', array['Python', 'Pandas'], now() - interval '21 days'),
  ('20000000-0000-0000-0000-000000000008', '33333333-3333-3333-3333-333333333333', 'showcase', 'Setting up a small VLAN for the capstone lab', 'Segmenting traffic between three project teams sharing one lab switch.', 'Networking', array['Networking', 'Cisco'], now() - interval '30 days')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- likes — a handful of likes per post from the seeded profiles
-- ---------------------------------------------------------------------------
insert into public.likes (user_id, post_id)
select p.id, posts.id
from public.posts posts
cross join public.profiles p
where posts.id in (
  '10000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002',
  '20000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000003'
)
and p.id <> posts.author_id
on conflict (user_id, post_id) do nothing;

-- ---------------------------------------------------------------------------
-- comments — a couple of sample comments
-- ---------------------------------------------------------------------------
insert into public.comments (post_id, author_id, body, created_at)
values
  ('10000000-0000-0000-0000-000000000001', '55555555-5555-5555-5555-555555555555', 'This matches what I see every semester — great writeup.', now() - interval '1 hour'),
  ('10000000-0000-0000-0000-000000000001', '44444444-4444-4444-4444-444444444444', 'Wish I had this before my first year!', now() - interval '30 minutes'),
  ('20000000-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222', 'Would love to see this rolled out to more routes.', now() - interval '10 hours');
