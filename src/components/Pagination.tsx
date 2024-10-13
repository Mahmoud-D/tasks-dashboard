type PaginationProps = {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex justify-center mt-4">
      <nav aria-label="Pagination">
        <ul className="inline-flex items-center space-x-2 text-sm">
          {/* Previous Button */}
          <li>
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`inline-flex items-center px-2 py-2 space-x-2 font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-50 ${
                currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>

          {/* Page Indicator */}
          <li>
            <span className="inline-flex items-center px-4 py-2 space-x-1 text-gray-500 bg-white border rounded-md">
              Page <b className="mx-1">{currentPage}</b> of{" "}
              <b className="ml-1">{totalPages}</b>
            </span>
          </li>

          {/* Next Button */}
          <li>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`inline-flex items-center px-2 py-2 space-x-2 font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-50 ${
                currentPage === totalPages
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
