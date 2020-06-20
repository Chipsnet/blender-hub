<template>
    <v-content>
        <v-parallax
            dark
            src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
        >
            <v-row align="center" justify="center">
                <v-col class="text-center" cols="12">
                    <h1 class="display-1 font-weight-thin mb-4">
                        bbbbb
                    </h1>
                    <h4 class="subheading">
                        aaaaa
                    </h4>
                </v-col>
            </v-row>
        </v-parallax>
        <v-container class="py-16">
            <h1>ジョウタだよ～～～</h1>
        </v-container>
    </v-content>
</template>

<script>
    import { remote } from "electron";

    export default {
        data() {
            return {
                externalContent: "",
            };
        },
        methods: {
            openURL(url) {
                remote.shell.openExternal(url);
            },
        },
    };
</script>

<style>
    .e-nuxt-container {
        min-height: calc(100vh - 50px);
        background: linear-gradient(to right, #ece9e6, #ffffff);
        font-family: Helvetica, sans-serif;
    }

    .e-nuxt-content {
        display: flex;
        justify-content: space-around;
        padding-top: 100px;
        align-items: flex-start;
        flex-wrap: wrap;
    }

    .e-nuxt-logo {
        width: 400px;
    }

    .e-nuxt-system-info {
        padding: 20px;
        border-top: 1px solid #397c6d;
        border-bottom: 1px solid #397c6d;
    }

    .e-nuxt-links {
        padding: 100px 0;
        display: flex;
        justify-content: center;
    }

    .e-nuxt-button {
        color: #364758;
        padding: 5px 20px;
        border: 1px solid #397c6d;
        margin: 0 20px;
        border-radius: 15px;
        font-size: 1rem;
    }

    .e-nuxt-button:hover {
        cursor: pointer;
        color: white;
        background-color: #397c6d;
    }
</style>
