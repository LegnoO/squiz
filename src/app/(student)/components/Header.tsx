import Image from "next/image";
import dynamic from "next/dynamic";
const CountdownTimer = dynamic(() => import("@/components/CountdownTimer"), {
  ssr: false,
});

// Icons
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next-nprogress-bar";

const Header = () => {
  const router = useRouter()
  return (
    <div className="relative w-full bg-[--background-primary-main] text-[--color-primary-main] shadow-md">
      <div className="flex items-center justify-between px-4">
        <div className="">
          <button
            onClick={
              () => {
                router.back()
              }
            }
            className="flex items-center gap-2 rounded border border-[--border-primary-main] bg-[--background-primary-main] p-2 transition duration-200 hover:bg-gray-100">
            <IoMdArrowBack className="h-6 w-6" />
            <span className="font-medium">Quay lại</span>
          </button>
        </div>
        <div className="relative flex h-[60px] cursor-pointer items-center gap-2 rounded">
          <p className="mr-2 font-medium text-[--color-text-link]">
            197CT09794 - Minh Khôi - HTML
          </p>
          <Image
            src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t1.6435-1/139131444_3393715627406941_8376925531107375232_n.jpg?stp=c0.0.200.200a_dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeElVGQvtfcOvMLiikwk_sN0-93hX0BTTBD73eFfQFNMEFCHvxt4v-r5af3_QzPpz5EN6KCcE820BUiwV24oApZu&_nc_ohc=HiiP0XEe37kAX_uigNm&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfDGbsoMRfkKZ7cD3o8HzDKlvPVp-CfSbfEBqI3cLxVuyA&oe=6618D625"
            className="rounded-full"
            width={35}
            height={35}
            alt="Picture of the author"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
