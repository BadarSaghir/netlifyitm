import axios from "axios";
import { AxiosRequestConfig, AxiosPromise } from "axios";

import { _products } from "./data";

//
import db from "../fierbase";

import { CLOUD_URL } from "../config";

const TIMEOUT = 100;

//models
import {
  PrintifyProduct,
  ColorOptionValue,
  SizeOptionValue,
} from "../models/PrintifyProduct";

const transformToProduct = (printifydata: PrintifyProduct[] = []) => {
  const getDefaultVarient = (row: PrintifyProduct) => {
    return row.variants.find((variant) => variant.is_default === true);
  };

  const getPictures = (row: PrintifyProduct) => {
    const pictures = [];
    const deafImg = row.images.find((img) => img.is_default === true);
    pictures.push(deafImg.src);
    const otherImages = row.images
      .filter((img) => img.src !== deafImg.src)
      .map((img) => img.src);
    pictures.push(...otherImages);
    return pictures;
  };

  const getImageByVarientID = (row: PrintifyProduct, variantId: number) => {
    return row.images.find((img) => img.variant_ids.includes(variantId)).src;
  };

  const getVarientbyOptionId = (row: PrintifyProduct, optionId: number) => {
    return row.variants.find((variant) => variant.options.includes(optionId));
  };

  const getColorVariants = (row: PrintifyProduct) => {
    const colorOption = row.options.find((opt) => opt.type === "color");
    if (colorOption) {
      const colorOptValues = colorOption.values as ColorOptionValue[];
      console.log("COLOR OPT VALUES", colorOptValues);
      const colorVariants = colorOptValues.map((opt) => ({
        type: "color",
        id: opt.id,
        color: opt.title,
        colorHEX: "#0080ff",
        images: getImageByVarientID(row, getVarientbyOptionId(row, opt.id).id),
      }));
      return colorVariants;
    }
    return [];
  };

  const getSizes = (row: PrintifyProduct) => {
    const sizeOptions = row.options.find((opt) => opt.type === "size");
    if (sizeOptions) {
      const sizeOptValues = sizeOptions.values as SizeOptionValue[];
      const sizes = sizeOptValues.map((val) => val.title);
      return sizes;
    }
    return [];
  };

  const getSizeVariants = (row: PrintifyProduct) => {
    const sizeOptions = row.options.find((opt) => opt.type === "size");
    if (sizeOptions) {
      const sizeOptValues = sizeOptions.values as SizeOptionValue[];
      const sizeVariants = sizeOptValues.map((opt) => ({
        type: "size",
        id: opt.id,
        color: "",
        images: getImageByVarientID(row, getVarientbyOptionId(row, opt.id).id),
      }));
      return sizeVariants;
    }
    return [];
  };

  const getDefaultProductVariant = (row: PrintifyProduct) => {
    const deafVariant = getDefaultVarient(row);
    if (deafVariant.options.length > 1) {
      console.log("ALERT!!!!");
    }
    return {
      type: "default",
      color: "",
      images: getImageByVarientID(row, deafVariant.id),
    };
  };

  const conactVariants = (row) => {
    const sizeVariants = getSizeVariants(row);
    const colorVariants = getColorVariants(row);
    if (colorVariants.length === 0) {
      return [getDefaultProductVariant(row)];
    }
    return colorVariants;
  };

  // const getOtherOptions = (row: PrintifyProduct) => {
  //   const sizeOptions = row.options.find(
  //     (opt) => opt.type !== "size" && opt.type !== "color"
  //   );
  //   console.log("OtherOptions", sizeOptions);
  // };

  return printifydata.map((row) => {
    const defaultVariant = getDefaultVarient(row);

    //(row);

    getDefaultProductVariant(row);

    //getOtherOptions(row);

    const transforemedRow = {
      id: row.id,
      name: row.title,
      price: defaultVariant.price,
      salePrice: 200,
      discount: 0,
      pictures: getPictures(row),
      shortDetails: row.description,
      description: row.description,
      stock: 16,
      new: true,
      sale: true,
      category: "women",
      colors: ["yellow", "gray", "green"],
      size: getSizes(row),
      tags: row.tags,
      rating: 4,
      variants: conactVariants(row),
      options: row.options,
      printifyVariants: row.variants,
    };
    return transforemedRow;
  });
};

