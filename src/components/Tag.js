// import '../styles.css';
const Tag = ({ label = ''}) => {

  if (!label) return null; // Don't render anything for empty label

  return (
    <button
      // className={(className)}
      label={label.toUpperCase()}
      onClick={onClick}
    />
  );
};


export default Tag;


