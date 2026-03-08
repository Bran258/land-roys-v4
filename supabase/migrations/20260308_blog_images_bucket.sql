-- Create a new storage bucket for blog images
insert into storage.buckets (id, name, public)
values ('blog_images', 'blog_images', true)
on conflict (id) do nothing;

-- Set up access controls for the new bucket
-- 1. Allow public read access to everyone
create policy "Public Access to blog_images"
on storage.objects for select
using (bucket_id = 'blog_images');

-- 2. Allow authenticated users to upload files
create policy "Authenticated users can upload to blog_images"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'blog_images'
);

-- 3. Allow authenticated users to update their files (like the hero image)
create policy "Authenticated users can update blog_images"
on storage.objects for update
to authenticated
using (bucket_id = 'blog_images');

-- 4. Allow authenticated users to delete files
create policy "Authenticated users can delete from blog_images"
on storage.objects for delete
to authenticated
using (bucket_id = 'blog_images');
