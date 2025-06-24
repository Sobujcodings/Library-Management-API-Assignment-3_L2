"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatError = formatError;
function formatError(error) {
    if (error.name === "ValidationError") {
        return {
            message: "Validation failed",
            success: false,
            error: {
                name: error.name,
                errors: Object.keys(error.errors).reduce((acc, key) => {
                    const err = error.errors[key];
                    const rawProps = err.properties || {};
                    const properties = {
                        message: rawProps.message,
                        type: rawProps.type,
                        min: rawProps.min,
                    };
                    acc[key] = {
                        message: err.message,
                        name: err.name,
                        properties,
                        kind: err.kind,
                        path: err.path,
                        value: err.value,
                    };
                    return acc;
                }, {}),
            },
        };
    }
    console.log("error in utils", error);
    return {
        message: error.message || "Something went wrong",
        success: false,
        error,
    };
}
