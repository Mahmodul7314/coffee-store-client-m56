/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SignIn from "./SignIn";


const CoffeeCard = ({coffee,coffees,setCoffees}) => {

    const {_id,name,quantity,supplier,taste,category,details,photo} = coffee;
   
   
    const handleDelete =_id =>{
       console.log(_id) 
       Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          
       
       fetch(`http://localhost:5000/coffee/${_id}`,{
        method:'DELETE'
       })
       .then(res => res.json())
       .then(data =>{
        console.log(data);
        if(data.deletedCount > 0){
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
                )
              const remaining = coffees.filter(cof => cof._id !== _id);
              setCoffees(remaining);
        }
       })

        }
      })
    }
    
    return (
        <div>
            
            <div className="card card-side bg-base-100 shadow-xl">
                <figure><img src={photo} alt="coffee"/></figure>
                <div className="flex w-full justify-between pr-4">
                    <div>
                <h2 className="card-title">Name: {name}</h2>
                <p>{quantity}</p>
                <p>{supplier}</p>
                <p>{taste}</p>
                </div>
            <div className="card-actions justify-end">
              <div className="btn-group btn-group-vertical space-y-2">
                <button className="btn ">View</button>
                <Link to={`updatecoffee/${_id}`}>
                <button className="btn">Edit</button>
                </Link>
                <button
                 onClick={()=> handleDelete(_id)}
                 className="btn bg-orange-500">X</button>
               </div>  
            </div>
        </div>
       </div>
{/* <button className="btn"><Link to='/signin'>signIng</Link></button> */}
    </div>
    );
};

export default CoffeeCard;