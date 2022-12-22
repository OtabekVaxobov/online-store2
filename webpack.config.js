const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');

new EslingPlugin({ extensions: 'ts' });
const baseConfig = {
    entry: path.resolve(__dirname, './src/index.ts'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: false },
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.ts$/i,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
        assetModuleFilename: (pathData) => {
            const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
            return `${filepath}/[name][ext]`;
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CopyWebpackPlugin({ patterns: [{ from: './src/img', to: 'img' }] }),
        new CleanWebpackPlugin(),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode
    ? { mode: 'production',}
    : {mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: {
          directory: path.resolve(__dirname, '../dist'),
        }
    },};

    return merge(baseConfig, envConfig);
};