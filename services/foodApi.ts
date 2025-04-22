import axios from 'axios';

const BASE_URL = 'https://world.openfoodfacts.org/api/v2';

const removeDuplicates = (products: any[]) => {
  const seen = new Set();
  return products.filter((product) => {
    if (!product.code || seen.has(product.code)) {
      return false;
    }
    seen.add(product.code);
    return true;
  });
};

export const searchProducts = async (query: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        categories_tags_en: query,
        fields: 'code,product_name,brands,stores,image_url',
        sort_by: 'popularity', 
        page_size: 10, 
        json: 1
      }
    });

    if (!response.data.products) {
      return [];
    }

    return removeDuplicates(response.data.products).map((product: any) => ({
      id: product.code,
      name: product.product_name || 'Nieznany produkt',
      store: product.stores || 'Nieznany sklep',
      price: Math.floor(Math.random() * 20) + 5,
      image: product.image_url || 'https://via.placeholder.com/150',
      purchased: false
    }));
  } catch (error) {
    console.error('Błąd pobierania danych z API:', error);
    return [];
  }
};
