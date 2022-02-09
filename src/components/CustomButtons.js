
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { MdShoppingCart } from 'react-icons/md';
import '../styles/App.css';

function CartButton() {
  return (
    <div>
      <Button variant="contained" onClick = {() => console.log("Cart button clicked")}>
        <MdShoppingCart className="cart-button"/>
      </Button>
    </div>
  );
}

function LoginButton(props) {
  return (
    <Button variant="outlined" onClick={ props.onClick } sx={{ minWidth: 100 }}>
      Log in
    </Button>
  );
}

function SignupButton(props) {
  return (
    <Button variant="contained" onClick={ props.onClick } sx={{ minWidth: 100 }}>
      Sign up
    </Button>
  );
}

function AddToCartButton(props ) {
  return (
    <div>
      <Button variant="contained" onClick = {() => console.log("Add to cart button clicked")}>
        Add To Cart
      </Button>
    </div>
  )
}

function LoginSignup() {
  return (
    <Stack direction="row" alignSelf="center" spacing={2}>
      <LoginButton />
      <SignupButton />
    </Stack>
  );
}

export {
  CartButton,
  LoginButton,
  SignupButton,
  AddToCartButton,
  LoginSignup,
}