const path = require('path');

module.exports = function override(config, env) {

    //do stuff with the webpack config...

    config["resolve"] = {
        alias: {
            app: path.resolve(__dirname, 'src/app/'),
            components: path.resolve(__dirname, 'src/components/'),
            features: path.resolve(__dirname, 'src/features/'),
            scenes: path.resolve(__dirname, 'src/scenes/'),
            services: path.resolve(__dirname, 'src/services/'),
            //stores: path.resolve(__dirname, 'src/services/stores'),
            //security: path.resolve(__dirname, 'src/services/security'),
            //routes: path.resolve(__dirname, 'src/routes'),
        },
        extensions: ['.js']
    }

    return config;
}