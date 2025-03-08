let mode = "development";
export const globalError = (err, req, res, next) => {
	if (mode === "production") {
		res.status(err.statuscode || 500).json({ error: err.message });
	} else {
		res
			.status(err.statuscode || 500)
			.json({ error: err.message, stack: err.stack });
	}
};
