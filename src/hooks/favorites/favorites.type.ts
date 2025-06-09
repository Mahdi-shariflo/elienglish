export interface Favorites {
  id: string;
  isFavorite: boolean;
}

export interface FavoriteItem {
  firstName: string;
  lastName: string;
  _id: string;
  favoriteProducts: IFavoriteProducts[];
}

export interface IFavoriteProducts {
  count: number;
  discountPrice: number;
  discountTime: string;
  price: number;
  thumbnailImage: IThumbnailImage;
  title: string;
  url: string;
  _id: string;
}

export interface IThumbnailImage {
  _id: string;
  url: string;
  title: string;
}

export interface IResponseData {
  favoriteProducts: IFavoriteProducts[];
}
