import React from "react";
import { Typography } from "@/components/ui/Typography";

const Loading = ({ text = "Loading...", spinnerColor = "#2d6a4f" }) => {
    const dynamicStyles = {
        spinner: {
            ...styles.spinner,
            border: `5px solid ${spinnerColor}`,
            borderTop: `5px solid transparent`,
        },
    };

    return (
        <div style={styles.container}>
            <div style={dynamicStyles.spinner}></div>
            <Typography variant="p-semibold" className="mt-4">{text}</Typography>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
    },
    spinner: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
    },
};

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
    `@keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }`,
    styleSheet.cssRules.length
);

export default Loading;
