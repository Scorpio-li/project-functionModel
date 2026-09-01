const Card = ({ title, content, imageUrl }) => {
  return (
    <div
      style={{
        width: "300px",
        border: "1px solid #ccc",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        margin: "20px auto",
        backgroundColor: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
          }}
        />
      )}
      <div style={{ padding: "20px" }}>
        <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>{title}</h3>
        <p style={{ margin: 0, color: "#666", lineHeight: "1.5" }}>{content}</p>
      </div>
    </div>
  );
};

export default Card;