// export default {
//   getProducts: (cb, timeout) =>
//     setTimeout(() => cb(_products), timeout || TIMEOUT),
//   buyProducts: (payload, cb, timeout) =>
//     setTimeout(() => cb(), timeout || TIMEOUT),
// };

var _data = {
  external_id: "5f44a6e15aba7e38ec3534ef",
  label: "sheenD shop",
  line_items: [
    {
      sku: "1523489246",
      quantity: 1,
    },
  ],
  shipping_method: 1,
  send_shipping_notification: false,
  address_to: {
    first_name: "John",
    last_name: "Smith",
    email: "example@msn.com",
    phone: "0574 69 21 90",
    country: "US",
    region: "",
    address1: "TEST 121",
    address2: "45",
    city: "Retie",
    zip: "2470",
  },
};

function rand(min, max) {
  let randomNum = Math.random() * (max - min) + min;
  return Math.round(randomNum);
}

export const orderItems = async (cartItems, userData, shippingCost) => {
  console.log("Item In Cart", cartItems);

  const printfulProducts = cartItems.filter(
    (item) => item.product_from === "printful"
  );

  const printifyPrtoducts = cartItems.filter(
    (item) => item.product_from !== "printful"
  );

  if (printifyPrtoducts.length > 0) {
    await orderPrintify(printifyPrtoducts, userData, shippingCost);
  }

  if (printfulProducts.length > 0) {
    await orderPrintful(printfulProducts, userData, shippingCost);
  }
};

export const getShippingCost = async (cartItems, userData) => {
  let cost = 0;

  const printfulProducts = cartItems.filter(
    (item) => item.product_from === "printful"
  );

  const printifyPrtoducts = cartItems.filter(
    (item) => item.product_from !== "printful"
  );

  if (printifyPrtoducts.length > 0) {
    const printifyCostResponse = await getPrintifyShippingCost(
      printifyPrtoducts,
      userData
    );
    const costObj = printifyCostResponse.data;
    cost += +costObj[Object.keys(costObj)[0]] / 100;
  }

  if (printfulProducts.length > 0) {
    const printfulCostResponse = await getPrintfulShippingCost(
      printfulProducts,
      userData
    );
    const costObj = printfulCostResponse.data;
    cost += +costObj.result[0].rate;
  }

  return cost;
};

export const getPrintifyShippingCost = async (printifyPrtoducts, userData) => {
  const skuObjs = printifyPrtoducts.map((item) => ({
    sku: item.SKU,
    quantity: item.qty,
  }));

  console.log("SKU OBJS", skuObjs);

  const {
    first_name,
    last_name,
    email,
    phone,
    country,
    address,
    city,
    state,
    pincode,
  } = userData;

  const userInfo = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    phone: phone,
    country: country,
    address1: address,
    region: state,
    city: city,
    zip: pincode,
  };

  const updatedData = {
    line_items: skuObjs,
    address_to: userInfo,
  };

  return axios.post(`${CLOUD_URL}/calculatePrintifyShippingCost`, {
    orderData: updatedData,
  });
};

export const getPrintfulShippingCost = async (printfulProducts, userData) => {
  function _getVariantIDBySyncVariant(item, syncVariantID) {
    const sku = item.printfulVariants.find((vari) => vari.id === syncVariantID)
      .sku;
    return item.skuVariants.find((variant) => variant.sku === sku).id;
  }

  const skuObjs = printfulProducts.map((item) => ({
    variant_id: _getVariantIDBySyncVariant(item, item.SKU),
    quantity: item.qty,
  }));

  console.log("SKU OBJS", skuObjs);

  const {
    first_name,
    last_name,
    email,
    phone,
    country,
    address,
    city,
    state,
    pincode,
  } = userData;

  const userInfo = {
    address1: "19749 Dearborn St",
    city: "Chatsworth",
    country_code: "US",
    state_code: "CA",
    zip: 91311,
  };

  const updatedData = {
    items: skuObjs,
    recipient: userInfo,
  };

  return axios.post(`${CLOUD_URL}/calculatePrintfulShippingCost`, {
    orderData: updatedData,
  });
};

