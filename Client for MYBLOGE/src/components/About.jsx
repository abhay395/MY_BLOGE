import React from 'react'

export default function About() {
  return (
    <section class="pt-10 overflow-hidden bg-gray-50 md:pt-0 mb-10 sm:pt-16 2xl:pt-16">
      <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl ">
        <div class="grid items-center grid-cols-1 md:grid-cols-2">

          <div className='animate-fade-right'>
            <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Hey 👋 I am
              <br class="block sm:hidden" /> Abhay Prajapati
            </h2>
            <p class="max-w-lg mt-3 text-xl leading-relaxed text-gray-600 md:mt-8">
              As a second-year BCA student, I am deeply passionate about web development and full-stack technologies. My recent projects showcase my expertise in modern tools and frameworks. I have designed dynamic user interfaces using React.js and Tailwind CSS, ensuring visually appealing and responsive designs. On the backend, I have utilized Express.js and Node.js to build secure and efficient servers, while MongoDB serves as the backbone for database management. My work reflects a strong understanding of cutting-edge technologies and a commitment to creating feature-rich web applications. I am eager to continue advancing my skills and exploring the vast opportunities in computer science.
            </p>


            {/* <p class="mt-4 text-xl text-gray-600 md:mt-8">
                    <span class="relative inline-block">
                        <span class="absolute inline-block w-full bottom-0.5 h-2 bg-yellow-300"></span>
                    <span class="relative"> Have a question? </span>
                    </span>
                    <br class="block sm:hidden" />Ask me on <a href="#" title=""
                        class="transition-all duration-200 text-sky-500 hover:text-sky-600 hover:underline">Twitter</a>
                </p> */}
          </div>

          <div class="relative">
            <img class="absolute  inset-x-0 bottom-0 -mb-48 -translate-x-1/2 left-1/2" src="https://cdn.rareblocks.xyz/collection/celebration/images/team/1/blob-shape.svg" alt="" />

            <img class="relative animate-fade-left
 w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110" src="https://res.cloudinary.com/dhcszkydc/image/upload/v1710155470/abmoiorndfysbqo96ldw.png" alt="" />
          </div>

        </div>
      </div>
    </section>

  )
}
