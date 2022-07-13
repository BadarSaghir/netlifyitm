// Get Unique Brands from Json Data
export const getBrands = (products) => {
  var uniqueBrands = [];
  products.map((product, index) => {
    if (product.tags) {
      product.tags.map((tag) => {
        if (uniqueBrands.indexOf(tag) === -1) {
          uniqueBrands.push(tag);
        }
      });
    }
  });
  //console.log(uniqueBrands)
  return uniqueBrands;
};

// Get Unique Colors from Json Data
export const getColors = (products) => {
  var uniqueColors = [];
  products.map((product, index) => {
    if (product.colors) {
      product.colors.map((color) => {
        if (uniqueColors.indexOf(color) === -1) {
          uniqueColors.push(color);
        }
      });
    }
  });
  //console.log(uniqueBrands)
  return uniqueColors;
};

// Get Minimum and Maximum Prices from Json Data
export const getMinMaxPrice = (products) => {
  let min = 100,
    max = 1000;

  products.map((product, index) => {
    let v = product.price;
    min = v < min ? v : min;
    max = v > max ? v : max;
  });

  return { min: min, max: max };
};

export const getVisibleproducts = (data, { brand, color, value, sortBy }) => {
  data.products.sort((product1, product2) => {
    if (sortBy === "HighToLow") {
      console.log(product2.price < product1.price);
      return product2.price < product1.price ? -1 : 1;
    } else if (sortBy === "LowToHigh") {
      return product2.price > product1.price ? -1 : 1;
    } else if (sortBy === "Newest") {
      return product2.id < product1.id ? -1 : 1;
    } else if (sortBy === "AscOrder") {
      return product1.name.localeCompare(product2.name);
    } else if (sortBy === "DescOrder") {
      return product2.name.localeCompare(product1.name);
    } else {
      return 0;
    }
  });
  return [...data.products];
};

export const getCartTotal = (cartItems) => {
  var total = 0;
  for (var i = 0; i < cartItems.length; i++) {
    total +=
      parseFloat(cartItems[i].qty) *
      //parseInt((cartItems[i].price * cartItems[i].discount) / 100, 10);
      parseFloat((cartItems[i].price - cartItems[i].discount).toFixed(2));
  }
  return total;
};

// Get Trending Tag wise Collection
export const getTrendingTagCollection = (products, type, tag) => {
  const items = products.filter((product) => {
    return product.category === type && product.tags.includes(tag);
  });
  return items.slice(0, 8);
};

// Get Trending Collection
export const getTrendingCollection = (products) => {
  const items = products.filter((product) => {
    return product.topItem === true;
  });
  return items.slice(0, 8);
};

// Get Special 5 Collection
export const getSpecialCollection = (products, type) => {
  const items = products.filter((product) => {
    return product.category === type;
  });
  return items.slice(0, 5);
};

// Get TOP Collection
export const getTopCollection = (products) => {
  const items = products.filter((product) => {
    return product.rating > 4;
  });
  return items.slice(0, 8);
};

// Get New Products
export const getNewProducts = (products, type) => {
  const items = products.filter((product) => {
    return product.new === true && product.category === type;
  });

  return items.slice(0, 8);
};

// Get Related Items
export const getRelatedItems = (products, type) => {
  const items = products.filter((product) => {
    return product.category === type;
  });

  return items.slice(0, 4);
};

// Get Best Seller Furniture
export const getBestSellerProducts = (products, type) => {
  const items = products.filter((product) => {
    return product.sale === true && product.category === type;
  });

  return items.slice(0, 8);
};

// Get Best Seller
export const getBestSeller = (products) => {
  const items = products.filter((product) => {
    return product.new === true;
  });

  return items.slice(0, 8);
};

// Get Mens Wear
export const getMensWear = (products) => {
  const items = products.filter((product) => {
    return product.forMen === true;
  });

  return items.slice(0, 8);
};

// Get Womens Wear
export const getWomensWear = (products) => {
  const items = products.filter((product) => {
    return product.forWomen === true;
  });

  return items.slice(0, 8);
};

