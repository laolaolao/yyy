const webpack = require('webpack')
const path  =require('path');
const HtmlPlugin= require('html-webpack-plugin');
const ExtractTextWebpackPlugin=require('extract-text-webpack-plugin')
const glob = require('glob');
const PurifyCssPlugin =require("purifycss-webpack");
module.exports = {
    mode: 'development',
    entry:{
        'index':'./src/index.js',
    },
    output:{
        path: path .resolve(__dirname,'dist'),
        filename:'[name].js',
        publicPath:'http://127.0.0.1:8081/'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                // use:['style-loader','css-loader']
                use:ExtractTextWebpackPlugin.extract({
                    fallback:"style-loader",
                    use:[{
                        loader:"css-loader",
                        options:{importLoaders:1}
                    },'postcss-loader']
                })
            },{
                test:/\.(png|jpg|gif)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:500,
                            outputPath:'images/'
                        }
                    }]
            
            },{
                test:/\.(htm|html)$/i,
                loader:'html-withimg-loader'
            },{
                test:/\.(jsx|js)$/,
               use:{
                   loader:'babel-loader',
                   options:{
                       presets:[
                           'es2015',"react"
                       ]
                   }
               },
               exclude:/node_modules/
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new HtmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:'./src/index.html'
        }),
        new ExtractTextWebpackPlugin("css/index.css"),
        new PurifyCssPlugin({
            paths:glob.sync(path.join(__dirname,'src/*.html'))
        })
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'127.0.0.1',
        compress:true,
        port:8081,
        open:true,
        hot:true
    }
};