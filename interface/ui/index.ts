import { MoreInfo } from "../../components/molecule";
import { NavHoverType } from "../../types";

export interface NavLinkProps {
  id: number;
  title: string;
  link: string;
  customClass?: string;
  hoverType?: NavHoverType;
  isLogin?: boolean;
  isProfile?: boolean;
  isMarketPlace?: boolean;
}

export interface NavMobileProps {
  title: string;
  subLinks?: {
    title: string;
    innerLinks?: {
      link: string;
      href: string;
    }[];
    href?: string;
  }[];
}

export interface SecondaryLinkProps extends NavLinkProps {}

export interface ButtonProps {
  id: number;
  disabled?: boolean;
  title: string;
  onClick: () => void;
  customClass?: string;
  stroke?: boolean;
}

export interface SecondaryHeadingProps {
  title: string;
  customClass?: string;
}

export interface MoreInfoProps {
  heading: string;
  buttonTitle: string;
  headingCustomClass?: string;
  buttonId: number;
}

export interface Heading2Props {
  title: string;
  customClass?: string;
}

export interface PrimaryTextProps extends Heading2Props {};