// Get Single Product
export const getSingleItem = (products, id) => {
  const items = products.find((element) => {
    return element.id === id;
  });
  return items;
};

// Get Feature Products
export const getFeatureImages = (products, type) => {
  const items = products.filter((product) => {
    return product.type === type;
  });
  return items;
};

export const getPrintifySizeOptionByTitle = (item, size) => {
  const sizeOptions = item.options.find((opt) => opt.type === "size").values;
  const sizeOptValue = sizeOptions.find((opt) => opt.title === size);
  return sizeOptValue ? sizeOptValue.id : null;
};

export const getPrintifySKUByOptions = (item, sizeID, colorID) => {
  if (!colorID && item.variants[0].type === "color") {
    colorID = item.variants[0].id;
    console.log("Default color ID", colorID);
  }
  if (!sizeID) {
    sizeID = getPrintifySizeOptionByTitle(item, item.size[0]);
  }
  let vari = item.printifyVariants.find(
    (vari) => vari.options.includes(sizeID) && vari.options.includes(colorID)
  );
  if (!vari && sizeID) {
    vari = item.printifyVariants.find((vari) => vari.options.includes(sizeID));
  }
  if (!vari && colorID) {
    vari = item.printifyVariants.find((vari) => vari.options.includes(colorID));
  }
  return vari ? vari.sku : null;
};

const getPrintfulSyncVariantID = (
  item,
  sizeName: string,
  colorName: string
) => {
  console.log("********************************************************************")
  console.log("********************************************************************")
  console.log("********************************************************************")

  
  console.log(`size name=${sizeName},colorName${colorName}`)

  console.log("********************************************************************")
  console.log("********************************************************************")
  console.log("********************************************************************")
  console.log("********************************************************************")
  console.log("***************************item=",item,"*****************************************")
  console.log("********************************************************************")
  console.log("********************************************************************")
  console.log("********************************************************************")
  console.log("********************************************************************")
  console.log("***************************",item.variants,"*****************************************")
  console.log("********************************************************************")
  console.log("********************************************************************")
  console.log("********************************************************************")
  console.log("********************************************************************")

  let sku=null
  if (!colorName && item.variants[0].type === "color") {
    colorName = item.variants[0].color;
    console.log("Default color ID", colorName);
  }
  if (!sizeName || item.skuVariants.length===1) {
    // sizeName = item.skuVariants[0].size;
    sku = item.skuVariants[0].sku;
  }else{
    sku = item.skuVariants.find(
      (variant) => variant.size === sizeName && variant.color === colorName
    ).sku;
    //   sku = item.skuVariants.find(
    //   (variant) =>  variant.color === colorName
    // ).sku;
    }
    // sku = item.skuVariants.find(
    //   (variant) => variant.size === sizeName && variant.color === colorName
    // ).sku;
  
  

  return item.printfulVariants.find((vari) => vari.sku === sku).id;
};

export const onSelctColor = (item, index) => {
  if (item.product_from === "printful") {
    const col = item.variants.filter(
      (v, i, a) => a.findIndex((t) => t.color === v.color) === i
    );
    return col[index].color;
  } else {
    const colorVariants = item.variants.filter((vari) => vari.type === "color");
    if (colorVariants.length > index) {
      return colorVariants[index].id;
    }
  }
};

//colorID can be a number for printify, string for printful
export const getActiveSKU = (item, size, colorID) => {
  if (item.product_from === "printful") {
    return getPrintfulSyncVariantID(item, size, colorID);
  } else {
    const sizeID = getPrintifySizeOptionByTitle(item, size);
    return getPrintifySKUByOptions(item, sizeID, colorID);
  }
};

export const getItemDiscriptionList = (item) => {
  const str = item.description;
  if (item.product_from === "printful") {
    const regex = /•\s[^\r]*/g;
    const res = str.match(regex);
    const cleanedRes = res.map((str) => str.replace("• ", ""));
    return cleanedRes;
  } else {
    const regex = /\.[:]\s[^<]*/g;
    const res = str.match(regex);
    const cleanedRes = res.map((str) => str.replace(".: ", ""));
    return cleanedRes;
  }
};
