import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

cloudinary.config({
  cloud_name: 'hjrdxocb',
  api_key: '227124848528486',
  api_secret: 'SdjjM963t7rJfFCP9j9tlwYub5I',
  secure: true,
});

const weddingImages = [
  { file: 'public/images/wedding/scroll_white_gold.png', id: 'wedding_scroll_white_gold' },
  { file: 'public/images/wedding/scroll_royal_blue_velvet.png', id: 'wedding_scroll_royal_blue_velvet' },
  { file: 'public/images/wedding/acrylic_navy_gold.png', id: 'wedding_acrylic_navy_gold' },
  { file: 'public/images/wedding/pastel_blue_laser_tassel.png', id: 'wedding_pastel_blue_laser_tassel' },
  { file: 'public/images/wedding/royal_blue_wax_seal.jpg', id: 'wedding_royal_blue_wax_seal' },
  { file: 'public/images/wedding/blue_laser_floral_cut.jpg', id: 'wedding_blue_laser_floral_cut' },
  { file: 'public/images/wedding/lotus_popup_card.jpg', id: 'wedding_lotus_popup_card' },
  { file: 'public/images/wedding/navy_gold_rounded_gatefold.jpg', id: 'wedding_navy_gold_rounded_gatefold' },
  { file: 'public/images/wedding/royal_arch_laser_cut.png', id: 'wedding_royal_arch_laser_cut' },
];

async function uploadAll() {
  console.log('Uploading all 9 custom wedding card photos to Cloudinary...');
  for (const img of weddingImages) {
    try {
      const res = await cloudinary.uploader.upload(path.join(process.cwd(), img.file), {
        folder: 'ayushman_wedding_cards',
        public_id: img.id,
        overwrite: true,
      });
      console.log(`✓ Uploaded ${img.id}: ${res.secure_url}`);
    } catch (e) {
      console.error(`Failed ${img.id}:`, e.message);
    }
  }
  console.log('All wedding card photos uploaded to Cloudinary!');
}

uploadAll();
