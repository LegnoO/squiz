"use client";
import banner1 from "@/assets/banner1.jpg";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";

export default function Home() {
  // const count = useAppSelector((state) => state.counter.value);
  // const dispatch = useAppDispatch();

  return (
    <>
      <div className="border-break w-full">
        <Carousel showStatus={false} showArrows showThumbs={false}>
          <section className="relative">
            <Image
              src={banner1}
              alt="banner"
              className="object-cover"
              priority
            />
            <div className="static left-16 top-14 bg-white p-4 text-left text-primary shadow-md md:absolute md:w-full md:max-w-[26rem]">
              <h1 className="mb-3 font-semibold">Got a dream?</h1>
              <p className="mb-4">
                We have thousands of real-world experts that can help. Start
                learning the skills you need to make it happen.
              </p>
            </div>
          </section>

          <section className="relative">
            <Image src={banner1} alt="banner" loading="lazy" />
            <div className="static left-16 top-14 bg-white p-4 text-left text-primary shadow-md md:absolute md:w-full md:max-w-[26rem]">
              <h1 className="mb-3 font-semibold">Got a dream?</h1>
              <p className="mb-4">
                We have thousands of real-world experts that can help. Start
                learning the skills you need to make it happen.
              </p>
            </div>
          </section>
        </Carousel>
      </div>
    </>
  );
}
