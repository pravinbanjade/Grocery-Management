export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Global CSS
   */
  css: ["~assets/stylesheet/main.scss"],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ["./plugins/globalComponents"],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/auth",
    "@nuxtjs/axios"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: "http://localhost:3000"
  },
  /**
   * auth
   */
  auth: {
    vuex: {
      namespace: "admin"
    },
    strategies: {
      admin: {
        _scheme: "local",
        endpoints: {
          login: {
            url: "/crm/login",
            method: "post",
            propertyName: "token"
          },
          logout: { url: "/crm/logout", method: "post" },
          user: { url: "/crm/me", method: "get", propertyName: "user" }
        }
      },
      user: {
        _scheme: "local",
        endpoints: {
          login: {
            url: "/crm/user/login",
            method: "post",
            propertyName: "token"
          },
          logout: { url: "/crm/user/logout", method: "post" },
          user: {
            url: "/crm/user/me",
            method: "get",
            propertyName: "user"
          }
        }
      }
    },
    redirect: {
      login: "/login",
      home: "/admin/dashboard"
    }
  },
  /*   router: {
    middleware: ["auth"]
  }, */
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {}
};
