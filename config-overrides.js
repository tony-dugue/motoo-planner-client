const path = require('path');

module.exports = function override(config, env) {

    //do stuff with the webpack config...

    config["resolve"] = {
        alias: {
            app: path.resolve(__dirname, 'src/app/'),
            api: path.resolve(__dirname, 'src/api/'),
            components: path.resolve(__dirname, 'src/components/'),
            features: path.resolve(__dirname, 'src/features/'),
            scenes: path.resolve(__dirname, 'src/scenes/'),
            services: path.resolve(__dirname, 'src/services/'),
            images: path.resolve(__dirname, 'src/assets/images/'),
            assets: path.resolve(__dirname, 'src/assets/')
        },
        extensions: ['.js']
    }

    return config;
}
