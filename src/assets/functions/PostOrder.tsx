import { SubmitHandler } from "react-hook-form";

const postOrder = async (data:any, qtd: number, price:number, shipping: number) =>{
    localStorage.removeItem('selectedCheckboxValues');
    localStorage.removeItem('selectedstepTwoValue');
    const date = new Date(); 
    const createdDate = `${date.getHours()}:${date.getMinutes()}`
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({order: 'açaí',
      quantity: qtd,
      createdDate,
      product: {  
        size: data.stepOne.size, 
        flavor: data.stepTwo.flavor, 
        options: data.stepThree.options, 
        price: price + shipping
      }})
  };
  await fetch('https://655d34699f1e1093c5991bf6.mockapi.io/api/v1/order', requestOptions)
      .then(response => response.json())
      .then(resp => resp );
  };

  export default postOrder