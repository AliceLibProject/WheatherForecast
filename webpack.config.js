const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    entry: {
        main: path.resolve(__dirname,'./src/index.tsx'),
    },
    output: {
        path: path.resolve(__dirname,'./build'),
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                 test: /\.(scss|css)$/,
                 use: [
                    //'style-loader', 
                    MiniCssExtractPlugin.loader,
                    'css-loader', 
                    'sass-loader'
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx',  '.js', '.scss', '.css',],
    },
    plugins: [
            new HtmlWebPackPlugin({
                    title: 'webpack Boilerplate',
                    template: path.resolve(__dirname, './src/template.html'), // шаблон
                    filename: 'index.html', // название выходного файла
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css', // Формат имени файла
            }), 
            new CleanWebpackPlugin(),

  ],
  devServer: {
        historyApiFallback: true, //Используется для перехвата запросов по адресам и перенаправления их на какие-то страницы. см инструкцию
        static: {
             directory: path.join(__dirname, 'build'),
         }, //Указывает откуда брать статические файлы при работе
        open: true, //Открывает работающий сервер в дефолтном браузере (не всегда удобно, т.к. открывает новые вкладки при каждом запуске не закрывая старые)
        compress: true, //Использование сжатия gzip
        hot: true, //Позволяет перезагружать модули, без обновления страницы, если произошли изменения
        port: 8080, //Запускает сервер на указанном порту
        //host: '0.0.0.0' // Запускает сервер на указанном хосте (полезно, если нужно поделиться по сети)
        client: {
            overlay: false, //Запрет генерировать экран ошибок в браузере (экрат мешает видеть результат работы, ошибки итак показываются в терминале)
        },
    },
}