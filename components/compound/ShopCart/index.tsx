import styles from "../../../styles/ShopCart.module.scss";
import { MoreInfo } from "../../molecule";

const index = () => {
  return (
    <section className={`${styles.shopcart} flex items-end w-full`}>
      <MoreInfo
        buttonId={2}
        headingCustomClass="text-black-100 font-[700] text-[22px] mb-4"
        buttonTitle="CREATE A PROFILE"
        heading="SHOP YOUR CARTS HERE"
      />
    </section>
  );
};

export default index;
