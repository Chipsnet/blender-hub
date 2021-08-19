/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */

module.exports = {
    ssr: false,
    target: "static",
    head: {
        title: "blender-hub",
        meta: [{ charset: "utf-8" }]
    },
    loading: false,
    plugins: [
        { ssr: true, src: "@/plugins/icons.js" },

        { ssr: true, src: "@/plugins/element.js" }
    ],
    buildModules: [],
    modules: [
        [
            "nuxt-i18n",
            {
                // 使用する言語の設定
                locales: [
                    {
                        code: "ja",
                        name: "Japanese",
                        iso: "ja_JP",
                        file: "ja.yml"
                    },
                    {
                        code: "en",
                        name: "English",
                        iso: "en-US",
                        file: "en.yml"
                    }
                ],
                defaultLocale: "ja",
                langDir: "locales/",
                strategy: "prefix_and_default",
                vueI18n: {
                    fallbackLocale: "ja"
                },
                vueI18nLoader: true,
                lazy: true
            }
        ]
    ]
};
