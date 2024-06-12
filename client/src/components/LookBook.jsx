import { NavLink } from "react-router-dom";

export default function LookBook() {
  const lookbooks = [
    {
      title: "Fall/Winter 2021",
      imageURL: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-lookbook-cover-image-4.jpg",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum, enim? Quod, omnis? Magnam quaerat repudiandae eveniet, numquam noncorporis delectus.",
      link: "/shop"
    },
    {
      title: "Spring/Summer 2021",
      imageURL: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-lookbook-cover-image-3.jpg",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum, enim? Quod, omnis? Magnam quaerat repudiandae eveniet, numquam noncorporis delectus.",
      link: "/shop"
    },
    {
      title: "Go & Play",
      imageURL: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-lookbook-cover-image-2.jpg",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum, enim? Quod, omnis? Magnam quaerat repudiandae eveniet, numquam noncorporis delectus.",
      link: "/shop"
    },
    {
      title: "Adventurer Gear",
      imageURL: "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-lookbook-cover-image-1.jpg",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum, enim? Quod, omnis? Magnam quaerat repudiandae eveniet, numquam noncorporis delectus.",
      link: "/shop"
    }
  ];
  return (
    <div className="bg-white">
      <h1 className="text-3xl md:text-7xl font-semibold text-dark text-center py-10 md:py-20">
        Lookbook
      </h1>
      {lookbooks.map((item, index) => (
        <div key={index} className=" px-4 md:px-10 flex flex-col gap-6 md:gap-14">
          <img src={item.imageURL} alt="shoesImg" />
          <div className="flex flex-col md:flex-row md:flex-nowrap justify-center md:px-[17rem] pb-20 md:pb-40">
            <h2 className="w-full md:w-1/2 text-2xl md:text-[2.55rem] pb-1 md:pb-0 font-semibold font-sans text-dark text-left">{item.title}</h2>
            <div className="w-full md:w-1/2 flex flex-col">
              <p className="text-justify leading-8 text-lightGray pb-4 md:pb-6">{item.description}</p>
              <NavLink to={item.link} className="border-b-2 border-orange-300 w-fit text-left font-semibold font-sans tracking-widest hover:border-dark">SHOP NOW</NavLink>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
