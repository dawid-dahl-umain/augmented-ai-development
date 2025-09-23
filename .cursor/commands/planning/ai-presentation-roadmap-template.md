# AI Presentation/UI Roadmap Template

Create a high-level roadmap for presentation/UI elements (pure visual, audio, or sensory aspects) that complements the behavioral implementation. This roadmap guides validation without using TDD, as these elements are validated through manual review and automated visual/accessibility tools.

When done, ask user if the roadmap file should be saved to /ai-roadmaps/presentation directory. Create directory if not exists.

**First, if anything is unclear about the design requirements or constraints, ask for clarification rather than making assumptions.**

## Core Validation Principle for Presentation Elements

When generating validation sequences, remember:

- Validate sensory presentation, not system behavior
- The domain and adapters already handle functionality: trust them
- Focus on what users EXPERIENCE: visuals, sounds, haptic feedback, screen reader announcements
- Manual review is the primary validation method

## Format

```markdown
# Presentation/UI Roadmap: [UI Element/Feature Name]

## Overview

[2-3 sentences describing the sensory purpose and user experience goals]

## Element Type

[Component Styling | Layout | Animation | Typography | Theme | Icons | Audio | Haptic | Accessibility Announcements | Other]

## System View

[Create a diagram ONLY if the presentation has complex component hierarchies,
multi-step animations, or state-dependent styling that benefits from visualization.
Otherwise, write "No diagram needed - [brief reason]"]

<!-- If diagram is beneficial, choose appropriate type:
- Component hierarchy diagram
- Animation timeline/sequence
- Responsive layout structure
- Or describe the visual structure in text -->
<!-- For simple styling like "button color changes on hover", text is sufficient -->

## Design Integration

- **Design Source**: [Figma link, style guide reference, audio specifications]
- **Affected Components**: [What UI elements this touches]
- **Design Tokens**: [Colors, spacing, typography scales, timing values used]

## Spec References

- [UI task ticket reference (e.g., UI-103)]
- [Design system documentation]
- [Figma or other design tool links]
- [Brand guidelines if applicable]

## Validation Sequence

<!-- Describe what should be verified through human senses -->
<!-- These are checklist items for manual review, NOT primarily automated tests -->
<!-- Focus on sensory experience: visual, audio, haptic, screen reader announcements -->

1. [Visual match to design specifications]
2. [Responsive behavior across breakpoints]
3. [Accessibility compliance (contrast, screen reader, keyboard navigation)]
4. [Theme variants (dark/light mode) if applicable]
5. [Animation performance and smoothness]
6. [Cross-browser visual consistency]
7. [Sensory feedback appropriateness]
<!-- Continue as needed for this presentation element -->

## Validation Strategy

**Primary method**: Manual design review

**Supporting methods** (where applicable):

- Visual regression testing (e.g., Chromatic, Percy)
- Accessibility audits (e.g., axe, WAVE)
- Cross-browser testing (BrowserStack, manual)
- Performance profiling for animations
- User testing for subjective "feel"

## Design Constraints

<!-- Include relevant NFR categories for presentation -->

- **Accessibility**: [WCAG level, contrast requirements, or "WCAG 2.1 AA compliance"]
- **Performance**: [Animation FPS, paint times, or "60fps animations"]
- **Browser Support**: [Specific versions or "Last 2 major versions"]
- **Responsive Design**: [Breakpoints, approach, or "Mobile-first, 320-1920px"]

## Dependencies

- **Depends on**: [Design tokens, component library, base styles]
- **Blocks/Enables**: [What can't proceed until this is done / What this unlocks]

## Notes

[Design decisions, trade-offs, or questions for designers]
```

## Examples

Here are examples of how the generated roadmaps should look, when properly following the roadmap template format above.

### Example 1: Archive Button Visual States

