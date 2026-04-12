# Performance Optimization Guide

## Current Issues

1. **Hero Video (12MB)** - `/download.mp4` is too large for initial load
2. **Large Images** - Several images are 1-2MB each
3. **No CDN** - Assets served from Vercel (slower than CDN)

## Quick Fixes Applied

### 1. Video Lazy Loading
- Video now loads after 2 second delay (prioritizes critical content first)
- Changed `preload='metadata'` to `preload='none'`
- Using smaller poster image (logo.png instead of 60KB JPEG)

### 2. Image Optimization
- Background images now lazy load with fade-in effect
- Added loading placeholders (skeleton screens)
- Set `fetchPriority='low'` for non-critical images

### 3. Resource Hints
- Preloading critical font files
- Preconnecting to Google Fonts domains

## Recommended Next Steps

### 1. Compress the Hero Video (HIGH PRIORITY)
The 12MB video is the biggest issue. Options:

**Option A: Compress with FFmpeg**
```bash
# Install ffmpeg, then run:
ffmpeg -i download.mp4 -vcodec h264 -acodec mp2 -b:v 1000k -b:a 128k download-compressed.mp4
```

**Option B: Convert to WebM (better compression)**
```bash
ffmpeg -i download.mp4 -c:v libvpx-vp9 -b:v 800k -c:a libopus download.webm
```

**Option C: Use a video CDN**
- Upload to Cloudinary, Mux, or Cloudflare Stream
- Serve via their optimized CDN

### 2. Optimize Large Images
Convert these large images to WebP format:
- `pexels-jean-pierre-3622694-5466870.jpg` (2MB)
- `pexels-kseniya-kopna-52379050-11556383.jpg` (1.8MB)
- `pexels-tara-winstead-6694187.jpg` (2.6MB)

```bash
# Using cwebp (install from Google)
cwebp -q 80 pexels-jean-pierre-3622694-5466870.jpg -o pexels-jean-pierre-3622694-5466870.webp
```

### 3. Enable Vercel Edge Network
- Go to Vercel Dashboard → Project Settings
- Enable "Edge Network" for faster global delivery

### 4. Add Image CDN (Optional)
Consider using Cloudinary or Imgix for automatic image optimization:
```jsx
// Instead of:
<img src="/photo.jpg" />

// Use Cloudinary:
<img src="https://res.cloudinary.com/youraccount/image/upload/w_auto,q_auto/photo.jpg" />
```

## Expected Results

After compressing the video to ~2-3MB:
- First Contentful Paint: ~1.5s faster
- Time to Interactive: ~3s faster
- Lighthouse Performance Score: +20-30 points

## Testing

Test performance with:
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- Chrome DevTools → Lighthouse
