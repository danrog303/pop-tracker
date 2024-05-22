import SubcategoryType from "./subcategory-type.enum";
import {UserDetails} from "./user-details.model";
import UserProfile from "./user-profile.model";
import {Game} from "./game.model";
import {Book} from "./book.model";
import {Movie} from "./movie.model";

export default interface Subcategory {
  subcategoryId: string;
  type: SubcategoryType;
  name: string;
  owner?: UserProfile;
}
