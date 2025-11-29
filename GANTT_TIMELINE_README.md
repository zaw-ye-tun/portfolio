# 📊 Gantt-Style Vertical Timeline Documentation

## Overview
Your portfolio now features a **dynamic Gantt-style vertical timeline** with two columns displaying work and education history side-by-side. Bar heights represent actual duration, and overlapping periods are automatically detected and displayed.

---

## 🎯 Features

### Visual Layout
- **LEFT COLUMN**: 💼 Work experiences (green theme)
- **RIGHT COLUMN**: 🎓 Education (blue theme)
- **CENTER LINE**: Vertical gradient timeline with year labels
- **BAR HEIGHTS**: Proportional to duration (8px = 1 month)
- **OVERLAP DETECTION**: Overlapping items shift horizontally
- **ANIMATIONS**: Fade-in and slide-up on scroll

### Interactions
- **Click any bar** → Opens detailed modal
- **Hover effect** → Scale + shadow animation
- **Responsive** → Adapts to mobile (stacked layout)

---

## 📁 File Structure

```
portfolio/
├── components/
│   ├── GanttTimeline.tsx          ← Main Gantt component
│   └── windows/
│       └── TimelineWindow.tsx     ← Window wrapper
├── lib/
│   ├── ganttUtils.js              ← Date calculations & helpers
│   └── contentLoader.ts           ← Loads timeline data
├── content/timeline/
│   ├── sample-phd.md              ← Example education entry
│   ├── sample-work-current.md     ← Example work entry
│   ├── event1.md                  ← Your existing entries (updated)
│   ├── event2.md
│   └── ...
└── public/admin/
    └── config.yml                 ← CMS schema (timeline section)
```

---

## 📝 Creating Timeline Entries

### Via CMS (Recommended)
1. Go to `http://localhost:3000/admin` (local) or `https://your-site.netlify.app/admin` (production)
2. Click **Timeline** → **New Timeline**
3. Fill in fields:
   - **Start Date**: Select month/year (e.g., 2020-09)
   - **End Date**: Type "Present" or select month/year (e.g., 2024-06)
   - **Title**: Position title
   - **Description**: Detailed description
   - **Company or School**: Organization name
   - **Category**: Choose "work" or "education"
   - **Color (optional)**: Hex color like `#3B82F6` (leave empty for default)
4. Click **Publish**

### Manually (Edit Markdown)
Create a new `.md` file in `content/timeline/`:

```markdown
---
start_date: "2019-01"
end_date: "2020-12"
title: "Software Engineer"
description: "Full-stack development using React, Node.js, and PostgreSQL. Led team of 3 developers."
company_or_school: "Tech Corp"
category: "work"
color: "#10B981"
order: 0
---
```

### Field Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `start_date` | string | ✅ Yes | Format: `YYYY-MM` (e.g., `2020-09`) |
| `end_date` | string | ✅ Yes | Format: `YYYY-MM` or `Present` |
| `title` | string | ✅ Yes | Position or degree title |
| `description` | text | ✅ Yes | Detailed description |
| `company_or_school` | string | ✅ Yes | Organization name |
| `category` | select | ✅ Yes | `work` or `education` |
| `color` | string | ❌ No | Hex color (e.g., `#3B82F6`) |
| `order` | number | ❌ No | Custom sort order (default: 0) |

---

## 🎨 How It Works

### 1. Date Parsing
```javascript
// ganttUtils.js
parseDate("2020-09") → Date(2020, 8, 1)
normalizeEndDate("Present") → new Date() // Current date
```

### 2. Duration Calculation
```javascript
monthsBetween(startDate, endDate) → 48 months
48 months × 8 pixels/month = 384px height
```

### 3. Overlap Detection
```javascript
// If two items in same category overlap in time:
// → Second item shifts right by 20px
// → Maximum 3 levels of stacking (60px total)
```

### 4. Positioning
```javascript
// Vertical position based on start date:
top = monthsSince(minDate, startDate) × 8px

// Height based on duration:
height = duration × 8px
```

---

## 🎯 Examples

### Example 1: Overlapping Work & Education
```markdown
# Bachelor's Degree (2018-2022)
start_date: "2018-09"
end_date: "2022-06"
category: "education"

# Part-time Internship (2020-2021) - overlaps with degree
start_date: "2020-06"
end_date: "2021-08"
category: "work"
```

**Result**: 
- Bachelor's degree shows on RIGHT (education)
- Internship shows on LEFT (work)
- Both visible simultaneously, showing parallel timeline

### Example 2: Current Position
```markdown
start_date: "2024-01"
end_date: "Present"  ← Will auto-update to current month
title: "Senior Engineer"
category: "work"
```

### Example 3: Custom Colors
```markdown
# Use brand colors
color: "#FF6B6B"  # Red theme for startup
color: "#4ECDC4"  # Teal for tech company
color: "#FFE66D"  # Yellow for education
```

---

## 🔧 Customization

### Adjust Scale
In `GanttTimeline.tsx`, change:
```javascript
const PIXELS_PER_MONTH = 8; // Make smaller = more compact
```

### Change Colors
Default colors are in `getColor()` function:
```javascript
work: '#10B981'      // Green
education: '#3B82F6' // Blue
```

### Modify Bar Width
In `renderBar()`:
```javascript
width: 'calc(100% - 40px)',
maxWidth: '280px',  // Change this
```

---

## 📱 Responsive Design

- **Desktop (> 768px)**: Two-column layout with center line
- **Tablet**: Narrower columns, smaller bars
- **Mobile (< 768px)**: Single stacked column (work on top, education below)

---

## ⚡ Performance

- **Intersection Observer**: Bars animate only when visible
- **Memoization**: Calculations cached for performance
- **Lazy calculations**: Metrics computed on-demand

---

## 🐛 Troubleshooting

### Bars not showing
- Check date format: Must be `YYYY-MM`
- Verify `category` is either `work` or `education`
- Ensure `start_date` and `end_date` are both filled

### Overlaps not working
- Make sure items are in same `category`
- Check dates actually overlap (start1 < end2 && start2 < end1)

### Animation not triggering
- Check browser supports Intersection Observer
- Verify `data-id` attributes are present
- Clear browser cache and reload

---

## 🚀 Deployment

1. **Commit changes**:
   ```bash
   git add .
   git commit -m "Add Gantt-style timeline"
   git push origin main
   ```

2. **Netlify auto-deploys** (if connected)

3. **Access CMS**:
   - Local: `http://localhost:3000/admin`
   - Production: `https://your-site.netlify.app/admin`

---

## 📊 Visual Example

```
WORK (LEFT)          CENTER LINE          EDUCATION (RIGHT)
═════════════        ═══════════          ═════════════════

                         2018
                         ●───
                         │                ┌─────────────┐
                         │                │ Bachelor's  │
                         │                │ 2018-2022   │
┌──────────────┐         │                └─────────────┘
│ Internship   │         2020
│ 2020-2021    │         ●───
└──────────────┘         │
                         │
                         2022
                         ●───
┌──────────────┐         │
│ Full-time    │         │
│ 2022-Present │         2024
└──────────────┘         ●───
                         │
```

---

## ✨ Next Steps

1. **Add more entries** via CMS
2. **Customize colors** to match your brand
3. **Add images** (extend schema if needed)
4. **Export timeline** (add PDF export button)

Enjoy your beautiful Gantt timeline! 🎉
