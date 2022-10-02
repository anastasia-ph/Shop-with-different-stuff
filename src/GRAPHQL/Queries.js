import { gql } from "@apollo/client";
export const GET_CURRENCIES = gql`
query{
 currencies {
    label
    symbol
}
}
`;
export const GET_CATEGORIES = gql`
query{
    categories{
      name
    }
  }`

export const GET_PRODUCTS_BY_CATEGORY = gql`
query getCategoriesFilter($title:String!){
  category(input:{title:$title}){
    name
    products{
      id
      inStock
      name
      gallery
      prices {
        currency{
          symbol
        }
        amount
      }
    }
  }
}`

export const GET_ATTRIBUTES_BY_ID = gql`query getAttributesById($id:String!){
  product(id:$id){
    brand
    id
    gallery
    inStock
    name
    description
    attributes{
      name
      type
      items{
        displayValue
        value
        id
      } 
    }
    prices{
        currency{
          label
          symbol
        }
        amount
      }
  }
}`