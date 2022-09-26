const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');//asignamos a una constante la dependecia para usarla en module -> rules
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//agregamos la dependecia a una constante para que podamos hacer uso de ella


module.exports = {
    entry: './src/index.js',//colocamos el punto de entrada del proyecto
    output: {//en la salida vamos a colocar path para indicar la ruta y el nombre de la carpeta donde van a quedar los archivos que genere gracias al webpack
        path: path.resolve(__dirname, 'dist'),//ruta donde vamos a colocar la compilacion mas el nombre de la carpeta resultante
        filename: 'bundle.js'//nombre del archivo que va a resultar de la compilacion
    },
    resolve:{//en el resolve vamos a colocar las extenciones con las que vamos a trabajar
        extensions: ['.js', '.jsx']
    },
    mode: 'development',
    module: {//dentro del modulo vamos a colocar las reglas que nos van ayudar a trabajar con las dependencias
        rules: [
            {
                test: /\.(js|jsx)$/,//en esta parte estamos haciendo el llamado a las extenciones js o jsx
                exclude: /node_modules/,//excluimos la carpeta node_modules para exitar problemas con su contenido
                use: {//pasamos el loader
                    loader: 'babel-loader',//la dependencia loader que instalamos
                }
            },
            {
                test: /\.html$/,//en esta parte estamos haciendo el llamado a las extenciones html
                use: [{
                    loader: 'html-loader'
                }]
            },
            {
                test: /\.s[ac]ss$/,//creamos la exprecion regular para llamar los archivos de css o sass
                use: [//asignamos cuales loader son loader
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]                
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',//le indicamos el origen del archivo
            filename: './index.html',//le indicamos el nombre del archivo resultante
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    devServer: {//prepaamos el servidor interno 
        static: {
            directory: path.join(__dirname, "dist"),
          },//el llamado al contenido
        compress: true,//para comprimirlo
        port: 3006,//puerto
        open: true//para que se habra al ejecutar
    }
}