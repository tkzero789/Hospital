import BlogTagCheckbox from "components/Blog/BlogTagCheckbox";

const BlogFilter = ({
  selectedTags,
  setSelectedTags,
  handleCheckboxChange,
  isFilter,
  setCurrentPage,
  paginate,
}) => {
  return (
    <>
      <div className="blog-list-filter">
        <div className="blog-list-filter-wrapper">
          <h5>Filter by:</h5>
          <form>
            <BlogTagCheckbox
              selectedTags={selectedTags}
              handleCheckboxChange={handleCheckboxChange}
              isFilter={isFilter}
            />
          </form>
          <div className="blog-list-filter-btn">
            <button
              onClick={(e) => {
                e.preventDefault();
                setSelectedTags([]);
                setCurrentPage(1);
                paginate(1);
              }}
            >
              <i className="bi bi-arrow-clockwise"></i>
              <span className="ps-1">Clear filters</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogFilter;
