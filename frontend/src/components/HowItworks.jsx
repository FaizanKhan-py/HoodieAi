

export default  function Howitworks(){
    return(<>
    <br />
    <br />

        <p className="flex justify-center text-3xl font-bold " >How to Make your Own hoodies Designs?</p>
  
        <br />
        <br />

      <ul className="flex flex-col md:flex-row gap-6 md:gap-3 justify-evenly items-stretch w-full px-2">
        <li className="md:w-1/4 w-full hover:bg-white hover:text-black p-4 rounded-2xl transition-colors duration-200 mb-2 md:mb-0">
          <ul className="flex gap-4 items-start">
            <li className="border rounded-4xl text-2xl pl-3 pr-3 h-9 flex items-center">1</li>
            <li className="flex flex-col">
              <h2 className="font-bold mb-1 text-2xl">Create & Describe</h2>
              <p className="text-xl">
                Start a new design, choose your hoodie style, and enter a short AI prompt or upload an image for inspiration.
              </p>
            </li>
            <li className="hidden md:flex items-center">
              <p className="text-3xl"> →</p>
            </li>
          </ul>
        </li>
        <li className="md:w-1/4 w-full hover:bg-white hover:text-black p-4 rounded-2xl transition-colors duration-200 mb-2 md:mb-0">
          <ul className="flex gap-4 items-start">
            <li className="border rounded-4xl text-2xl pl-3 pr-3 h-9 flex items-center">2</li>
            <li className="flex flex-col">
              <h2 className="font-bold mb-1 text-2xl">Generate</h2>
              <p className="text-xl">
                The AI instantly creates multiple hoodie designs; you can edit colors, placement, text, and preview them on realistic 3D mockups.
              </p>
            </li>
            <li className="hidden md:flex items-center">
              <p className="text-3xl"> →</p>
            </li>
          </ul>
        </li>
        <li className="md:w-1/4 w-full hover:bg-white hover:text-black p-4 rounded-2xl transition-colors duration-200">
          <ul className="flex gap-4 items-start">
            <li className="border rounded-4xl text-2xl pl-3 pr-3 h-9 flex items-center">3</li>
            <li className="flex flex-col">
              <h2 className="font-bold mb-1 text-2xl ">Order</h2>
              <p className="text-xl">
                Once satisfied, download your print-ready file or place an order to get your custom AI-designed hoodie delivered.
              </p>
            </li>
          </ul>
        </li>
      </ul>

      <br />
      <br />
      <br />
      
    </>
  );
}