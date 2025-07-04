# Contributing to SolarVoice AI Platform

Thank you for your interest in contributing to SolarVoice AI! This document provides guidelines for contributing to the project.

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive criticism
- Respect differing viewpoints and experiences

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/solarvoice-platform.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Commit with a clear message: `git commit -m "feat: add voice command validation"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Create a Pull Request

## 📋 Development Process

### Branch Naming Convention

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions or fixes
- `chore/` - Maintenance tasks

### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Test additions or modifications
- `chore`: Maintenance tasks

Example:
```
feat(voice): add Spanish language support for safety commands

- Implemented multi-language voice recognition
- Added Spanish translations for safety protocols
- Updated voice agent configurations

Closes #123
```

## 🧪 Testing

All contributions must include appropriate tests:

1. **Unit Tests**: Required for all new functions/methods
2. **Integration Tests**: Required for API endpoints
3. **E2E Tests**: Required for critical user workflows

Run tests before submitting:
```bash
npm run test
npm run test:e2e
npm run test:cov
```

Ensure test coverage remains above 80%.

## 📝 Code Style

We use ESLint and Prettier for code formatting:

```bash
# Format code
npm run format

# Lint code
npm run lint

# Type check
npm run typecheck
```

### TypeScript Guidelines

- Use strict typing (avoid `any`)
- Define interfaces for all data structures
- Use enums for constants
- Document complex functions with JSDoc

Example:
```typescript
/**
 * Process voice command for solar construction
 * @param command - Voice command from field worker
 * @returns Processed response with audio URL
 */
async processVoiceCommand(command: IVoiceCommand): Promise<IVoiceResponse> {
  // Implementation
}
```

## 🏗️ Architecture Guidelines

### File Structure

```
apps/
  api/
    src/
      module-name/
        module-name.module.ts
        module-name.controller.ts
        module-name.service.ts
        module-name.service.spec.ts
        dto/
        entities/
        interfaces/
```

### API Design

- RESTful endpoints
- Consistent error handling
- Comprehensive Swagger documentation
- Request/response validation with DTOs

## 🔒 Security

- Never commit secrets or API keys
- Use environment variables
- Validate all inputs
- Implement proper authentication/authorization
- Follow OWASP guidelines

## 📚 Documentation

- Update README.md for new features
- Add Swagger/OpenAPI annotations
- Include code examples
- Document breaking changes

## 🚢 Pull Request Process

1. **Before submitting:**
   - Ensure all tests pass
   - Update documentation
   - Add/update Swagger annotations
   - Run linter and fix issues

2. **PR Description should include:**
   - Summary of changes
   - Related issue numbers
   - Screenshots (for UI changes)
   - Breaking changes (if any)

3. **Review process:**
   - At least one approved review required
   - CI/CD pipeline must pass
   - No merge conflicts
   - Up-to-date with main branch

## 🐛 Reporting Issues

When reporting issues, please include:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, etc.)
- Error messages/logs
- Screenshots (if applicable)

## 💡 Feature Requests

Feature requests should include:

- Use case description
- Proposed solution
- Alternative approaches considered
- Impact on existing functionality

## 🏆 Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes
- Project documentation

## 📞 Getting Help

- Check existing issues and PRs
- Review documentation
- Ask questions in discussions
- Contact maintainers

## 🎯 Priority Areas

Current areas where contributions are especially welcome:

1. Multi-language voice support
2. Additional AI agent personalities
3. Performance optimizations
4. Integration with new solar equipment APIs
5. Mobile app development
6. Documentation improvements

Thank you for contributing to SolarVoice AI! 🌞⚡🏗️