import "./EmptyState.css";

export function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <section className="empty-state">
      <h2>{title}</h2>
      <p>{description}</p>
      <button type="button" onClick={onAction}>
        {actionLabel}
      </button>
    </section>
  );
}
