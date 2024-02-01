// import React from "react";
// import Link from "next/link";

// const Intro = () => {
//   return (
//     <>
//       <div className="place-content-center">
//         <div className=" py-36 mx-5 grid grid-cols-2 text-center">
//           <div className="text-center">
//             <a href="/" className="hover:brightness-100 scale-150">
//               <span style={{ color: "var(--orange)" }}>Ask</span>
//               <span style={{ color: "var(--green)" }}>Your</span>
//               <span style={{ color: "var(--blue)" }}>Dost</span>
//             </a>
//             <span>
//               {" "}
//               is a platform which provides you the information of the products
//               and services which are provided in your locality.
//             </span>
//             <br />
//             <br />
//             <p>
//               Here you can find information about the services available in your
//               locality and you can also list your business services in this
//               platform by simply clicking the{" "}
//               <span className="hover:brightness-100 scale-150">
//                 <a
//                   href="/freeListing"
//                   style={{ color: "var(--blue)" }}
//                   className="bg-green"
//                 >
//                   FREELISTING
//                 </a>
//               </span>{" "}
//               button and filling the details of your business.
//             </p>
//           </div>
//           <div className="text-center">
//             <img
//               src="/images/intro-image.png"
//               alt="intro image"
//               className="w-56"
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Intro;






import React from "react";
import Link from "next/link";

const Intro = () => {
  return (
    <>
      <div className="place-content-center">
        <div className="py-36 mx-5 grid grid-cols-2 text-center">
          <div className="text-center pt-16">
            <a href="/" className="hover:brightness-100 scale-150">
              <span style={{ color: "var(--orange)" }}>Ask</span>
              <span style={{ color: "var(--green)" }}>Your</span>
              <span style={{ color: "var(--blue)" }}>Dost</span>
            </a>
            <span>
              {" "}
              is a platform that provides you with information about the products
              and services available in your locality.
            </span>
            <br />
            <br />
            <p>
              Here you can find information about the services available in your
              locality, and you can also list your business services on this
              platform by simply clicking the{" "}
              <span className="hover:brightness-100 scale-150">
                <a
                  href="/freeListing"
                  style={{ color: "var(--blue)" }}
                  className="bg-green"
                >
                  FREELISTING
                </a>
              </span>{" "}
              button and filling in the details of your business.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <img
              src="/images/intro-image.png"
              alt="intro image"
              className="w-72"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;
