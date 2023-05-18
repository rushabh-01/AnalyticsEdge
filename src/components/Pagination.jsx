import PropTypes from "prop-types";

const Pagination = ({ current, total, onPageChange }) => {
  const next = () => {
    onPageChange(current + 1);
  };
  const previous = () => {
    onPageChange(current - 1);
  };

  

  return (
    <div className="flex mt-4">
      <button
        className="px-2 text-white mx-2"
        disabled={current === 1}
        onClick={previous}
      >
        Previous
      </button>
      <span>
        Page {current}
      </span>
      <button
        className="px-2 text-white mx-2"
        disabled={current === total}
        onClick={next}
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
