import { LoginForm } from "components/Forms";
import Grid from '@mui/material/Grid';

export default function LoginPage() {
    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ width:"60%", margin: 'auto', minHeight: '100vh' }}>
            <Grid item>
                <LoginForm/>
            </Grid>
        </Grid>
    );
}