# Valmik Nahata Portfolio Website

This is a Next.js 14 portfolio website for Valmik Nahata, a UC San Diego Data Science student. The application showcases research projects, competition wins, work experience, and technical skills through an interactive, animated interface.

**ALWAYS follow these instructions first and fallback to additional search and context gathering only if the information in these instructions is incomplete or found to be in error.**

## Working Effectively

### Bootstrap and Build Process

**CRITICAL: All build and dependency operations take significant time. NEVER CANCEL long-running commands.**

1. **Install Dependencies** (NEVER CANCEL - takes 60+ seconds):
   ```bash
   npm install
   ```
   - **Timeout**: Set 120+ seconds minimum
   - **Expected time**: ~60 seconds
   - **NEVER CANCEL**: Dependencies are large and take time to download

2. **Build Application** (NEVER CANCEL - takes 30+ seconds):
   ```bash
   npm run build
   ```
   - **Timeout**: Set 180+ seconds minimum  
   - **Expected time**: ~32 seconds
   - **NEVER CANCEL**: Static generation and optimization takes time
   - **Output**: Creates `./out` directory for GitHub Pages deployment
   - **Known Issue**: Google Fonts requests may fail in restricted networks (this is handled gracefully)

3. **Development Server** (starts in ~2 seconds):
   ```bash
   npm run dev
   ```
   - Runs on http://localhost:3000
   - Hot reload enabled
   - Use for local development and testing

4. **Linting** (takes 5-10 seconds):
   ```bash
   npm run lint
   ```
   - May show warnings about unescaped entities - these are acceptable
   - Exit code 0 means success even with warnings

5. **Type Checking** (takes 3-5 seconds):
   ```bash
   npm run type-check
   ```
   - Must pass without errors
   - TypeScript strict mode enabled

### Development Guidelines

- **Always run `npm install` first** before any build commands in a fresh environment
- **Always run `npm run build`** to verify changes work in production mode
- **Always run `npm run lint`** before committing to catch issues early
- **Set appropriate timeouts**: Never use default timeouts for build commands

## Application Architecture

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom utilities
- **Animations**: Framer Motion for complex animations
- **Icons**: Lucide React
- **Fonts**: System fonts (fallback when Google Fonts unavailable)
- **Deployment**: Static export to GitHub Pages

### Directory Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── case-studies/      # Projects showcase page  
│   ├── contact/           # Contact information page
│   ├── resume/            # Resume page
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx           # Homepage with hero section
├── components/
│   ├── layout/            # Header, Footer components
│   ├── pages/             # Page-specific components
│   ├── sections/          # Reusable section components
│   ├── ui/                # Base UI components (buttons, cards)
│   └── providers/         # Theme and context providers
├── lib/
│   └── utils.ts           # Utility functions (date formatting, etc.)
├── types/
│   └── index.ts           # TypeScript type definitions
├── hooks/                 # Custom React hooks
└── constants/             # Application constants
```

## Key Features & Components

### Interactive Hero Section
- **File**: `src/components/sections/Hero.tsx`
- **Features**: Animated visuals including stock ticker, ML pipeline simulation
- **Dependencies**: Framer Motion, React hooks for animations
- **Note**: Contains complex useEffect dependencies - warnings are expected

### Projects & Experience
- **File**: `src/components/pages/ProjectsPage.tsx` 
- **Data**: Hard-coded project and experience data with date sorting
- **Features**: Filtering, search, category selection
- **Note**: Uses type casting for flexible data structure

### Theme System
- **File**: `src/components/theme-provider.tsx`
- **Features**: Dark/light/system theme support
- **Storage**: Uses localStorage for persistence
- **Default**: Dark mode

## Validation Scenarios

### After Making Changes, ALWAYS:

1. **Build Test** (REQUIRED):
   ```bash
   npm run build
   ```
   - Must complete successfully
   - Check that `out/` directory is created
   - Verify all routes are generated (about, case-studies, contact, resume)

2. **Development Test** (REQUIRED):
   ```bash
   npm run dev
   ```
   - Verify application starts without errors
   - Test at least one user flow (e.g., navigate from home to about page)
   - Check console for runtime errors

3. **Code Quality** (REQUIRED):
   ```bash
   npm run lint
   npm run type-check
   ```
   - Lint warnings are acceptable, but errors must be fixed
   - Type checking must pass completely

### Manual User Testing Scenarios

**CRITICAL**: Always test actual functionality after making changes. Simply building is not sufficient.

1. **Homepage Navigation**:
   - Load homepage at /
   - Verify hero animations work (stock ticker, ML pipeline)
   - Test navigation to all main sections

2. **Projects Page**:
   - Navigate to /case-studies
   - Test search functionality
   - Test category filtering
   - Verify project cards display correctly

3. **Resume Page**:
   - Navigate to /resume  
   - Verify all sections load (education, experience, skills)
   - Check for layout issues

4. **Responsive Design**:
   - Test on different viewport sizes
   - Verify mobile navigation works
   - Check that animations don't break layout

## Common Issues & Solutions

### Build Issues

1. **Google Fonts Timeout**:
   - **Symptom**: Build fails with `ENOTFOUND fonts.googleapis.com`
   - **Solution**: This is handled gracefully - fallback fonts are used
   - **Action**: Continue build, it will succeed after retries

2. **TypeScript Errors**:
   - **Common**: Missing type annotations in function parameters
   - **Solution**: Add explicit types or use `any` for flexible data structures
   - **Example**: `(item as any).property` for optional properties

3. **ESLint Warnings**:
   - **Common**: Unescaped quotes in text content
   - **Solution**: Warnings are acceptable, only fix errors
   - **Config**: Located in `.eslintrc.json`

### Development Issues

1. **Dependencies Missing**:
   - **Solution**: Always run `npm install` first
   - **Time**: Allow 60+ seconds for completion

2. **Port Already in Use**:
   - **Solution**: Kill existing processes or use different port
   - **Command**: `npx kill-port 3000`

## Repository Context

### GitHub Pages Deployment
- **Workflow**: `.github/workflows/static.yml`
- **Trigger**: Push to main branch
- **Output**: Static files in `./out` directory
- **URL**: Deployed to GitHub Pages at repository URL

### Package Management
- **Primary**: npm (package-lock.json included)
- **Node Version**: 18+ required
- **Dependencies**: See package.json for full list

### Configuration Files
- **next.config.js**: Static export configuration for GitHub Pages
- **tailwind.config.js**: Tailwind CSS customization
- **tsconfig.json**: TypeScript configuration with strict mode
- **.eslintrc.json**: ESLint rules (warnings for quotes allowed)
- **postcss.config.js**: PostCSS with Tailwind and Autoprefixer

## Performance Notes

- **Build cache**: Next.js will show "No build cache found" warning - this is normal in CI
- **Bundle size**: ~137kB first load JS (reasonable for feature set)
- **Static generation**: All pages pre-rendered for optimal performance
- **Image optimization**: Disabled for static export compatibility

---

**Remember**: This application prioritizes user experience with smooth animations and interactivity. Always test the visual and interactive elements after making changes, not just the build process.