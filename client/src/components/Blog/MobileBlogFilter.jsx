import BlogTagCheckbox from "components/Blog/BlogTagCheckbox";

const MobileBlogFilter = ({
  openFilter,
  setOpenFilter,
  selectedTags,
  setSelectedTags,
  handleCheckboxChange,
  isFilter,
  setCurrentPage,
  paginate,
}) => {
  return (
    <>
      <div className={`m-blog-list-filter ${openFilter ? "active" : ""}`}>
        <div className="m-blog-list-filter-wrapper">
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpenFilter(false);
              }}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            Filters
          </div>
          <form>
            <h6>Topics:</h6>
            <BlogTagCheckbox
              selectedTags={selectedTags}
              handleCheckboxChange={handleCheckboxChange}
              isFilter={isFilter}
            />
          </form>
          <div className="m-blog-list-filter-btn">
            <button
              onClick={(e) => {
                e.preventDefault();
                setSelectedTags([]);
                setCurrentPage(1);
                paginate(1);
                setOpenFilter(false);
              }}
            >
              <i className="bi bi-arrow-clockwise"></i>
              <span className="ps-1">Clear filters</span>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpenFilter(false);
              }}
            >
              See results
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileBlogFilter;
