type categoryType = {
  _id: string;
  name: string;
};

type ImageType = {
    _id: string;
    url: string;
    publicId: string;
    primary: boolean;
    refModel: string;
    refId: string;
    createdAt: string;
    updatedAt: string;
  };

export interface INewArrival {
  _id: string;
  name: string;
  category: categoryType;
  images: ImageType;
}
