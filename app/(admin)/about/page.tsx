export default function Page() {
  return (
    <section className="max-w-4xl space-y-10 p-6">
      {/* Header */}
      <header>
        <h1>About This Project</h1>
        <p className="text-text-muted">
          An admin-focused inventory management system built with a
          logic-first approach.
        </p>
      </header>

      {/* Overview */}
      <section>
        <h3>Overview</h3>
        <p>
          This project is an admin-focused inventory management system
          created to demonstrate clean frontend architecture, predictable
          state management, and analytical thinking using modern React
          patterns.
        </p>
        <p>
          The goal of this application is not visual polish, but to show
          how real-world inventory logic—such as stock health, trends, and
          product prioritization—can be modeled clearly on the frontend.
        </p>
      </section>

      {/* Core Features */}
      <section>
        <h3>Core Features</h3>
        <ul className="list-disc pl-5 space-y-2 text-text-secondary">
          <li>Product inventory management</li>
          <li>Real-time stock updates</li>
          <li>Low-stock and out-of-stock indicators</li>
          <li>Activity tracking for inventory actions</li>
          <li>Inventory analytics and insights</li>
          <li>Admin-oriented user experience</li>
        </ul>
      </section>

      {/* Architecture */}
      <section>
        <h3>Architecture & Tech Stack</h3>

        <div className="space-y-3">
          <p>
            The application is built using a logic-first architecture
            where business rules and data transformations are handled
            outside of UI components.
          </p>

          <ul className="list-disc pl-5 space-y-2 text-text-secondary">
            <li>React with Next.js (App Router)</li>
            <li>Redux Toolkit for global state management</li>
            <li>Selector-based derived data for analytics</li>
            <li>TypeScript for type safety</li>
            <li>Tailwind CSS with custom design tokens</li>
          </ul>

          <p>
            Components are kept intentionally simple, while Redux slices
            and selectors handle all business logic and calculations.
          </p>
        </div>
      </section>

      {/* Analytics Philosophy */}
      <section>
        <h3>Analytics Philosophy</h3>
        <p>
          The Analytics section is designed to focus on interpretation
          rather than raw numbers or charts.
        </p>
        <p>
          Instead of duplicating dashboard data, analytics provide:
        </p>

        <ul className="list-disc pl-5 space-y-2 text-text-secondary">
          <li>Trends showing how inventory changes over time</li>
          <li>Product insights highlighting priority items</li>
          <li>Signals that indicate potential issues</li>
        </ul>
      </section>

      {/* Design Philosophy */}
      <section>
        <h3>Design Philosophy</h3>
        <p>
          This project intentionally avoids over-engineering and excessive
          UI complexity.
        </p>

        <ul className="list-disc pl-5 space-y-2 text-text-secondary">
          <li>Logic and correctness are prioritized over visual effects</li>
          <li>Features are built in small, complete increments</li>
          <li>Admin usability is prioritized over consumer aesthetics</li>
          <li>Unnecessary features are deliberately excluded</li>
        </ul>
      </section>

      {/* What This Demonstrates */}
      <section>
        <h3>What This Project Demonstrates</h3>
        <ul className="list-disc pl-5 space-y-2 text-text-secondary">
          <li>Strong understanding of React and Redux architecture</li>
          <li>Ability to model real-world business logic</li>
          <li>Clean separation of concerns</li>
          <li>Scalable and maintainable frontend structure</li>
          <li>Admin-focused product thinking</li>
        </ul>
      </section>

      {/* Future Enhancements */}
      <section>
        <h3>Future Enhancements</h3>
        <ul className="list-disc pl-5 space-y-2 text-text-secondary">
          <li>Persisted settings and preferences</li>
          <li>Advanced inventory alert rules</li>
          <li>Backend integration</li>
          <li>Extended historical analytics</li>
        </ul>
      </section>
    </section>
  );
}
