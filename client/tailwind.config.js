/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        lightGray: '#979A9B',
        lighterGray: '#CBCCCD',
        dark:'#262B2C',
        lightGreen:'#6E7051',
        lighterGreen:'#9D9F83',
        myGray:'#F1F1EF'
      },
      backgroundImage: {
        'checkoutFooter': "url(https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-cta-image-bg.jpg)",
        'userIMG': "url(https://th.bing.com/th/id/OIP.qgumveGVGmLazarj6Q6cygAAAA?rs=1&pid=ImgDetMain)"
      }

      
    },
    screens: {
      'xxs': '380px',
      'xs': '530px',
      'sm': '720px',
      'md': '950px',
      'lg': '1150px',
      'xl': '1280px',
      '2xl': '1536px',
      'tall': {'raw': '(min-height: 800px)  and (max-width: 450px)'},
      'tall2': {'raw': '(min-height: 650px)  and (min-width:451px) and (max-width: 529px)'},
    },
    


    
  },
  plugins: [


  ],
}

