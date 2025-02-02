export interface IPostUser {
  username: string;
  personal_name: string;
  email: string;
  phone: string;
  document: string;
  birth: string;
}

export interface IPostAddress {
  postal_code: string,
  street: string,
  neighborhood: string,
  city: string,
  state: string,
  country: string,
  number: number,
  user_id: string,
  main: boolean
}