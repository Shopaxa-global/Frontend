import { MoreInfo } from "../../components/molecule";

export interface NavLinkProps {
  id: number;
  title: string;
  link: string;
  customClass?: string;
}

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
