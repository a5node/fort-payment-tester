import React, { useState } from "react"; 
import { useNavigate} from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css"; 
import Button from "react-bootstrap/Button"; 
import Card from "react-bootstrap/Card"; 
import { loadStripe } from "@stripe/stripe-js"; 

function StripePayment() { 
    const [product, setProduct] = useState({ 
      name: "Mint FORT for 100", 
      price: 1000, 
      code: "FORTMNTFAT1000",
      productOwner: "FORT NFT", 
      description: "Fiat payment for 1000 units.", 
      quantity: 1, 
    }); 

    const makePayment = async () => { 
        const stripe = await loadStripe(process.env.STRIPE_PUBLISHABLE_KEY); 
        const body = { product }; 
        const headers = { 
          "Content-Type": "application/json", 
        }; 
     
        const response = await fetch( 
          "http://localhost:8000/api/create-checkout-session", 
          { 
            method: "POST", 
            headers: headers, 
            body: JSON.stringify(body), 
          } 
        ); 
     
        const session = await response.json(); 
     
        const result = stripe.redirectToCheckout({ 
          sessionId: session.id, 
        }); 
     
        if (result.error) { 
          console.log(result.error); 
        } 
      }; 

      const navigate = useNavigate();

      const navigateToHelp = () => {
        // 👇️ navigate to /
        navigate('/help');
      };
  
    return ( 
        <Card style={{ width: "20rem" }}> 
          <Card.Img 
            variant="top" src="logo512.png" 
          /> 
          <Card.Body> 
            <Card.Title>{product.name}</Card.Title> 
            <Card.Text>{product.description}</Card.Text> 
            <Button variant="primary" onClick={makePayment}> 
              Buy Now for {product.price} 
            </Button> 
            &nbsp;&nbsp;
            <Button onClick={navigateToHelp}> 
              Help
            </Button> 
          </Card.Body> 
        </Card> 
      ); 
} 
  export default StripePayment; 