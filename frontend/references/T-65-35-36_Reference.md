## Login, Register and Welcome Page

Here are the steps I took for "Design and develop reusable components like buttons, forms, and panels following established design guidelines." and "Utilize Tailwind CSS to efficiently style components and maintain a consistent appearance throughout the application." T65-35-36 from my linear:

1. **Creation of Page Templates:**

   - Designed and implemented page templates for the "Welcome" page, registration page ("Register"), and login page, utilizing JSX files named `welcome.jsx`, `register.jsx`, and `login.jsx` respectively.

2. **Component Reusability:**

   - Established a `src/components` directory dedicated to reusable components across the application.
   - Organized reusable UI components such as buttons, inputs, and icons within the `src/components/ui` folder, referencing design guidelines from external resources like [Shadcn UI](https://ui.shadcn.com/docs/components).
   - Implemented a separate file, `src/components/icons.jsx`, to store and manage reusable icons sourced from [Lucide](https://lucide.dev/).

3. **Styling with Tailwind CSS:**

   - Utilized Tailwind CSS for efficient styling of components, ensuring a consistent appearance throughout the application.
   - Integrated Tailwind CSS classes directly within the JSX files to style components as needed, leveraging the utility-first approach provided by Tailwind CSS.

4. **Documentation with Prop-Types:**  
   *https://es.react.dev/reference/react/Component#static-proptypes*
   - Enhanced component documentation by implementing prop-types to document the expected props for each component, aiding in component reusability and understanding.