```markdown
# Presentation/UI Roadmap: Archive Button Visual States

## Overview

Visual styling for archive button to provide clear affordance and feedback. Ensures consistent visual language and accessibility across all button states.

## Element Type

Component Styling

## System View

No diagram needed - straightforward styling of existing button component with state variations

## Design Integration

- **Design Source**: Figma - Todo Actions v3.2, frame "Archive States"
- **Affected Components**: TodoItem, ActionBar, BulkActions
- **Design Tokens**: --color-action-secondary, --spacing-md, --transition-standard

## Spec References

- UI-103: Archive button visual states task
- Design system v2.1 - Button component
- Figma: https://figma.com/file/xxx/todo-actions?node-id=123

## Validation Sequence

1. Idle state matches Figma design (color, padding, border)
2. Hover state shows correct elevation and color shift
3. Active/pressed state provides appropriate feedback
4. Disabled state clearly indicates unavailability
5. Focus indicator remains visible and meets 3:1 contrast ratio
6. Loading spinner animates smoothly
7. Dark mode applies correct color tokens
8. Touch target meets 44x44px minimum
9. Screen reader announces state changes appropriately

## Validation Strategy

**Primary method**: Manual design review with designer

**Supporting methods**:

- Chromatic visual regression for all states
- axe-core accessibility scan for contrast/ARIA
- BrowserStack for cross-browser testing
- Lighthouse for performance metrics

## Design Constraints

- **Accessibility**: WCAG 2.1 AA, visible focus states, proper ARIA labels
- **Performance**: Transitions under 16ms paint time, no layout shift
- **Browser Support**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Responsive Design**: Maintains proportions 320px to 1920px

## Dependencies

- **Depends on**: Base button component, design token system
- **Blocks/Enables**: Archive feature user testing, Marketing demo

## Notes

- Consider reduced motion preferences for animations
- Loading state needs UX writing for screen readers
- Discussed 3D transform with design team - postponed to v2
```

### Example 2: Success Notification Toast

```markdown
# Presentation/UI Roadmap: Success Notification Toast

## Overview

Toast notification that appears after successful actions. Provides non-intrusive feedback with smooth animations and proper accessibility announcements.

## Element Type

Animation

## System View

\`\`\`mermaid
stateDiagram-v2
[*] --> Hidden
Hidden --> SlideIn: Trigger
SlideIn --> Visible: 300ms
Visible --> FadeOut: 4s timer
Visible --> FadeOut: User dismiss
FadeOut --> Hidden: 200ms
Hidden --> [*]
\`\`\`

## Design Integration

- **Design Source**: Figma - Notification System v1.5
- **Affected Components**: ToastContainer, NotificationStack
- **Design Tokens**: --animation-slide-in, --duration-toast, --elevation-raised

## Spec References

- UI-108: Toast notification implementation
- Motion design guidelines section 2.4
- Material Design toast reference

## Validation Sequence

1. Slide-in animation matches design timing (300ms ease-out)
2. Position respects safe areas on mobile devices
3. Multiple toasts stack correctly
4. Auto-dismisses after 4 seconds with fade-out
5. Progress bar indicates time remaining
6. Dismiss button remains easily clickable/tappable
7. Screen reader announces immediately with role="alert"
8. Respects prefers-reduced-motion settings
9. Z-index keeps toast above all content
10. Text remains readable over any background

## Validation Strategy

**Primary method**: Manual review with motion designer

**Supporting methods**:

- Record animations for frame-by-frame review
- Test with actual screen readers (NVDA, JAWS, VoiceOver)
- Performance profiling for 60fps validation
- A/B test timing with users

## Design Constraints

- **Accessibility**: Immediate announcement, dismissible, keyboard navigable
- **Performance**: 60fps animation, no jank, GPU-accelerated
- **Browser Support**: All modern browsers including mobile
- **Responsive Design**: Adapts position for mobile/tablet/desktop

## Dependencies

- **Depends on**: Animation library, Portal/Layer system
- **Blocks/Enables**: Error notification variants, Undo functionality

## Notes

- Test with real users who rely on screen readers
- Consider haptic feedback on mobile for important notifications
- May need to adjust timing based on message length
```

---

⬅️ Back to: [Appendix D](../../appendices/appendix-d-handling-technical-implementation-details.md)
