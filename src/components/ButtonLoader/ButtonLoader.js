import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";

const ButtonLoader = ({ loading, children, ...props }) => {
  const [dotScales, setDotScales] = useState([1, 1, 1]);

  useEffect(() => {
    if (!loading) return;

    const intervals = dotScales.map((_, i) =>
      setInterval(() => {
        setDotScales(prev => {
          const newScales = [...prev];
          newScales[i] = 0.5 + Math.random() * 1; 
          return newScales;
        });
      }, 300 + Math.random() * 300) 
    );

    return () => intervals.forEach(clearInterval);
  }, [loading]);

  return (
    <Button
      {...props}
      disabled={loading}
      sx={{
        position: "relative",
        minWidth: 120,
        py: 1.2,
        fontWeight: 600,
        ...props.sx,
      }}
    >
      {loading ? (
        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
          {dotScales.map((scale, i) => (
            <Box
              key={i}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#fff",
                transform: `scale(${scale})`,
                transition: "transform 0.3s ease-in-out",
              }}
            />
          ))}
        </Box>
      ) : (
        children
      )}
    </Button>
  );
};

export default ButtonLoader;
