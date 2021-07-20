function Page({ pageNumber, isActive, updateCurrentPage }) {
  const handleClick = event => {
    event.preventDefault();
    updateCurrentPage(pageNumber);
  };

  return (
    <li>
      <button
        className={`page page--clickable${isActive ? ' active-page' : ''}`}
        onClick={handleClick}
      >
        {pageNumber}
      </button>
    </li>
  );
}

export default Page;
