import { NextResponse } from 'next/server';
import { uploadImageToCloudinary } from '@/lib/cloudinary';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in to upload files.' }, { status: 401 });
    }

    const body = await req.json();
    const { image, folder } = body;

    if (!image) {
      return NextResponse.json({ error: 'No image data provided for upload' }, { status: 400 });
    }

    const result = await uploadImageToCloudinary(image, folder || 'ayushman_customer_designs');

    return NextResponse.json({
      success: true,
      url: result.url,
      publicId: result.public_id,
      message: 'Image uploaded successfully to Cloudinary!',
    });
  } catch (error: any) {
    console.error('Cloudinary Upload API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to upload image' },
      { status: 500 }
    );
  }
}
