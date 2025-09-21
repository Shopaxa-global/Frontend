import Image from "next/image";
import done from "../../../assets/images/icon-done.png";
import failed from "../../../assets/images/orderFailed.png";

type Props = {
  handleCloseModal: () => void;
  paymentSuccessful: boolean;
};

const PaymentStatus = ({ handleCloseModal, paymentSuccessful }: Props) => {
  return (
    <div className=" fixed right-0 bottom-0 top-0 z-50 bg-[rgba(255,255,255,0.9)] left-0">
      <div className=" h-full w-full ml-auto py-[58px] pl-[39px] pr-[58px] flex items-center justify-center">
        {paymentSuccessful ? (
          <section className="w-full max-w-[250px] mx-auto  font-Silka">
            <h2 className="text-base text-[rgba(14,12,34,0.8)] text-center font-medium mt-14 mb-5">
              Thank You For Your Purhcase
            </h2>

            <Image
              src={done}
              alt="order-successful"
              className="my-16 w-[108px] h-[103px] object-contain mx-auto"
            />
            <button
              className="h-[44px] font-HM-Sans text-xs w-full max-w-[246px] text-white uppercase font-normal bg-[#212121] mx-auto "
              onClick={handleCloseModal}
            >
              TRACK ORDER
            </button>
          </section>
        ) : (
          <section className="w-full max-w-[250px] mx-auto  font-Silka">
            <h2 className="text-base text-[rgba(14,12,34,0.8)] text-center font-medium mt-14 mb-5">
              Oh Snap! Order Failed
            </h2>

            <Image
              src={failed}
              alt="order-successful"
              className="my-16 w-[116px] h-[116px] object-contain mx-auto"
            />
            <button
              className="h-[44px] font-HM-Sans text-xs w-full max-w-[246px] text-white uppercase font-normal bg-[#212121] mx-auto "
              onClick={handleCloseModal}
            >
              TRY AGAIN
            </button>
          </section>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;
