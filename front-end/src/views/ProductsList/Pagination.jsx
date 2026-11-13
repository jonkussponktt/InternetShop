export function Pagination({ pagesNumber }) {
  return (
    <div className="pagination">
      {Array.from({ length: pagesNumber }, (_, index) => (
        <div key={index}>{index} | </div>
      ))}
    </div>
  );
}
