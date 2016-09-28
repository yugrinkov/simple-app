var path = require('path'),
    webpack = require('webpack'),
    extractTextPlugin = require('extract-text-webpack-plugin'),
    root = __dirname,
    config = {},
    extractTextPlugin = new extractTextPlugin('assets/style.css'),
    env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'production';

if (env == 'production') {
    config = require('./webpack.production.js');
} else if (env == 'development') {
    config = require('./webpack.development.js');
} else if (env == 'test') {
    config = require('./webpack.test.js');
}

var plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin('commons.js'),
    new webpack.DefinePlugin({
        ENV: JSON.stringify(env), // 'development' | 'test' | 'production'
    }),
    new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
    ),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        _: "underscore" ,
        Backbone: "backbone"
    }),
    extractTextPlugin
];

if (config.uglify) plugins.push(new webpack.optimize.UglifyJsPlugin({
    output: {
        comments: false
    }
}));

module.exports = {
    context: path.resolve(root, 'app'),
    devtool: config.devtool,
    extensions: ['', '.js', '.styl', '.css'],
    entry: {
        app: path.resolve(root, 'app/js/main.js')
        // test: path.resolve(root, 'app/js/libs/test.js')
    },
    output: {
        path: path.resolve(root, 'public'),
        libraryTarget: 'umd',
        filename: '[name].bundle.js',
        publicPath: '/assets/'
    },
    resolve: {
        modulesDirectories: [
            path.join(root, 'node_modules'),
            path.join(root, 'bower_components')
        ],
        alias: {
            css: path.resolve(root, 'app/css'),
            libs: path.resolve(root, 'app/js/libs'),
            views: path.resolve(root, 'app/js/views'),
            models: path.resolve(root, 'app/js/models'),
            collections: path.resolve(root, 'app/js/collections'),
            templates: path.resolve(root, 'app/templates'),
            routers: path.resolve(root, 'app/js/routers'),
            controllers: path.resolve(root, 'app/js/controllers'),
            js: path.resolve(root, 'app/js'),
            libs: path.resolve(root, 'app/js/libs'),
            bower: path.join(root, 'bower_components')
        }
    },
    module: {
        loaders: [
        {
            test: /\.html$/,
            loader: 'mustache'
        },
        {
            test: /\.mustache$/,
            loader: 'mustache'
        },
        {
                test: /\.css$/,
                loader: extractTextPlugin.extract('style-loader', 'css-loader')
        }, {
            test: /\.(woff|svg|ttf|eot)([\?]?.*)$/,
            loader: "file-loader?name=[name].[ext]"
        }]
    },
    plugins: plugins,
    devServer: {
        contentBase: path.resolve(root, 'public')
    },
    proxy: {
        // '/some/path*': {
        //     target: 'https://other-server.example.com',
        //     secure: false,
        // },
    }
};
