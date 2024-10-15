import {React} from 'react';
import {Spinner} from 'react-bootstrap';
export const InitApp = () => {
    return (
        <div style={{
            width:"100%",
            height:"100%",
            background:"black",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"}} >
            <Spinner animation="border" variant="primary"/>
        </div>
    );
};
