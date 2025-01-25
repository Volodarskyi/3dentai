const GlobalLoading = () => {
  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div
        style={{
          zIndex: 10,
          position: "absolute",
          height: "100%",
          width: "100%",
          background: "rgba(169, 169, 169, 0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            padding: "1rem",
            borderRadius: "4px",
            fontSize: "20px",
            background: "white",
          }}
        >
          Loading..
        </div>
      </div>
    </div>
  );
};

export default GlobalLoading;
