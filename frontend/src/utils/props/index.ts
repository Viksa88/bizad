import { SelectItem } from "../types";

export type AlertProps = {
  message: string;
  variant: string;
};

export type BadgeProps = {
  variant: string;
  text: string;
};

export type BusinessCardProps = {
  name: string;
  image: string;
  address: string;
  description: string;
  phone: string;
  url: string;
};

export type ButtonProps = {
  title: string;
  variant: string;
  isLoading?: boolean;
  onClick?: (e: React.FormEvent) => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export type HeaderProps = {
  title: string;
  subtitle: string;
  isHalfWidth: boolean;
};

export type InputProps = {
  placeholder: string;
  name: string;
  value?: string | undefined;
  error?: string | undefined;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  additionalStyles?: string;
  styles?: {};
};

export type SelectProps = {
  items: SelectItem[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedItem: string;
};
