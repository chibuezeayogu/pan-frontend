
export interface Product {
  __typename:   string;
  id:           number;
  image_url:    string;
  title:        string;
  price:        number;
  quantity?:     number = 0;    
  addedToCart?:  boolean = false;
}
