export default function Contact() {
  return (
    <div className=" pb-32">
      <div className="contact">
        <div className="contact__container">
          <h1 className="contact__title text-center font-bold py-20">Contact Us</h1>
          <div className="contact__content flex flex-row justify-center gap-32">
            <div className="contact__info flex flex-col justify-start items-start">
              <h2 className="contact__info-title pb-10">Contact Information</h2>
              <p className="contact__info-text pb-8 text-lg ">
                <span className=" font-semibold pr-2">Address:</span> 21107 Kurdaam, Hamburg, Germany
              </p>
              <p className="contact__info-text pb-8 text-lg ">
                <span className=" font-semibold pr-2">Phone:</span> +123 456 7890
              </p>
              <p className="contact__info-text pb-8 text-lg ">
                <span className=" font-semibold pr-2">Email:</span>
                <a href="mailto:"> omarzoubi.1@outlook.com</a>
              </p>
              <p className="contact__info-text pb-8 text-lg ">
                <span className=" font-semibold pr-2">Website:</span>
                <a href="https://www.example.com"> www.example.com</a>
              </p>
            </div>
            <div className="contact__form flex flex-col justify-start items-start ">
              <h2 className="contact__form-title pb-10">Send Us a Message</h2>
              <form action="" className="contact__form-box flex flex-col gap-6">
                <div className="contact__form-inputs flex flex-row gap-6">
                  <input
                    type="text"
                    className="contact__form-input p-3 rounded-md shadow-md"
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    className="contact__form-input p-3 rounded-md shadow-md"
                    placeholder="Email"
                  />
                </div>
                <input
                  type="text"
                  className="contact__form-input p-3 rounded-md shadow-md "
                  placeholder="Subject"
                />
                <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="4"
                  className="contact__form-input p-3 rounded-md shadow-md "
                  placeholder="Message"

                ></textarea>
                <button className="contact__form-button bg-lightGreen text-white font-bold tracking-widest w-full py-2  rounded-2xl shadow-2xl hover:bg-dark">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
