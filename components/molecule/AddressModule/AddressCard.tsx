import Image from "next/image";
import angleRight from "../../../assets/images/angle-right.png";

type Props = {};

const AddressCard = (props: Props) => {
  return (
    <section className="w-full max-w-[440px] mb-7">
      <div className="w-full flex justify-between gap-5 items-start">
        <div className="w-full space-y-2">
          <p className="text-xs font-normal">Cah234 Parkview estate</p>
          <p className="text-xs font-normal">101233</p>
          <p className="text-xs font-normal">Ikoyi</p>
          <p className="text-xs font-normal">Lagos</p>
          <p className="text-xs font-normal">Nigeria</p>
          <p className="text-xs font-normal">
            <span>+234</span> 9060347521
          </p>

          <button
            className="capitalize mt-[14px] underline text-xs"
            title="edit-address"
          >
            edit
          </button>
        </div>

        <button title="angle-right-icon">
          <Image src={angleRight} alt="angle-right" />
        </button>
      </div>
    </section>
  );
};

export default AddressCard;
