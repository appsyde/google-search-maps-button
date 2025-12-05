# Contributing to Google Search Maps Button

Thank you for your interest in contributing to Google Search Maps Button! We welcome contributions from the community.

## Testing Your Changes

1. Run `pnpm dev` to start the development server
2. Load the extension in your browser:
   - **Chrome**: Go to `chrome://extensions/`, enable "Developer mode", click "Load unpacked", select `.output/chrome-mv3`
3. Navigate to Google Search and test your changes

## Making Changes

### Code Style

- TypeScript is used throughout the project
- Follow existing code conventions

### Commit Messages

Write clear, descriptive commit messages:

- Use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) format:
  ```
  <type>(<scope>): <subject>
  ```
- Use present tense
- Reference issues when applicable

### Pull Request Process

1. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes and commit them
3. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
4. Open a Pull Request with a clear description of:
   - What changes you made
   - Why you made them
   - How to test them

### What to Contribute

We welcome:

- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🌍 Support for additional Google domains
- ♿ Accessibility improvements
- 🎨 UI/UX enhancements

### Guidelines

- Keep the extension lightweight and focused
- Maintain privacy - no data collection or external requests
- Test on multiple browsers if possible
- Update documentation as needed

## Reporting Issues

Found a bug or have a suggestion?

1. Check if the issue already exists
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Browser and extension version
   - Screenshots if applicable

## Questions?

Feel free to open an issue for questions or discussions.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
