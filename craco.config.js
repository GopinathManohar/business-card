
const CracoLessPlugin = require('craco-less');

/* craco.config.js */
module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#EC171C',
                            '@text-color': '#1C1D1F',
                            '@border-color-base': '#d9d9d9',
                            '@heading-color': '#1C1D1F',
                            '@table-header-color': '#949494',
                            '@table-header-bg': '#FFFFFF',
                            '@table-font-size': '12px',
                            '@table-font-color': '#D3D3D3',
                            '@table-border-radius-base': '1rem',
                            '@btn-border-radius-base': '0.4rem',
                            '@input-border-radius-base': '0.4rem',
                            '@tag-border-radius': '0.4rem',
                            '@card-radius': '1rem',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
    // ...
};