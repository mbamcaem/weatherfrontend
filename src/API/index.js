const REACT_APP_APITOKEN = process.env.REACT_APP_APITOKEN;
const REACT_APP_USEREMAIL = process.env.REACT_APP_USEREMAIL;
const REACT_APP_UNIVERSALTOKEN = process.env.REACT_APP_UNIVERSALTOKEN;
const REACT_APP_TOKEN_BEARER = process.env.REACT_APP_TOKEN_BEARER;


export const fetchToken = async () => {
 
  let config = {
    method: "get",
    maxBodyLength: Infinity,
   
    headers: {
      "api-token": REACT_APP_APITOKEN,
      "user-email": REACT_APP_USEREMAIL,
    },
  };

  const res = await fetch(
    `${REACT_APP_UNIVERSALTOKEN}/api/getaccesstoken`,
    config
  );
  return res.json();
};
export const fetchCountry = async () => {   
    const options = {
      headers: {
        Authorization: REACT_APP_TOKEN_BEARER,
      },
    };
    const result = fetch(`${REACT_APP_UNIVERSALTOKEN}/api/countries`, options);
   
    return (await result).json();
    
    
};
export const fetchState = async (country) => {   
  const options = {
    headers: {
      Authorization: REACT_APP_TOKEN_BEARER,
    },
  };
  const result = fetch(`${REACT_APP_UNIVERSALTOKEN}/api/states/${country}`, options);
 
  return (await result).json();
  
  
};
export const fetchCity = async (city) => {   
  const options = {
    headers: {
      Authorization: REACT_APP_TOKEN_BEARER,
    },
  };
  const result = fetch(`${REACT_APP_UNIVERSALTOKEN}/api/cities/${city}`, options);
 
  return (await result).json();
  
  
};