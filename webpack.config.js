/**
 * The contents of this file are subject to the CYPHON Proprietary Non-
 * Commercial Registered User Use License Agreement (the "Agreement”). You
 * may not use this file except in compliance with the Agreement, a copy
 * of which may be found at https://github.com/dunbarcyber/cyclops/. The
 * developer of the CYPHON technology and platform is Dunbar Security
 * Systems, Inc.
 *
 * The CYPHON technology or platform are distributed under the Agreement on
 * an “AS IS” basis, WITHOUT WARRANTY OF ANY KIND, either express or
 * implied. See the Agreement for specific terms.
 *
 * Copyright (C) 2017 Dunbar Security Solutions, Inc. All Rights Reserved.
 *
 * Contributor/Change Made By: ________________. [Only apply if changes
 * are made]
 */

// Vendor
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

// --------------------------------------------------------------------------
// Constants
// --------------------------------------------------------------------------

/**
 * Current running environment.
 * @type {string}
 */
const ENV = process.env.NODE_ENV || 'development';

/**
 * If webpack is being run in a production environment.
 * @type {boolean}
 */
const PRODUCTION = ENV === 'production';

/**
 * If webpack is being run in a test environment.
 * @type {boolean}
 */
const TESTING = ENV === 'test';

/**
 * If webpack is being run in a development environment.
 * @type {boolean}
 */
const DEVELOPMENT = ENV === 'development';

const BANNER =
`The contents of this file are subject to the CYPHON Proprietary Non-
Commercial Registered User Use License Agreement (the "Agreement”). You
may not use this file except in compliance with the Agreement, a copy
of which may be found at https://github.com/dunbarcyber/cyclops/. The
developer of the CYPHON technology and platform is Dunbar Security
Systems, Inc.

The CYPHON technology or platform are distributed under the Agreement on
an “AS IS” basis, WITHOUT WARRANTY OF ANY KIND, either express or
implied. See the Agreement for specific terms.

Copyright (C) 2017 Dunbar Security Solutions, Inc. All Rights Reserved.

Contributor/Change Made By: ________________. [Only apply if changes
are made]`;

// --------------------------------------------------------------------------
// Loaders
// --------------------------------------------------------------------------

/**
 * Webpack loader for CSS files.
 * @type {Object}
 */
const CSS_LOADER = {
  loader: 'css-loader',
  options: {
    minimize: PRODUCTION,
    sourceMap: PRODUCTION,
  },
};

const SCSS_LOADER = {
  loader: 'sass-loader',
  options: {
    includePaths: [path.resolve(__dirname, 'node_modules')],
  },
};

// --------------------------------------------------------------------------
// Rules
// --------------------------------------------------------------------------

/**
 * Webpack rule for loading javascript sourcemap files.
 * @type {Object}
 */
const JS_SOURCEMAP_RULE = {
  test: /\.js$/,
  enforce: 'pre',
  loader: 'source-map-loader',
};

/**
 * Webpack rule for loading typescript sourcemap files.
 * @type {Object}
 */
const TS_SOURCEMAP_RULE = {
  test: /\.tsx?$/,
  enforce: 'pre',
  loader: 'source-map-loader',
};

/**
 * Webpack rule for linting Typescript files.
 * @type {Object}
 */
const TSLINT_RULE = {
  test: /\.tsx?$/,
  enforce: 'pre',
  loader: 'tslint-loader',
};

/**
 * Webpack rule for CSS files.
 * @type {Object}
 */
const CSS_RULE = {
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: CSS_LOADER,
  }),
};

/**
 * Webpack rule for Typescript files.
 * @type {Object}
 */
const TYPESCRIPT_RULE = {
  test: /\.tsx?$/,
  include: path.resolve(__dirname, 'src'),
  loader: 'awesome-typescript-loader',
};

/**
 * Webpack rule for sass files.
 * @type {Object}
 */
const SCSS_RULE = {
  test: /\.scss$/,
  include: path.resolve(__dirname, 'src/styles'),
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      CSS_LOADER,
      SCSS_LOADER,
    ],
  }),
};

/**
 * Webpack rule for generating code coverage.
 * @type {Object}
 */
const COVERAGE_RULE = {
  test: /\.tsx?$/,
  enforce: 'post',
  include: path.resolve(__dirname, 'src/app'),
  exclude: /\.spec\.tsx?$/,
  loader: 'istanbul-instrumenter-loader',
};

/**
 * Rules that are used no matter the environment
 * @type {Rule[]}
 */
const BASE_RULES = [
  TSLINT_RULE,
  JS_SOURCEMAP_RULE,
  TS_SOURCEMAP_RULE,
  CSS_RULE,
  TYPESCRIPT_RULE,
  SCSS_RULE,
];

/**
 * Rules that are used in a test environment.
 * @type {Rule[]}
 */
const TEST_RULES = [
  COVERAGE_RULE,
];

/**
 * Rules used in the webpack configuration.
 * @type {Rule[]}
 */
const RULES = TESTING ? BASE_RULES.concat(TEST_RULES) : BASE_RULES;

// --------------------------------------------------------------------------
// Plugins
// --------------------------------------------------------------------------

/**
 * Plugins that are used no matter the environment.
 * @type {Plugin[]}
 */
const BASE_PLUGINS = [
  new ExtractTextPlugin('cyclops.css'),
];

/**
 * Plugins that are used in a testing environment.
 * @type {Plugin[]}
 */
const TEST_PLUGINS = [
  new webpack.SourceMapDevToolPlugin({
    filename: null, // if no value is provided the sourcemap is inlined
    test: /\.(tsx?|js)($|\?)/i, // process .js and .ts files only
  }),
];

/**
 * Plugins that are used in a development environment.
 * @type {Plugin[]}
 */
const DEVELOPMENT_PLUGINS = [
];

/**
 * Plugins to add in a production environment.
 * @type {Plugin[]}
 */
const PRODUCTION_PLUGINS = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
  new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
  new webpack.BannerPlugin(BANNER),
];

/**
 * Plugins used in the webpack configuration.
 * @type {Plugin[]}
 */
const PLUGINS = {
  development: () => BASE_PLUGINS.concat(DEVELOPMENT_PLUGINS),
  production: () => BASE_PLUGINS.concat(PRODUCTION_PLUGINS),
  test: () => BASE_PLUGINS.concat(TEST_PLUGINS),
}[ENV]();

/**
 * Devtool to use.
 * @type {string}
 */
const DEVTOOL = {
  development: 'inline-source-map',
  production: 'source-map',
  test: 'inline-source-map',
}[ENV];

// --------------------------------------------------------------------------
// Configuration
// --------------------------------------------------------------------------

/**
 * Webpack configuration.
 * @type {Object}
 */
module.exports = {
  context: __dirname,

  entry: [
    require.resolve('core-js/shim'),
    './src/main.ts'
  ],

  output: TESTING ? undefined : {
    filename: 'cyclops.js',
    path: path.resolve(__dirname, DEVELOPMENT ? 'build' : 'dist'),
  },

  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.json',
    ],
    alias: {
      '~': path.resolve(__dirname, 'src/app/'),
    },
  },

  devtool: DEVTOOL,

  module: {
    rules: RULES,
    noParse: /(mapbox-gl)\.js$/,
  },

  externals: {
    'react/lib/ReactContext': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/addons': true,
    'mapboxgl': 'mapboxgl',
  },

  plugins: PLUGINS,
};
