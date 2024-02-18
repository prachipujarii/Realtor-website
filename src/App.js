import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Listing from "./pages/Listing";
import Category from "./pages/Category";
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { Redirect } from 'react-router-dom';

const steps = [
  {
    id: '0',
    message: 'Welcome to our Real Estate Assistance!',
    trigger: '1',
  },
  {
    id: '1',
    message: 'Please enter your name:',
    trigger: '2',
  },
  {
    id: '2',
    user: true,
    trigger: '3',
  },
  {
    id: '3',
    message: 'Hi {previousValue}, how can I assist you today?',
    trigger: '4',
  },
  {
    id: '4',
    options: [
      { value: 'buy', label: 'I want to buy a property', trigger: 'buyingOptions' },
      { value: 'sell', label: 'I want to sell a property', trigger: 'sellingOptions' },
      { value: 'rent', label: 'I want to rent a property', trigger: 'rentingOptions' },
    ],
  },
  {
    id: 'buyingOptions',
    message: 'Great choice! What type of property are you looking to buy?',
    end: true,
  },
  {
    id: 'sellingOptions',
    message: 'Sure thing! What type of property are you looking to sell?',
    end: true,
  },
  {
    id: 'rentingOptions',
    message: 'Okay! What type of property are you looking to rent?',
    end: true,
  },
];
//Creating our own theme 
const theme = {
  background: '#FFFFFF', // Set background to white
  headerBgColor: '#C41E3A', // Set header background color to light green
  headerFontSize: '20px',
  botBubbleColor: '#ECFFDC', // Set bot bubble color to light green
  headerFontColor: '#FFFFFF', // Set header font color to white
  botFontColor: '#000000', // Set bot font color to white
  userBubbleColor: '#FFFFFF', // Set user bubble color to white
  userFontColor: '#000000', // Set user font color to black
};


// Set some properties of the bot
const config = {
  botAvatar: './assets/svg/chatbot.jpg', // Corrected image path using require
  floating: true,
  };

function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <ChatBot
 
        // This appears as the header
        // text for the chat bot
        headerTitle="RealtyBot"
        steps={steps}
        {...config}
 
      />
    </ThemeProvider>
     <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile/>}></Route>
        </Route>
        <Route path="/sign-in" element={<SignIn/>}></Route>
        <Route path="/sign-up" element={<SignUp/>}></Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
        <Route path="/category/:categoryName/:listingId" element={<Listing/>}></Route>
        <Route path="/offers" element={<Offers/>}></Route>
        <Route path="/category/:categoryName" element={<Category/>}></Route>
        <Route path="create-listing" element={<PrivateRoute />}>
        <Route path="/create-listing" element={<CreateListing/>}></Route>
        </Route>
        <Route path="edit-listing" element={<PrivateRoute />}>
        <Route path="/edit-listing/:listingId" element={<EditListing/>}></Route>
        </Route>
      </Routes>
      </Router> 
      <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />
    </>
  );
}

export default App;
