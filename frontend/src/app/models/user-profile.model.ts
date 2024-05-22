import Subcategory from "./subcategory.model";

export default interface UserProfile {
  userId: string;

  nickname: string;

  subcategories: Subcategory[];
}
