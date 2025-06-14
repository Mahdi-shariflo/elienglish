import { Product } from '@/types/home';

type PropsgroupAttributesByProperty = {
  attribiutsLookup: {
    color: string;
    image: {
      url: string;
    };
    createdAt: string;
    keyWords: [];
    property: string;
    title: string;
    updatedAt: string;
    url: string;
    __v: 0;
    _id: string;
  }[];
  propertiesLookup: {
    archive: false;
    author: string;
    displayName: string;
    displayType: string;
    title: string;
    url: string;
    _id: string;
  }[];
  children: Product[];
  mainProperty: {
    mainProperty: string;
  }[];
  main?: boolean;
};

export interface ResultAttribute {
  _id: string;
  title: string;
  image?: string | null;
  color?: string;
  product: Product;
}

export interface Result {
  title: string;
  displayType: string;
  attributes: ResultAttribute[];
}

export function groupAttributesByProperty({
  main,
  attribiutsLookup,
  propertiesLookup,
  children,
  mainProperty,
}: PropsgroupAttributesByProperty) {
  // Step 1: Update properties to include their attribiuts
  const updatedProperties = propertiesLookup?.map((property) => {
    const attribiuts = attribiutsLookup.filter((item) => item.property === property._id);
    const checkIsMain = mainProperty.find(
      // @ts-expect-error error
      (item) => item.property === property._id
    );
    return {
      ...property,
      mainProperty: checkIsMain?.mainProperty ? true : false,
      attribiuts,
    };
  });

  // Step 2: Mark properties with isVariable if they are used in children
  const propertiesWithIsVariable = updatedProperties?.map((property) => {
    const isVarible = children.some((child) =>
      child.variables.some((variable) => variable.property === property._id)
    );
    return {
      ...property,
      isVarible,
    };
  });

  if (main) {
    const filterItems = propertiesWithIsVariable?.filter((item) => item.mainProperty === true);
    return filterItems;
  }

  return propertiesWithIsVariable;
}

export function getVariableProductDetails(product: Product): Result[] {
  const resultMap: { [key: string]: Result } = {};

  // Process each child to extract variants
  const variants: Array<{ properties: { [propertyId: string]: any }; product: any }> = [];
  product?.children?.forEach((child) => {
    const variantProperties: { [propertyId: string]: any } = {};
    child.variables?.forEach((variable) => {
      const property = product.propertyLookup.find((p) => p._id === variable.property);
      if (property) {
        variable.attribiute.forEach((attrId) => {
          // @ts-expect-error error
          const attribute = product.attributeLookup.find((a) => a._id === attrId);
          if (attribute) {
            variantProperties[property._id] = {
              ...attribute,
              product: {
                ...product,
                price: child.price,
                count: child.count,
                thumbnailImage: child.thumbnailImage,
                _id: child._id,
                discountPrice: child.discountPrice,
                gtin: child.gtin,
              },
            };
          }
        });
      }
    });
    if (Object.keys(variantProperties).length > 0) {
      variants.push({ properties: variantProperties, product: child });
    }
  });

  // Group attributes by property and ensure uniqueness
  variants.forEach((variant) => {
    Object.keys(variant.properties).forEach((propertyId) => {
      const property = product.propertyLookup.find((p) => p._id === propertyId);
      if (!property) return;

      const attribute = variant.properties[propertyId];
      if (!resultMap[propertyId]) {
        resultMap[propertyId] = {
          displayType: property.displayType,
          title: property.title,
          attributes: [],
          // @ts-expect-error error
          mainVariableProperty: attribute.mainVariableProperty,
        };
      }

      // Check if attribute already exists
      const existingAttr = resultMap[propertyId].attributes.find((a) => a._id === attribute._id);
      if (!existingAttr) {
        resultMap[propertyId].attributes.push({
          _id: attribute._id,
          title: attribute.title,
          image: attribute.image?.url || null,
          color: attribute.color,
          product: attribute.product,
          // @ts-expect-error error
          mainVariableProperty: attribute.mainVariableProperty,
        });
      } else {
        // Update count if any variant has stock
        if (variant.product.count > 0) {
          existingAttr.product.count = Math.max(existingAttr.product.count, variant.product.count);
        }
      }
    });
  });

  return Object.values(resultMap);
}
