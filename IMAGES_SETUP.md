# Images Setup Guide - JCC Bethel City Website

## Overview
This guide explains how to add your church logo and hero background images to the website.

---

## 1. **LOGO IMAGE**

### Where to Place
Place your logo file in the `/images/` folder with the filename: **`logo.png`**

**Full path:** `images/logo.png`

### Logo Requirements
- **Format:** PNG, JPG, or SVG (PNG recommended for transparency)
- **Size:** Roughly 150-200px wide × 50-80px tall (will be constrained by CSS)
- **Style:** Should work on both light and dark backgrounds (will appear in the navbar)
- **Important:** Keep margins around the logo; CSS will size it to 50px height

### How It Works
The logo appears in the navbar on all pages. The CSS automatically scales it to fit:
```html
<img src="images/logo.png" alt="JCC Bethel City Logo" class="navbar-brand-logo">
```

The CSS class `navbar-brand-logo` has:
- `height: 50px`
- `max-width: 120px`
- `object-fit: contain`

**Recommendation:** Use a PNG with transparent background so the logo looks clean against the dark navy navbar background.

---

## 2. **HERO BACKGROUND IMAGES**

### Pages Using Hero Backgrounds
The following pages have hero sections that can display church images:

1. **index.html** - Home page hero
2. **about.html** - "Our Story" section
3. **ministries.html** - "A Place to Belong" section
4. **sermons.html** - "The Word Is Still Speaking" section
5. **events.html** - "Don't Miss What God Is Doing" section
6. **give.html** - "Honour God With Your Substance" section
7. **contact.html** - "We'd Love to Hear From You" section

### How to Add Hero Background Images

**Option 1: Different image per page (Recommended)**

Place images in the `/images/` folder with these filenames:
- `hero-home.jpg` - For index.html
- `hero-about.jpg` - For about.html
- `hero-ministries.jpg` - For ministries.html
- `hero-sermons.jpg` - For sermons.html
- `hero-events.jpg` - For events.html
- `hero-give.jpg` - For give.html
- `hero-contact.jpg` - For contact.html

Then update each HTML file's hero section with an inline style:

```html
<section class="section-hero bg-image" style="background-image: url('images/hero-home.jpg');">
```

**Option 2: Same image for all pages**

Use one image (`church.jpg`) and apply it to all hero sections:

```html
<section class="section-hero bg-image" style="background-image: url('images/church.jpg');">
```

### Hero Image Requirements

- **Format:** JPG or WebP (for fast loading)
- **Resolution:** At least 1920×1080px (for high-quality display)
- **Aspect Ratio:** 16:9 or similar (landscape)
- **Style:** 
  - Church building/sanctuary exterior or interior
  - Professional, welcoming, high-quality photography
  - Good contrast for text readability (images will be darkened by the overlay)

### How the Overlay Works

Each hero section has a dark overlay (`rgba(7, 11, 36, 0.5)`) that darkens the background image so the text remains readable. The overlay is semi-transparent, so the image will show through while the white text stays legible.

---

## 3. **CSS MODIFICATIONS (Advanced)**

If you want to customize how the images appear, edit `style.css`:

### Adjust Hero Image Overlay Opacity
Find this in `style.css` and modify the last value (0.5 = 50% opacity):

```css
.hero::after {
  background: rgba(7, 11, 36, 0.5); /* Change 0.5 to 0.3 for lighter, 0.7 for darker */
}

.section-hero::after {
  background: rgba(7, 11, 36, 0.5); /* Same here */
}
```

### Control Background Position
The `.bg-image` class has `background-position: center`. To change it:

```css
.bg-image {
  background-position: center top; /* Shows top of image */
  /* or */
  background-position: center bottom; /* Shows bottom of image */
}
```

### Disable Parallax Effect
Remove or comment out `background-attachment: fixed;` in `.bg-image`:

```css
.bg-image {
  background-size: cover;
  background-position: center;
  /* background-attachment: fixed; */ /* Comment this out to disable */
}
```

---

## 4. **STEP-BY-STEP SETUP**

1. **Prepare your images:**
   - Church logo (PNG with transparency, ~150-200px wide)
   - Hero background images (JPG, 1920×1080px or larger)

2. **Place logo in `/images/` folder:**
   - Name it: `logo.png`

3. **Place hero images in `/images/` folder:**
   - Option A: `hero-home.jpg`, `hero-about.jpg`, etc.
   - Option B: `church.jpg` (single image for all)

4. **Update HTML files with background-image URLs:**
   - For each hero section, add inline style:
   ```html
   style="background-image: url('images/hero-home.jpg');"
   ```

5. **Test in browser:**
   - Open each page to verify images appear correctly
   - Check that text remains readable over the images

---

## 5. **TROUBLESHOOTING**

### Logo not showing?
- Check file path: `images/logo.png`
- Verify file exists in `/images/` folder
- Try refreshing browser (Ctrl+F5 or Cmd+Shift+R)
- Check browser console for 404 errors

### Hero image not showing?
- Verify `background-image: url('images/...')` is on the section element
- Check file path and filename spelling
- Image file must be in `/images/` folder
- Ensure image file is readable (not corrupted)
- Try JPEG instead of PNG for compatibility

### Image looks distorted?
- Ensure hero images are at least 1920px wide
- Check image aspect ratio (16:9 recommended)
- Consider re-cropping the original image

### Text not readable over image?
- Increase overlay opacity: Change 0.5 to 0.7 in CSS
- Use an image with darker tones
- Ensure good contrast between text and background

---

## 6. **RECOMMENDED SIZES**

| Element | Recommended Size | Format |
|---------|------------------|--------|
| Logo | 150–200px wide | PNG (transparent) |
| Hero Background | 1920×1080px+ | JPG, WebP |
| Logo File Size | < 50KB | PNG |
| Hero File Size | < 300KB | JPG (optimized) |

---

## 7. **OPTIONAL: ADDING MORE IMAGES**

### For Two-Column Sections
Add placeholder images in cards/two-col sections:

```html
<div class="two-col-image" style="background-image: url('images/about-section.jpg');"></div>
```

Just add an inline style with `background-image` to any `.two-col-image` div.

---

## Questions?

If images aren't appearing or you need help, check:
1. File exists in `/images/` folder
2. Filename and path match exactly (case-sensitive on some servers)
3. Browser cache is cleared (Ctrl+Shift+Delete)
4. Console shows no 404 errors (F12 → Console tab)

Happy hosting! Your church website is almost complete! 🙏
