/*
  # Create storage bucket for assets

  1. New Storage Bucket
    - Create a public bucket named 'assets' for storing public images
    - Enable public access for the bucket
*/

-- Create a new storage bucket for public assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('assets', 'assets', true);

-- Create a policy to allow public access to the bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'assets');