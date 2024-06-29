const BlogTagCheckbox = ({ selectedTags, handleCheckboxChange, isFilter }) => {
  const allTags = [
    "Children's Health",
    "Diet & Food",
    "Emotional Wellbeing",
    "Exercise & Fitness",
    "Men's Health",
    "Parenting",
    "Pregnancy & Childbirth",
    "Primary Care",
    "Science & Research",
    "Sex & Relationship",
    "Wellness",
    "Women's Health",
  ];
  return (
    <>
      {allTags.map((tag, index) => (
        <div key={tag}>
          <input
            type="checkbox"
            id={`tag-${index}`}
            checked={selectedTags.includes(tag)}
            onChange={() => handleCheckboxChange(tag)}
            disabled={isFilter}
          />
          <label htmlFor={`tag-${index}`}>{tag}</label>
        </div>
      ))}
    </>
  );
};

export default BlogTagCheckbox;
