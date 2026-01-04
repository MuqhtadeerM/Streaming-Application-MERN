const Progress = ({ progress, status }) => {
  return (
    <div style={{ marginTop: "10px" }}>
      <div
        style={{
          width: "300px",
          height: "20px",
          border: "1px solid #000",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: progress === 100 ? "green" : "orange",
          }}
        />
      </div>
      <p>Status: {status}</p>
    </div>
  );
};

export default Progress;
