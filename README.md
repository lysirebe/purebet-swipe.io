# Follow the project structure and pattern React + Material UI Professional starter

- https://github.com/karpolan/react-mui-pro-starter



To run the project locally, cd to project directory,

- rename `.env_sample` as `.env`, to place real bet, set the REACT_APP_PLACE_REAL_BET=true

- `npm ci`

- for newer node.js version, add the line

    'fallback: { "crypto": require.resolve("crypto-browserify"), "stream": require.resolve("stream-browserify") },'

    to the resolve section in webpack.config.js file so it looks like:

    ......
    resolve: {
        // This allows you to set a fallback for where webpack should look for modules.
        .......
        plugins: [
            // Prevents users from importing files from outside of src/ (or node_modules/).
            .....
            new ModuleScopePlugin(paths.appSrc, [
            paths.appPackageJson,
            .....
            babelRuntimeRegenerator,
            ]),
        ],
        fallback: { "crypto": require.resolve("crypto-browserify"), "stream": require.resolve("stream-browserify") },
        },

- `npm start` or `npm run dev`


