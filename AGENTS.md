# AGENTS.md

This document provides guidance for AI coding agents working on the Google Search Maps Button browser extension.

## Project Overview

**Purpose:** A browser extension that adds a "Maps" button to Google Search results, allowing users to quickly open their search query in Google Maps.

**Tech Stack:**

- **Framework:** WXT (Web Extension Toolkit)
- **Language:** TypeScript
- **Manifest:** V3
- **Package Manager:** pnpm (v10.15.0+)
- **Node Version:** 24+

## Project Structure

```
google-search-maps-button/
├── entrypoints/
│   └── content.ts         # Main content script logic
├── public/
│   └── icon/              # Extension icons
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── wxt.config.ts          # WXT framework configuration
└── README.md              # User-facing documentation
```

## Key Information

### Supported Domains

The extension runs on the following Google domains:

- google.com
- google.de
- google.at
- google.ch

### Extension Permissions

- Host permissions for Google search domains only
- No special permissions required beyond host access

### Content Script (`entrypoints/content.ts`)

- Injects a "Maps" button into Google Search results
- Matches Google's native design and styling
- Extracts the search query from the page
- Opens Google Maps with the current search term

## Development Commands

```bash
# Install dependencies
pnpm install

# Development (Chrome)
pnpm dev

# Development (Firefox)
pnpm dev:firefox

# Build for production (Chrome)
pnpm build

# Build for production (Firefox)
pnpm build:firefox

# Create distribution zip (Chrome)
pnpm zip

# Create distribution zip (Firefox)
pnpm zip:firefox

# Type checking
pnpm compile
```

## Code Modification Guidelines

### When Modifying Content Scripts

1. Ensure the button design matches Google's native UI elements
2. Test on all supported Google domains
3. Verify the button placement is consistent across different search result layouts
4. Ensure the Maps link properly encodes the search query

### When Adding Features

1. Keep the extension lightweight and focused
2. Maintain compatibility with both Chrome and Firefox
3. Update `wxt.config.ts` if new permissions or host patterns are needed
4. Run `pnpm compile` to check for TypeScript errors

### When Updating Dependencies

1. Use pnpm as the package manager
2. Test both Chrome and Firefox builds after updates
3. Verify that WXT-specific features still work correctly

## Testing Checklist

Before committing changes:

- [ ] TypeScript compiles without errors (`pnpm compile`)
- [ ] Extension builds successfully for Chrome (`pnpm build`)
- [ ] Extension builds successfully for Firefox (`pnpm build:firefox`)
- [ ] Maps button appears on Google search results
- [ ] Clicking the button opens Google Maps with the correct query
- [ ] Design matches Google's native UI
- [ ] Works on all supported Google domains

## Common Tasks

### Adding a New Google Domain

1. Update the WXT configuration in `wxt.config.ts`
2. Add the domain to the content script match patterns
3. Update the README.md supported websites list
4. Test the extension on the new domain

### Changing Button Styling

1. Locate the button creation logic in `entrypoints/content.ts`
2. Modify the CSS classes or inline styles
3. Test on a live Google search page to ensure it matches Google's design
4. Check dark mode compatibility if applicable

### Debugging Content Script Issues

1. Load the unpacked extension in Chrome/Firefox
2. Open Developer Tools on a Google search page
3. Check the Console for errors
4. Use the Elements inspector to verify DOM injection
5. Modify `entrypoints/content.ts` and reload the extension

## Release Process

1. Update version in `package.json`
2. Run `pnpm build` and `pnpm build:firefox`
3. Test both builds manually
4. Run `pnpm zip` and `pnpm zip:firefox` to create distribution packages
5. Use `pnpm release-it` for automated releases (if configured)
6. Submit to Chrome Web Store and Firefox Add-ons

## Browser-Specific Considerations

### Chrome/Chromium

- Uses Manifest V3
- Built with `pnpm build`
- Default development target

### Firefox

- May have different UI rendering
- Built with `pnpm build:firefox`
- Test separately from Chrome builds

## Important Notes

- This is a content script extension (no background service worker needed)
- The extension is intentionally minimal to maintain performance
- All functionality is injected into Google search pages client-side
- No external API calls or data collection

## Resources

- [WXT Documentation](https://wxt.dev/)
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Firefox Extension Documentation](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Contact & Issues

- **Repository:** https://github.com/appsyde/google-search-maps-button
- **Issues:** https://github.com/appsyde/google-search-maps-button/issues
- **Author:** Appsyde (https://appsyde.icu)
