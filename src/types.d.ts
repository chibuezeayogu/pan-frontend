
export interface Product {
  __typename?:   unknown;
  id:           number;
  image_url:    string;
  title:        string;
  price:        number;
  quantity:     number = 0;    
}
