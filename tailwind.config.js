

module.exports = {
  purge: ['./src/**/*.js',
   './public/index.html',
   "./screens/**/*.{js,ts,jsx,tsx}",
   "./components/**/*.js",
   "./components/CategoryCard.js",
   "./components/Categories.js" ,
   "./screens/RestaurantScreen.js",
   "./screens/HomeScreen.js",
   
   "./components/FeaturedRow.js"],
  // ...other configuration options
  content:[ 
"./App.{js,jsx,ts,tsx}",
"./screens/**/*.{js,ts,jsx,tsx}",
"./pages/**/*.{js,ts,jsx,tsx}",
"./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {}
  },
  variants: {},
  plugins: []
}
