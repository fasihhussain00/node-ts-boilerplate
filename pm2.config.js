module.exports = {
	apps: [
		{
			name: "gfe-app",
			script: "./src/app.js",
			watch: true,
			ignore_watch: [".git", ".md"],
			time: true,
		},
	],
};
