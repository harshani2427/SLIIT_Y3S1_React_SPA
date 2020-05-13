import React, {useContext, useState,useEffect} from "react";
import {Formik} from "formik";
import {Button, Col, Form, Spinner} from "react-bootstrap";
import * as yup from "yup";
import {FaSignInAlt} from "react-icons/fa";
import {AppContext} from "../../Context/app-context";
import {Link} from "react-router-dom";

import "./add-pay-card-details-styles.scss";

const schema = yup.object().shape({
  cardType: yup
    .string()
    .min(2, " cardType must have at least 2 characters")
    .required("Enter the card type"),

    cardNumber: yup
    .string()
    .min(2, "card number must have at least 2 characters")
    .required("Enter the card number"),

});


const AddPayCardDetails = props => {
  const appContext = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [payCardDetails, setPayCardDetails] = useState({
    email:"",
    cardType: "",
    cardNumber: "",
    isSave: false
  });

  var payCard;
  var currentEmail ;

  useEffect(() => {
    console.log(payCardDetails);
    payCard = payCardDetails;
    
  }, [payCardDetails]);

  console.log(currentEmail);
  const onSubmitHandle = async (values, {setSubmitting}) => {
    
    console.log("Ane manda");
    console.log(values);
    setLoading(true);

    appContext.currentUser.forEach(user => {
      currentEmail = user.email;
      console.log(currentEmail);
      setPayCardDetails({...values, email:currentEmail});
    });

    payCard = {...values, email:currentEmail};
   
    console.log("Ane manda Bn");
    console.log(currentEmail);
    console.log(payCard);
   

    try {
      if(values.isSave){
        appContext.addPayCardDetails(payCard);
      }
      const response = await fetch("http://localhost:5000/payments/pay-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payCard)
      });

      const responseData = await response.json();
      console.log(responseData);
      if (!responseData.save) {
        setError("lol");
        
        throw new Error(responseData.message);
      }

      //appContext.login();
      setLoading(false);
      console.log(responseData);
    } catch (errorss) {
      console.log(errorss);
      setLoading(false);
      setError(errorss.message || "Something went wrong, try again later");
    }

  
  };

  return (
    <React.Fragment>
      <div className="addPayCardDetailsFormHead">
        <Formik
          validationSchema={schema}
          onSubmit={onSubmitHandle}
          initialValues={payCardDetails}
        >
          {({
              handleSubmit,
              isSubmitting,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors
            }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Row><Form.Label><h1>Card Details</h1></Form.Label></Form.Row>
             

              <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationFormik04">
                  <Form.Label>Card Type</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Card Type"
                    name="cardType"
                    value={values.cardType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.cardType && errors.cardType}
                    isValid={touched.cardType && !errors.cardType}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cardType}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12" controlId="validationFormik04">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Card Number"
                    name="cardNumber"
                    value={values.cardNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.cardNumber && errors.cardNumber}
                    isValid={touched.cardNumber && !errors.cardNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cardNumber}
                  </Form.Control.Feedback>
                </Form.Group>

                </Form.Row>

              <Form.Row>
              <Form.Group as={Col} md="12" controlId="validationFormik04">
               <Form.Control
                    type="checkbox"
                    name="isSave" 
                    value={values.isSave }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.isSave  && errors.isSave }
                    isValid={touched.isSave  && !errors.isSave }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.isSave }
                  </Form.Control.Feedback>

                  <Form.Label>Save for future</Form.Label>
               </Form.Group>

             

              </Form.Row>

         
              <Button
                type="submit"
                disabled={isSubmitting}
                style={{marginTop: "5px", marginRight: "5px"}}
              >
                Confirm
              </Button>

              <Link to="/">
              <Button
                type="reset"
                disabled={isSubmitting}
                style={{marginTop: "5px", marginRight: "5px"}}
              >
                Cancel
              </Button>
              </Link>

            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default AddPayCardDetails ;
