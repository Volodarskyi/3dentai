# Project Code Guidelines

This document outlines the coding standards and file structure guidelines for the project.

## General Naming Guidelines

- Avoid using the `UI` prefix for small components.
- All UI components should simply be named after the component itself, without the `UI` prefix.
  For example:
    - Instead of `UIButton`, use `Button`.

## Creating a Component

When creating a new component, follow these steps:

1. **Exporting the Component**
    - Use `export default ComponentName` if the component is not using `mobx`.
    - If `mobx` is used, wrap the component with `observer`:
      ```typescript
      export default observer(ComponentName);
      ```

2. **Naming Convention**
    - The folder and the component file must have the same name. For example:
      ```
      /ComponentName
        ├── ComponentName.tsx
        ├── componentName.module.scss
        
      ```

3. **Props Management**
    - If a component does not have any props, do not define an empty interface or add unused props.

4. **Index File Usage**
    - Use  to simplify imports and avoid duplicating component names in the import paths.
        - Instead of:
          ```typescript
          import Button from '@/components/Button/Button';
          ```
        - Use:
          ```typescript
          import Button from '@/components/Button';
          ```

## Component Folder Structure

Each component folder should include the following files:

1. **`INDEX`**
    - Use this file for importing and exporting the component to enable shorter imports.
      ```typescript
      import ComponentName from './ComponentName';
      
      export default ComponentName;
      ```

2. **`[componentName].module.scss`**
    - Use modular SCSS imports to prevent style collisions and ensure maintainability.
    - The file name should be in lowercase, such as `table.module.scss`.
    - This makes it easier to understand where specific styles are used and avoids future issues.

3. **`ComponentName.tsx`**
    - The main component file where the component logic and JSX are defined.

## Architecture Guidelines

1. **Small Components**
    - Components like buttons, text, or tables should be placed in the `/components` folder.

2. **Complex Components**
    - If a component solves more than one task, it should be placed in the `/containers` folder.

3. **Next.js - App Routing**
    - We use the Next.js `app` directory for routing and server-side requests only.
    - Page components should be placed in the `/screen` folder.
    - Component folder names should match the corresponding route in the `app` directory but should not include nested folders.

4. **Code Cleanup**
    - Remove any unused or unnecessary code.
    - Delete commented-out code to maintain a clean and readable codebase.

## Example Folder Structure

```
/src/components
  /Button
    ├── Button.tsx
    ├── button.module.scss
    └── 
  /Header
    ├── Header.tsx
    ├── header.module.scss
    
/src/containers
  /Dashboard
    ├── Dashboard.tsx
    ├── dashboard.module.scss
    └── 
/src/appPages
  /Home
    ├── Home.tsx
    ├── home.module.scss
    └── 
```

By adhering to these guidelines, you ensure a consistent, maintainable, and scalable codebase for the project.