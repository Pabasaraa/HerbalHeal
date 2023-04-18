import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

//import css file from style sheets directory
import styles from "./styles/checkout.module.css";

const Checkout = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = () => {
    console.log("retrieveData");
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <div className={styles.flexContainer}>
          <div className={styles.flexChild}>
            <div className={styles.inputContainer}>
              <p className={`text-center margin-bottom ${styles.headertext}`}>
                Checkout
              </p>
              <form className="formt" style={{ margin: "0px 50px 0px 50px" }}>
                <div className="row" style={{ marginTop: "15px" }}>
                  <div className="form-group">
                    <label
                      for="inputCard"
                      className={styles.label}
                      style={{ marginBottom: "10px" }}
                    >
                      Card Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputCard"
                      pattern="\d*"
                      placeholder="Card Number"
                      defaultValue={data.card_num}
                      style={{ paddingLeft: "15px" }}
                    />
                  </div>
                </div>
                <div className="row" style={{ marginTop: "15px" }}>
                  <div className="form-group col-md-4">
                    <label
                      for="inputCard"
                      className={styles.label}
                      style={{ marginBottom: "10px" }}
                    >
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputExpiryDate"
                      placeholder="Expiry Date"
                      defaultValue={data.expiry_date}
                      style={{ paddingLeft: "15px" }}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label
                      for="inputCard"
                      className={styles.label}
                      style={{ marginBottom: "10px" }}
                    >
                      CVV
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputCvv"
                      placeholder="Cvv"
                      defaultValue={data.cvv}
                      style={{ paddingLeft: "15px" }}
                    />
                  </div>
                </div>
                <div className="mt-4 mb-4">
                  <div className="row" style={{ marginTop: "15px" }}>
                    <div className="form-group">
                      <label
                        for="inputCard"
                        className={styles.label}
                        style={{ marginBottom: "10px" }}
                      >
                        Street Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputStreet"
                        placeholder="Street Address"
                        defaultValue={data.street_address}
                        style={{ paddingLeft: "15px" }}
                      />
                    </div>
                  </div>
                  <div className="row" style={{ marginTop: "15px" }}>
                    <div className={`form-group`}>
                      <label
                        for="inputCard"
                        className={styles.label}
                        style={{ marginBottom: "10px" }}
                      >
                        Country
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputCountry"
                        placeholder="Country"
                        defaultValue={data.country}
                        style={{ paddingLeft: "15px" }}
                      />
                    </div>
                  </div>
                  <div className="row" style={{ marginTop: "15px" }}>
                    <div className="form-group">
                      <label
                        for="inputCard"
                        className={styles.label}
                        style={{ marginBottom: "10px" }}
                      >
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputCard"
                        pattern="\d*"
                        placeholder="City"
                        defaultValue={data.city}
                        style={{ paddingLeft: "15px" }}
                      />
                    </div>
                  </div>
                  <div
                    className="row"
                    style={{ marginTop: "15px", marginBottom: "55px" }}
                  >
                    <div className="form-group col-md-6">
                      <label
                        for="inputCard"
                        className={styles.label}
                        style={{ marginBottom: "10px" }}
                      >
                        State
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputExpiryDate"
                        placeholder="State"
                        defaultValue={data.state}
                        style={{ paddingLeft: "15px" }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label
                        for="inputCard"
                        className={styles.label}
                        style={{ marginBottom: "10px" }}
                      >
                        Zip Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputCvv"
                        placeholder="Zip"
                        defaultValue={data.zip_code}
                        style={{ paddingLeft: "15px" }}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div
            className={styles.flexChild}
            style={{ backgroundColor: "white" }}
          >
            <div className={styles.summaryMainContainer}>
              <h4 style={{ color: "#191818", marginBottom: "45px" }}>
                Order Summary
              </h4>
              <div
                className={`${styles.summaryContainer} ${styles.summaryElements}`}
              >
                <div className={styles.summaryChild}>
                  <h6>Saprin Beach Resort</h6>
                </div>
                <div>
                  <h6>LKR 8,585</h6>
                </div>
              </div>
              <div
                className={`${styles.summaryContainer} ${styles.summaryElements}`}
              >
                <div className={styles.summaryChild}>
                  <h6>Service Charge</h6>
                </div>
                <div>
                  <h6>LKR 430</h6>
                </div>
              </div>
              <hr
                className={styles.divider}
                style={{ margin: "25px 10px 25px 10px" }}
              />
              <div
                className={`${styles.summaryContainer} ${styles.summaryElements}`}
              >
                <div className={styles.summaryChild}>
                  <h6>Sub Total</h6>
                </div>
                <div>
                  <h6>LKR 9,015</h6>
                </div>
              </div>
              <div className="text-center">
                <button className={styles.payBtn}>Pay</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
