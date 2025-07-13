import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";

interface Props {
  onSubmit: (arg0: any) => void;
  text: string;
  disabled: boolean;
  extraStyle?: string;
  loading?: boolean;
}

const FormButton = ({
  disabled,
  onSubmit,
  text,
  extraStyle,
  loading,
}: Props) => {
  return (
    <Button
      type="primary"
      onClick={onSubmit}
      disabled={disabled}
      style={{
        width: "100%",
        height: "51px",
        borderRadius: "5px",
        backgroundColor: disabled ? "#B0B0B0" : "#212121",
        border: "none",
        color: "white",
        fontSize: "13px",
      }}
      className={`font-HM-Sans font-normal ${extraStyle} `}
    >
      {loading ? (
        <Spin indicator={<LoadingOutlined spin />} size="default" className="text-white" />
      ) : (
        text
      )}
    </Button>
  );
};

export default FormButton;
