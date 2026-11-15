import "./Pagination.css";

export function Pagination({
  pagesNumber,
  currentPage,
  pageNumberClickCallback,
}) {
  return (
    <nav className="pagination" aria-label="Paginacja produktów">
      {Array.from({ length: pagesNumber }, (_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => pageNumberClickCallback(String(index + 1))}
          disabled={index === currentPage}
          aria-current={index === currentPage ? "page" : undefined}
        >
          {index + 1}
        </button>
      ))}
    </nav>
  );
}
