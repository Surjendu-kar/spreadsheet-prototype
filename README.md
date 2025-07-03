# Product Spreadsheet Prototype

This project is a static, front-end-only React prototype of a spreadsheet view, designed to visually match a provided Figma design and implement core spreadsheet functionalities.

## 1. Goal

Create a static, front-end-only React prototype that visually matches the attached screenshot of the product's spreadsheet view.

## 2. Core Criteria (IMPORTANT)

Build a pixel perfect experience as per Figma (including the actual spreadsheet experience).

### Figma Design Screenshot

![Product Spreadsheet Design](https://github.com/Surjendu-kar/spreadsheet-prototype/blob/master/public/spreadsheet-design.png?raw=true)

## 3. Tech Stack

The prototype is built using the following technologies:

- **React 18**: Frontend library for building the user interface.
- **TypeScript 5.x**: Ensures type safety and improves code quality (strict mode enabled).
- **Vite**: A fast build tool for modern web projects.
- **Tailwind CSS 3.x**: A utility-first CSS framework for rapid UI development.
- **@tanstack/react-table 8.x**: A powerful headless UI library for building tables and data grids.
- **ESLint & Prettier**: For code linting and formatting, ensuring consistent code style.

## 4. Features Implemented

Beyond the core criteria, the following features have been implemented:

- **Google Sheet/Excel-like Spreadsheet Experience**:
  - **Editable Cells**: Users can click on cells to edit their data directly.
  - **New Cell Data**: The spreadsheet is padded with empty rows, allowing users to add new data seamlessly by editing these cells.
  - **Dynamic Column Types**:
    - **Date Picker for 'Submitted' & 'Due Date'**: Clicking on cells in these columns opens a native date picker for easy date selection.
    - **Dropdown for 'Status' & 'Priority'**: Cells in these columns display a dropdown menu with predefined options for quick selection.
- **Keyboard Navigation**: Users can navigate within the grid using arrow keys (Up, Down, Left, Right) for a more efficient data entry experience.
- **Column Resize**: Columns can be resized by dragging the dividers in the header, allowing for flexible layout adjustments.
- **Smooth Hover Effects**:
  - Buttons and interactive elements in the Header (e.g., Notification Icon) and Toolbar (e.g., "New Action" button, "Hide fields", "Sort", "Filter", "Cell view") now feature smooth opacity transitions on hover.
  - Bottom tab buttons also include smooth hover effects.
- **Text Truncation**: Text in cells is truncated with an ellipsis (...) if it exceeds the column's visible width, ensuring a clean and readable layout.

## 5. Acceptance Criteria

1.  Pixel-close layout to the Figma.
2.  Google Sheet/Excel like spreadsheet experience.
3.  All buttons/tabs change state or log to console—no dead UI.
4.  Code passes `npm run lint` (ESLint + Prettier) and `npm run type-check`.
5.  Clean commit history with meaningful messages.

## 6. Submission

- Live URL to access the built out product: [https://spreadsheet-prototype.vercel.app/](https://spreadsheet-prototype.vercel.app/)
- Github repository: [https://github.com/Surjendu-kar/spreadsheet-prototype](https://github.com/Surjendu-kar/spreadsheet-prototype)
- Include a short `README.md` explaining setup & any trade-offs (this file).

## 7. Setup & Running the Project

To set up and run this project locally, follow these steps:

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/Surjendu-kar/spreadsheet-prototype
    cd product-spreadsheet
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Run the development server**:

    ```bash
    npm run dev
    ```

    This will start the Vite development server, usually accessible at `http://localhost:5173`.

4.  **Build the project**:

    ```bash
    npm run build
    ```

    This command compiles the project for production, generating static assets in the `dist` directory.

5.  **Lint and Type Check**:
    To ensure code quality, run the linting and type-checking commands:
    ```bash
    npm run lint
    npm run type-check
    ```
