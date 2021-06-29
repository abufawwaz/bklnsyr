import React, { Component } from "react";
import { Route, HashRouter,  MemoryRouter, Switch,} from "react-router-dom";
import AddNew from "./AddNewProduct";

import ceklist from "./ceklist";
import cekhargaB from "./cekhargaB";

import LogApp from "./logapp";


import Button from '@material-ui/core/Button';
import ButtonToolbar from '@material-ui/core/Toolbar';
import { LinkContainer } from 'react-router-bootstrap';


const Home2 = () => <span>Mengedit Harga Product</span>;
const About2 = () => <span>Transaksi</span>;
const AddNewProduct = () => <span>New product</span>;

class App extends Component {
  render() {
    return (
      <HashRouter>
       <MemoryRouter>
   
        <h2>
         
          <Switch>
           
            <Route path="/ceklist">
              <Home2 />
            </Route>
            <Route path="/AddNewProduct">
              <AddNewProduct />
            </Route>
            <Route path="/cekhargaB">
              <cekhargaBA />
            </Route>
          </Switch>
          
        </h2>
        <h2>
          <ButtonToolbar className="custom-btn-toolbar">
            
          <LinkContainer to="/cekhargaB">
              <Button
               variant="contained" color="primary"
              >Cari</Button>
            </LinkContainer>
             
            <LinkContainer to="/AddNewProduct">
              <Button
               variant="contained" color="primary"
              >Tambah Product</Button>
            </LinkContainer
            
            >
           <LinkContainer to="/ceklist">
              <Button
               variant="contained" color="primary"
              >Sudah Di Cek </Button>
            </LinkContainer>
            <LinkContainer to="/logapp">
              <Button
               variant="contained" color="primary"
              >Log AKTIFITAS </Button>
            </LinkContainer>
          </ButtonToolbar>
        </h2>
        
        

<Route exact path="/AddNewProduct" component={AddNew}/>
<Route path="/ceklist" component={ceklist}/>
<Route path="/cekhargaB" component={cekhargaB}/>
<Route path="/logapp" component={LogApp}/>
 
    
       </MemoryRouter>
      </HashRouter>
    );
  }
}
 

export default App;