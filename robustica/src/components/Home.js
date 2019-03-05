import React, {Component} from "react"
import OrderList from "./orders/orderList"
import Options from "./options"
import UserInfo from "./UserInfo"

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <Options/>
                <UserInfo/>
                <OrderList/>
            </div>
        )
    }
}

export default Home
