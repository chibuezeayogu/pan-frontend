import { gql } from '@apollo/client';

export const LOAD_PRODUCTS = gql`
  query Products($currency: Currency) {
    products {
      id
      title
      image_url
      price (currency: $currency)
    }
  }
`;


export const LOAD_CURRENCY = gql`
  query {
    currency
  }
`
