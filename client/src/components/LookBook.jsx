import { NavLink } from "react-router-dom";

export default function LookBook() {
  return (
    <div className="bg-white">
      <h1 className=" text-7xl font-semibold text-dark text-center  py-20">
        Lookbook
      </h1>
      <div className="px-10 flex flex-col gap-14">
        <img
          src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-lookbook-cover-image-4.jpg"
          alt="shoesImg"
        />
        <div className="flex flex-row flex-nowrap justify-center px-[17rem] pb-40">
          <h2 className="w-1/2 text-[2.55rem] font-semibold font-sans text-dark text-left">Fall/Winter 2021</h2>
          <div className="w-1/2 flex flex-col">
            <p className=" text-justify leading-8 text-lightGray pb-6">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum,
              enim? Quod, omnis? Magnam quaerat repudiandae eveniet, numquam non
              corporis delectus.
            </p>
            <NavLink to="/shop" className="border-b-2 border-orange-300 w-fit text-left font-semibold font-sans tracking-widest hover:border-dark">SHOP NOW</NavLink>
          </div>
        </div>
      </div>
      <div className="px-10 flex flex-col gap-14" >
        <img
          src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-lookbook-cover-image-3.jpg"
          alt="shoesImg"
        />
        <div className="flex flex-row flex-nowrap justify-center px-[17rem] pb-40">
          <h2 className="w-1/2 text-[2.55rem] font-semibold font-sans text-dark text-left">Spring/Summer 2021</h2>
          <div className="w-1/2 flex flex-col">
            <p className=" text-justify leading-8 text-lightGray pb-6">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum,
              enim? Quod, omnis? Magnam quaerat repudiandae eveniet, numquam non
              corporis delectus.
            </p>
            <NavLink to="/shop" className="border-b-2 border-orange-300 w-fit text-left font-semibold font-sans tracking-widest hover:border-dark">SHOP NOW</NavLink>
          </div>
        </div>
      </div>
      <div className="px-10 flex flex-col gap-14">
        <img
          src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-lookbook-cover-image-2.jpg"
          alt="shoesImg"
        />
        <div className="flex flex-row flex-nowrap justify-center px-[17rem] pb-40">
          <h2 className="w-1/2 text-[2.55rem] font-semibold font-sans text-dark text-left">Go & Play</h2>
          <div className="w-1/2 flex flex-col">
            <p className=" text-justify leading-8 text-lightGray pb-6">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum,
              enim? Quod, omnis? Magnam quaerat repudiandae eveniet, numquam non
              corporis delectus.
            </p>
            <NavLink to="/shop" className="border-b-2 border-orange-300 w-fit text-left font-semibold font-sans tracking-widest hover:border-dark">SHOP NOW</NavLink>
          </div>
        </div>
      </div>
      <div className="px-10 flex flex-col gap-14">
        <img
          src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-lookbook-cover-image-1.jpg"
          alt="shoesImg"
        />
        <div className="flex flex-row flex-nowrap justify-center px-[17rem] pb-20">
          <h2 className="w-1/2 text-[2.55rem] font-semibold font-sans text-dark text-left">Adventurer Gear</h2>
          <div className="w-1/2 flex flex-col">
            <p className=" text-justify leading-8 text-lightGray pb-6">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum,
              enim? Quod, omnis? Magnam quaerat repudiandae eveniet, numquam non
              corporis delectus.
            </p>
            <NavLink to="/shop" className="border-b-2 border-orange-300 w-fit text-left font-semibold font-sans tracking-widest hover:border-dark">SHOP NOW</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