export const orderPrintify = async (
  printifyPrtoducts,
  userData,
  shippingCost
) => {
  const skuObjs = printifyPrtoducts.map((item) => ({
    sku: item.SKU,
    quantity: item.qty,
  }));

  console.log("SKU OBJS", skuObjs);

  const {
    first_name,
    last_name,
    email,
    phone,
    country,
    addressL1,
    addressL2,
    city,
    state,
    pincode,
  } = userData;

  const userInfo = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    phone: phone,
    country: country,
    address1: addressL2 ? addressL1 + " " + addressL2 : addressL1,
    region: state,
    city: city,
    zip: pincode,
  };

  console.log("Check out state", userData);

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const updatedData = {
    external_id: makeid(32),
    line_items: skuObjs,
    address_to: userInfo,
    shipping_method: 1,
    send_shipping_notification: true,
  };

  axios
    .post(`${CLOUD_URL}/orderPrintify`, {
      orderData: updatedData,
      userInfo: userInfo,
      shippingCost,
      products: printifyPrtoducts,
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};

//Printful Order
export const orderPrintful = async (
  printfulProducts,
  userData,
  shippingCost
) => {
  const skuObjs = printfulProducts.map((item) => ({
    sync_variant_id: item.SKU,
    quantity: item.qty,
  }));

  console.log("SKU OBJS", skuObjs);

  const {
    first_name,
    last_name,
    email,
    phone,
    country,
    addressL1,
    addressL2,
    city,
    state,
    pincode,
  } = userData;

  const userInfoData = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    phone: phone,
    country: country,
    address1: addressL2 ? addressL1 + " " + addressL2 : addressL1,
    region: state,
    city: city,
    zip: pincode,
  };

  const userInfo = {
    address1: addressL2 ? addressL1 + " " + addressL2 : addressL1,
    city: city,
    country_code: "US",
    state_code: state,
    zip: pincode,
  };

  console.log("Check out state", userData);

  // address1: "19749 Dearborn St",
  // city: "Chatsworth",
  // country_code: "US",
  // state_code: "CA",
  // zip: 91311,

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const updatedData = {
    items: skuObjs,
    recipient: userInfo,
  };

  axios
    .post(`${CLOUD_URL}/orderPrintful`, {
      orderData: updatedData,
      userInfo: userInfoData,
      products: printfulProducts,
      shippingCost,
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const loadProducts = async (lastDoc = null) => {
  const productRef = db
    .collection("products")
    .orderBy("orderIndex")
    .startAfter(lastDoc || 0)
    .limit(1000);
  const snapshot = await productRef.get();
  const products: any[] = [];
  snapshot.forEach((doc: any) => {
    products.push(doc.data());
  });
  return products;
};

export default {
  getProductsNew: () => {
    return axios.get(`${CLOUD_URL}/getProducts`);
  },

  buyProducts: (payload, cb, timeout = 100) =>
    setTimeout(() => cb(), timeout || TIMEOUT),

  orderPrintify: orderPrintify,

  loadProducts: loadProducts,
};

export const getAllPrintfulCountries = async () => {
  return axios.get(`${CLOUD_URL}/getCountries`);
};

//get customer products by email
export const getCustomerOrdersByEmail = async (email) => {
  console.log("Getting customer orders");
  var orderRef = db.collection("orders");
  var result = await orderRef
    .where("email", "==", email)
    .orderBy("created", "desc")
    .get();
  const orders = [];
  result.forEach(function(doc) {
    const products = doc.data().products;
    const order = doc.data();
    const transProducts = products.map((product) => {
      return {
        ...product,
        orderID: order.id,
        orderDate: order.created.toDate(),
        shippingCost: order.shippingCost,
        orderStatus: order.status,
      };
    });
    orders.push(...transProducts);
  });
  console.log("Orders", orders);
  return orders;
};
