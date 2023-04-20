import axios from 'axios'
import React, { useContext, useEffect, useState 
    // useNavigate
} from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route, Redirect,
    // Navigate
  } from "react-router-dom";
import { NavLink, useParams,useNavigate} from 'react-router-dom'
import { updatedata } from './context/ContextProvider'



const UpdateItem = () => {

   const {setUPdata} = useContext(updatedata)

   const navigate = useNavigate("");

    const [inpval, setINP] = useState({
       userId:"",
       username:"",
       itemName:"",
       itemDescription:"",
       itemPrice:"",
       itemImages:""
      
    });

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }


    const { id } = useParams("");
    console.log(id);



    const getdata = async () => {

        const res = await fetch(`http://localhost:8000/items/get/one/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data.items);//must be change
        

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setINP(data.items)//must be change
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
        console.log("test inpval",inpval);
    }, []);


    const updateItem = async(e)=>{
        e.preventDefault();

        const {
        userId,
        username,
        itemName,
        itemDescription,
        itemPrice,
        itemImages } = inpval;

        const res2 = await fetch(`http://localhost:9090/admin/update/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                userId,
                username,
                itemName,
                itemDescription,
                itemPrice,
                itemImages
            })
        });

        const data2 = await res2.json();
        console.log(data2);
        alert("Do you want to edit that data?");
        if(res2.status === 422 || !data2){
            alert("fill the data");
        }else{
            navigate("/itemList")
            setUPdata(data2);
        }

    }



    
        return(
            <div className="container">
          
                
                <h2 className="h-tag"><i class="fa-solid fa-pen-to-square"></i> Update Item details</h2>
                <div className="input-form">
                <form className="forms" noValidate>

                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>User ID :</label>&nbsp;<br></br>
                        <input type="text"
                        className="inputcell"
                        name="userId"
                        placeholder="Enter your userId"
                        value={inpval.userId}
                        onChange={setdata}/>
                    </div>

                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}> Username :</label>&nbsp;<br></br>
                        <input type="text"
                        className="inputcell"
                        name="username"
                        placeholder="Enter Username"
                        value={inpval.username}
                        onChange={setdata}/>
                    </div>

                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>Item Name :</label>&nbsp;<br></br>
                        <input type="text"
                        className="inputcell"
                        name="itemName"
                        placeholder="Enter Item Name"
                        value={inpval.itemName}
                        onChange={setdata}/>
                    </div>

                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>Item Description :</label>&nbsp;<br></br>
                        <input type="text"
                        className="inputcell"
                        name="itemDescription"
                        placeholder="Enter Item Description"
                        value={inpval.itemDescription}
                        onChange={setdata}/>
                    </div>

                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}> itemPrice :</label>&nbsp;<br></br>
                        <input type="text"
                        className="inputcell"
                        name="itemPrice"
                        placeholder="Enter itemPrice"
                        value={inpval.itemPrice}
                        onChange={setdata}/>
                    </div>

                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>Item Images :</label>&nbsp;<br></br>
                        <input type="file"
                        className="inputcell"
                        name="itemImages"
                        placeholder="Enter Item Images"
                        value={inpval.itemImages}
                        onChange={setdata}/>
                    </div>

                  

                    <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={updateItem} >
                        <i className="far fa-check-square"></i>
                        &nbsp; Save
                    </button>

                </form>
                </div>
            </div>
            
        )
    }

export default UpdateItem;

