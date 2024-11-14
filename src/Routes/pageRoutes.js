import AddMoney from "../Pages/AddMoney";
import BetAmount from "../Pages/BetAmount";
import ChangePassword from "../Pages/ChangePassword";
import History from "../Pages/History";
import Home from "../Pages/Home";
import MyProfile from "../Pages/MyProfile";
import SelectBidNumber from "../Pages/SelectBidNumber";
import Wallet from "../Pages/Wallet";
import Withdraw from "../Pages/Withdraw";
import Faq from "../Pages/Faq";
import SuccessPayment from "../Pages/SuccessPayment";

export const pageRoutes = {
    dashboard: '/',
    login: '/login',
    signup: '/signup',
    forgot_password: '/forgot-password',
    home: '/home',
    history: '/history',
    wallet: '/wallet',
    my_profile: '/profile',
    change_password: '/change-password',
    withdraw: '/withdraw',
    add_money: '/add-money',
    select_number: '/choose-number',
    bet_amount: '/bet-amount',
    faq: '/faq',
    otp_check: '/otp-check',
    otp_verify: '/otp-verify',
    payment_status: '/payment-status',
    change_forgot: '/password-change',
};

export const AllRoutes = [
    {
        name: 'Home',
        path: '/home',
        element: <Home />,
        isPrivate: true
    },
    {
        name: 'History',
        path: '/history',
        element: <History />,
        isPrivate: true
    },
    {
        name: 'Wallet',
        path: '/wallet',
        element: <Wallet />,
        isPrivate: true
    },
    {
        name: 'Profile',
        path: '/profile',
        element: <MyProfile />,
        isPrivate: true
    },
    {
        name: 'ChangePassword',
        path: '/change-password',
        element: <ChangePassword />,
        isPrivate: true
    },
    {
        name: 'WithDraw',
        path: '/withdraw',
        element: <Withdraw />,
        isPrivate: true
    },
    {
        name: 'AddMoney',
        path: '/add-money',
        element: <AddMoney />,
        isPrivate: true
    },
    {
        name: 'SelectNumber',
        path: '/choose-number',
        element: <SelectBidNumber />,
        isPrivate: true
    },
    {
        name: 'BetAmount',
        path: '/bet-amount',
        element: <BetAmount />,
        isPrivate: true
    },
    {
        name: 'FAQ',
        path: '/faq',
        element: <Faq />,
        isPrivate: true
    },
    {
        name: 'Success',
        path: '/payment-status',
        element: <SuccessPayment />,
        isPrivate: true
    }
];