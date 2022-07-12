interface printifyExternal {
  id: string;
  handle: string;
}

interface PrintifyImgs {
  is_default: boolean;
  position: string;
  src: string;
  variant_ids: number[];
}

export interface ColorOptionValue {
  colors: string[];
  id: number;
  title: string;
}

export interface SizeOptionValue {
  id: number;
  title: string;
}

interface PrintifyOptions {
  name: string;
  type: string;
  values: ColorOptionValue[] | SizeOptionValue[];
}

interface PrintifyVarients {
  cost: number;
  grams: number;
  id: number;
  is_available: boolean;
  is_default: boolean;
  is_enabled: boolean;
  options: number[];
  price: number;
  quantity: number;
  sku: string;
  title: string;
}

export interface PrintifyProduct {
  blueprint_id: string;
  created_at: string;
  description: string;
  external: printifyExternal;
  id: string;
  images: PrintifyImgs[];
  is_locked: boolean;
  options: PrintifyOptions[];
  print_areas: [];
  print_details: [];
  print_provider_id: number;
  sales_channel_properties: [];
  shop_id: number;
  tags: string[];
  title: string;
  updated_at: string;
  user_id: number;
  variants: PrintifyVarients[];
  visible: true;
}
