# AI Presentation/UI Roadmap Template

Create a roadmap for Observable Technical elements (presentation/UI) that complements the behavioral implementation. This roadmap guides validation without using TDD.

When done, ask user if the roadmap file should be saved to /ai-roadmaps/presentation directory. Create directory if not exists.

**First, if anything is unclear about the design requirements or constraints, ask for clarification rather than making assumptions.**

## Core Validation Principle for Presentation Elements

When generating validation sequences, remember:

- Validate sensory presentation, not behavior
- The domain and adapters already handle functionality: trust them
- Focus on what users EXPERIENCE: visuals, sounds, haptic feedback, screen reader text
- Manual review is the primary validation method

## Format

\`\`\`markdown

# Presentation Roadmap: [UI Element/Feature Name]

## Overview

[2-3 sentences describing sensory purpose and user experience goals]

## Element Type

[Component Styling | Layout | Animation | Typography | Theme | Icons | Audio | Haptic | Accessibility | Other]

## Design Integration

- **Design Source**: [Figma link, style guide reference]
- **Affected Components**: [What UI elements this touches]
- **Design Tokens**: [Colors, spacing, typography scales used]

## Validation Sequence

<!-- VALIDATION NAMING: Describe what should be sensory verified -->
<!-- Focus on observable sensory characteristics -->
<!-- These are not automated tests, but checklist items for manual review -->

1. [Visual match to design specifications]
2. [Responsive behavior across breakpoints]
3. [Accessibility compliance (contrast, screen reader, focus states)]
4. [Dark/light mode support if applicable]
5. [Animation performance and smoothness]
6. [Cross-browser visual consistency]
<!-- Continue as needed for this sensory element -->

## Validation Strategy

- **Primary method**: Manual design review
- **Supporting methods**: [Choose applicable:]
  - Visual regression tests (e.g., Chromatic, Percy)
  - Accessibility audits (e.g., axe, WAVE)
  - Cross-browser validation
  - Performance profiling for animations
  - User testing for "feel" and UX

## Design Constraints

<!-- Include relevant NFR categories for presentation -->

- **Accessibility**: [WCAG requirements, contrast ratios, or "Standard WCAG AA"]
- **Performance**: [Animation frame rates, paint times, or "No performance constraints"]
- **Browser Support**: [Compatibility requirements, or "Last 2 major versions"]
- **Responsive Design**: [Breakpoints, mobile-first approach, or specific requirements]

## Spec References

- [Reference to linked UI task ticket (e.g., UI-103)]
- [Figma designs or other design tool links]
- [Design system documentation]
- [Brand guidelines if applicable]

## Dependencies

- **Depends on**: [Design system, component library, base styles]
- **Blocks**: [Features waiting for UI completion]

## Notes

[Design decisions, trade-offs, questions for designers]
\`\`\`

## Example: Archive Button Styling (Observable Technical)

\`\`\`markdown

# Presentation Roadmap: Archive Button Styling

## Overview

Visual styling for archive button to provide clear affordance and feedback for the archive action. Ensures consistent visual language across the application.

## Element Type

Component Styling

## Design Integration

- **Design Source**: Figma - Todo Actions v3.2
- **Affected Components**: TodoItem, ActionBar
- **Design Tokens**: color-action-secondary, spacing-md, transition-standard

## Validation Sequence

1. Matches Figma idle, hover, active, and disabled states
2. Maintains 3:1 contrast ratio in all states
3. Smooth transitions between states (200ms ease-out)
4. Consistent appearance across all breakpoints
5. Focus indicator visible for keyboard navigation
6. Dark mode variant applies correct color tokens
7. Screen reader announces button state changes

## Validation Strategy

- **Primary method**: Manual design review with designer
- **Supporting methods**:
  - Chromatic visual regression tests
  - axe accessibility scan for contrast
  - Cross-browser testing (Chrome, Firefox, Safari, Edge)

## Design Constraints

- **Accessibility**: WCAG AA compliance, visible focus states, screen reader friendly
- **Performance**: CSS transitions under 16ms paint time
- **Browser Support**: Last 2 versions of major browsers
- **Responsive Design**: Mobile-first, 320px minimum width

## Spec References

- UI-103: Archive button visual states
- Design system button guidelines
- Figma: [link to specific frame]

## Dependencies

- **Depends on**: Base button component, design tokens
- **Blocks**: Archive feature release

## Notes

- Consider loading state for async operation
- May need custom focus style to match brand
  \`\`\`

## Example: Archive Success Audio (Observable Technical)

\`\`\`markdown

# Presentation Roadmap: Archive Success Audio Feedback

## Overview

Audio feedback for successful archive action. Provides non-visual confirmation for accessibility and enhanced user experience.

## Element Type

Audio

## Design Integration

- **Design Source**: Audio design guidelines v2.1
- **Affected Components**: TodoItem, ArchiveAction
- **Design Tokens**: audio-success-short, volume-feedback

## Validation Sequence

1. Plays success chime on archive completion
2. Audio duration under 500ms
3. Volume respects system settings
4. Can be disabled via user preferences
5. Does not overlap with screen reader announcements
6. Fallback to haptic on mobile when audio disabled

## Validation Strategy

- **Primary method**: Manual review with sound designer
- **Supporting methods**:
  - User testing for audio clarity
  - Accessibility testing with screen readers
  - Performance testing for lag

## Design Constraints

- **Accessibility**: Non-intrusive, optional, doesn't interfere with screen readers
- **Performance**: No lag between action and feedback
- **Browser Support**: Web Audio API compatibility
- **Responsive Design**: Appropriate for device context

## Spec References

- UI-105: Audio feedback specifications
- Accessibility guidelines section 4.2
- Sound design library

## Dependencies

- **Depends on**: Web Audio API support detection
- **Blocks**: Enhanced accessibility features

## Notes

- Consider cultural differences in audio feedback
- Test with actual users who rely on audio cues
  \`\`\`
