import { useParams, useNavigate } from "react-router-dom";
import OrderForm from "./OrderForm";

function OrderFormWrapper () {
    let params = useParams()
    let navigate = useNavigate()

    return <OrderForm params = {params} navigate = {navigate}/>
}

export default OrderFormWrapper