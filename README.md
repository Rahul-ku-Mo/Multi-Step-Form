# Multi-Step Form Application

This project is a multi-step form application built with Next.js, React Hook Form, Typescript, for Database we have Prisma and MongoDB. It demonstrates a user registration flow with personal information, account details, and preferences.

## Features

- Multi-step form with navigation between steps
- Form validation using React Hook Form
- API integration for data persistence (MongoDB and Prisma ORM)
- Responsive design using Tailwind CSS
- TypeScript for type safety

## Steps in the Form

1. Personal Information
2. Account Details
3. Preferences
4. Thank You page

## Project Structure

- `app/`: Next.js app directory
  - `components/`: React components
    - `steps/`: Components for each form step
    - `NavigationButtons.tsx`: Navigation component
  - `api/`: API routes
- `hooks/`: Custom React hooks
- `types/`: TypeScript type definitions
- `constant.ts`: Constant values used across the application

## How to Run the Project

1. Clone the repository:
   ```
   git clone https://github.com/Rahul-ku-Mo/Multi-Step-Form/
   cd multiform
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000

   DATABASEURL = `Your database url from mongoDB`
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Flow of the Application

1. The user starts at the Personal Information step.
2. After filling out the personal information, the user can proceed to the Account Details step.
3. After completing the Account Details, the user moves to the Preferences step.
4. Upon completing all steps, the user is directed to a Thank You page.

At each step:
- The application attempts to fetch existing data from the API.
- If API data is not available, it falls back to any locally stored data.
- The user can navigate between steps using the Previous and Next buttons.
- Form data is validated before proceeding to the next step.
- Data is sent to the API when moving to the next step or submitting the final step.

## API Integration

The application interacts with API endpoints for each step:
- `/api/personalInfo`
- `/api/accountDetails`
- `/api/preferences`

These endpoints handle both GET (for fetching existing data) and POST (for saving data) requests. Also DELETE (for deleting users)

## Challenges Faced and Solutions

During the development of this project, there are several challenges:

1. **State Management Across Steps**: 
   - Challenge: Maintaining form state across different steps and ensuring data persistence. 
   - Solution: Utilized React Hook Form's `useFormContext` to manage form state globally, allowing seamless data sharing between steps.
   - What more could have done: I should have used LocalStorage or Redis Instance to keep track of recent record. 

2. **API Integration and Data Fetching**:
   - Challenge: Efficiently fetching and updating data from the API while handling loading states and errors.
   - Solution: Implemented custom hooks (`useCreatePersonalInfo`, `useCreateAccountDetails`, `useCreatePreferences`) to manage API interactions, including loading states and error handling. Also added useQuery from tanstack to cache data from servers so that reduce API Requests. 

3. **Form Validation**:
   - Challenge: Implementing complex validation rules for different field types across multiple steps.
   - Solution: Leveraged React Hook Form's validation capabilities, defining validation rules within the field configurations.
   - What more could have done: Kind of showing error when user is typing using watch. Although I have made the form Extensible. Dyanmically developer can add new fields.

4. **Navigation and Step Management**:
   - Challenge: Managing navigation between steps while ensuring data is saved and validated correctly. This was very challenging took a lot of time.
   - Solution: Created a `NavigationButtons` component to handle step navigation, integrating it with form submission and validation processes. And Also used FormContext to persist values.

5. **Typescript Integration**:
   - Challenge: Ensuring type safety across the application, especially with dynamic form fields.
   - Solution: Defined comprehensive types and interfaces (e.g., `FieldConfig`, `CheckboxFieldConfig`) to maintain type consistency throughout the application.

6. **Data Persistence and Recovery**:
   - Challenge: Handling scenarios where API data might be unavailable or when users navigate back to previous steps.
   - Solution: Implemented a fallback mechanism to check for locally stored data when API data is unavailable, ensuring a smooth user experience even in offline or error scenarios.

## Should have added these feature.  (unable to do so due to time Constraints)
- Implement more robust error handling and user feedback mechanisms.
- Enhance accessibility features for better inclusivity.
