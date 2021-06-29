import React, { Component } from "react";


import { LinkContainer } from 'react-router-bootstrap';
import Axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button';

class Search extends Component {
  state = {
    searchValue: "",
    meals: []
   
  };

  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    this.makeApiCall(this.state.searchValue);
  };

  makeApiCall = searchInput => {
    var searchUrl = `https://stok.bakulansayur.com/index.php?tbl=itemproduct&col=nama&col2=barcode&nm=meals&df=${searchInput}`;
    fetch(searchUrl)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        this.setState({ meals: jsonData.meals });
      });
  };

  editMode = (id) => {
    let meals = this.state.meals.map((item) => {
      if (item.id === id) {
        item.isEditing = true;
        return item;
      }
      item.isEditing = false;
      return item;
    });

    this.setState({
      meals
    });
  };


  cancleEdit = (id) => {
    let meals = this.state.meals.map((item) => {
      if (item.id === id) {
        item.isEditing = false;
        return item;
      }
      
      return item;
    });

    this.setState({
      meals
    });
  };
  handleUpdate = (id) => {
    Axios.post("https://stok.bakulansayur.com/updateharga.php", {
      id: id,
      nama: this.nama.value,
      barcode: this.barcode.value,
    harga:  this.harga.value,
stoktoko: this.stoktoko.value,
stokgudang: this.stokgudang.value,
stoktotal:  parseFloat(this.stoktoko.value)+parseFloat(this.stokgudang.value),
totalharga:  (parseFloat(this.stoktoko.value)+parseFloat(this.stokgudang.value))*parseFloat(this.harga.value)
    })
      .then(({ data }) => {
        if (data.success === 1) {
          let meals = this.state.meals.map((item) => {
            if (item.id === id) {
item.barcode =  this.barcode.value;
item.nama =  this.nama.value;
item.harga =  this.harga.value;
item.stoktoko =  this.stoktoko.value;
item.stokgudang =  this.stokgudang.value;
item.stoktotal =  parseFloat(this.stoktoko.value)+parseFloat(this.stokgudang.value);
item.totalharga =   (parseFloat(this.stoktoko.value)+parseFloat(this.stokgudang.value))*parseFloat(this.harga.value)
 
              item.isEditing = false;
              return item;
            }
            return item;
          });
          this.setState({
            meals
          });
          alert(data.msg);
        } else {
          alert(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleNewproduct = (id) => {
    Axios.post("https://stok.bakulansayur.com/newproduct.php", {
      id: id,
      nama: this.nama.value,
      barcode: this.barcode.value,
    harga:  this.harga.value,
stoktoko: this.stoktoko.value,
stokgudang: this.stokgudang.value,
stoktotal:  parseFloat(this.stoktoko.value)+parseFloat(this.stokgudang.value),
totalharga:  (parseFloat(this.stoktoko.value)+parseFloat(this.stokgudang.value))*parseFloat(this.harga.value)
    })
      .then(({ data }) => {
        if (data.success === 1) {
          let meals = this.state.meals.map((item) => {
            if (item.id === id) {
item.barcode =  this.barcode.value;
item.nama =  this.nama.value;
item.harga =  this.harga.value;
item.stoktoko =  this.stoktoko.value;
item.stokgudang =  this.stokgudang.value;
item.stoktotal =  parseFloat(this.stoktoko.value)+parseFloat(this.stokgudang.value);
item.totalharga =   (parseFloat(this.stoktoko.value)+parseFloat(this.stokgudang.value))*parseFloat(this.harga.value)
 
              item.isEditing = false;
              return item;
            }
            return item;
          });
          this.setState({
            meals
          });
          alert(data.msg);
        } else {
          alert(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidUpdate() {
    let newUser = this.context.new_user;
    if (newUser) {
      this.setState({
        meals: [newUser, ...this.state.meals]
      });
      this.context.new_user = false;
    }
  }

  columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
      id: 'population',
      label: 'Population',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'size',
      label: 'Size\u00a0(km\u00b2)',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'density',
      label: 'Density',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
  ];
  
  render() {
    return (
      <div id="main">
        <TableContainer >
        <Table stickyHeader aria-label="sticky table">
       <TableHead>
          <TableRow>
              <TableCell>barcode</TableCell>
              <TableCell>Nama </TableCell>
              <TableCell>Harga_pokok</TableCell>
              <TableCell>Stok_toko</TableCell>
              <TableCell>Stok_gudang</TableCell>
              <TableCell>Total_Stok</TableCell>
              <TableCell>Total_Harga</TableCell>
              <TableCell>action</TableCell>
              </TableRow>
        </TableHead>
        <TableBody>
        <TableRow key="productbaru">
              <TableCell>
                <input
                  className="form-control"
                  type="text"
                  ref={(item) => (this.barcode = item)}
                
                />
              </TableCell>
              <TableCell>
                <input
                 name="text"
                
                 placeholder="Search"
                  className="form-control"
                  type="text"
                  ref={(item) => (this.nama = item)}
                  onChange={event => this.handleOnChange(event)}
                  value={this.state.searchValue}
                />
              </TableCell>
              <TableCell>
                <input
                  className="form-control"
                  type="number"
                  ref={(item) => (this.harga = item)}
                  
                />
              </TableCell>
              <TableCell>
                <input
                  className="form-control"
                  type="number"
                  ref={(item) => (this.stoktoko = item)}
                  
                />
              </TableCell>
              <TableCell>
                <input
                  className="form-control"
                  type="number"
                  ref={(item) => (this.stokgudang = item)}
                  
                />
              </TableCell>
              <TableCell>
                <input
                  className="form-control"
                  type="number"
                  ref={(item) => (this.stoktotal = item)}
                 
                />
              </TableCell>
              <TableCell>
                <input
                  className="form-control"
                  type="number"
                  ref={(item) => (this.totalharga = item)}
                 
                />
              </TableCell>
  
              <TableCell>
              <Button variant="contained" color="primary"
                  onClick={() => this.handleNewproduct("productbaru")}
                >
                  Save
                </Button>
                </TableCell>  
                <TableCell>
                <Button variant="contained" color="secondary"
                 onClick={this.handleSearch}
                >
                  Cari
                </Button>
              </TableCell>
            </TableRow>
            </TableBody>
        </Table>
       </TableContainer>
       
       
        {this.state.meals ? (
          <div id="meals-container">
    <TableContainer >
        <Table stickyHeader aria-label="sticky table">
       <TableHead>
          <TableRow>
              <TableCell>barcode</TableCell>
              <TableCell>Nama </TableCell>
              <TableCell>Harga_pokok</TableCell>
              <TableCell>Stok_toko</TableCell>
              <TableCell>Stok_gudang</TableCell>
              <TableCell>Total_Stok</TableCell>
              <TableCell>Total_Harga</TableCell>
              <TableCell>action</TableCell>
              </TableRow>
        </TableHead>
        <TableBody>
         
          {this.state.meals.map(({id,
          barcode,
          nama,
          harga,
          stoktoko,
          stokgudang,
          stoktotal,
          totalharga,
          isEditing
        }, index) => {
          return isEditing === true ? (
            <TableRow key={id}>
              <TableCell>
                <input
                  className="form-control"
                  type="text"
                  ref={(item) => (this.barcode = item)}
                  defaultValue={barcode}
                />
              </TableCell>
              <TableCell>
                <input
                  className="form-control"
                  type="text"
                  ref={(item) => (this.nama = item)}
                  defaultValue={nama}
                />
              </TableCell>
              <TableCell>
                <input
                  className="form-control"
                  type="number"
                  ref={(item) => (this.harga = item)}
                  defaultValue={harga}
                />
              </TableCell>
              <TableCell>
                <input
                  className="form-control"
                  type="number"
                  ref={(item) => (this.stoktoko = item)}
                  defaultValue={stoktoko}
                />
              </TableCell>
              <TableCell>
                <input
                  className="form-control"
                  type="number"
                  ref={(item) => (this.stokgudang = item)}
                  defaultValue={stokgudang}
                />
              </TableCell>
              <TableCell>
                <input
                  className="form-control"
                  type="number"
                  ref={(item) => (this.stoktotal = item)}
                  defaultValue={stoktotal}
                />
              </TableCell>
              <TableCell>
                <input
                  className="form-control"
                  type="number"
                  ref={(item) => (this.totalharga = item)}
                  defaultValue={totalharga}
                />
              </TableCell>
  
              <TableCell>
              <Button variant="contained" color="primary"
                  onClick={() => this.handleUpdate(id)}
                >
                  Save
                </Button>
                </TableCell>  
                <TableCell>
                <Button variant="contained" color="secondary"
                  onClick={() => this.cancleEdit(id)} 
                >
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          ) : (
            <tr key={id}>
              <TableCell  onClick={() => this.editMode(id)} >{barcode}</TableCell>
              <TableCell   onClick={() => this.editMode(id)}>{nama}</TableCell>
              <TableCell  onClick={() => this.editMode(id)}>{harga}</TableCell>
              <TableCell onClick={() => this.editMode(id)}>{stoktoko}</TableCell>
              <TableCell onClick={() => this.editMode(id)}>{stokgudang}</TableCell>
              <TableCell onClick={() => this.editMode(id)}>{stoktotal}</TableCell>
              <TableCell onClick={() => this.editMode(id)}>{totalharga}</TableCell>
              <TableCell onClick={() => this.editMode(id)}>
              <Button variant="contained" color="primary"

                  onClick={() => this.editMode(id)}
                >
                  Edit
                </Button>
              </TableCell>
            </tr>
          );
        }
            
            )} 
          </TableBody>
        </Table>
       </TableContainer>
        </div>
            ) : (
              <p>Belum beruntung data belum ada 
               <Button variant="contained" color="primary"

              onClick={() => this.editMode(12123)}
            >
              Tambahkan
            </Button>
            <LinkContainer to="/UserC">
              <Button>Customer</Button>
            </LinkContainer>
            </p>
              
            )}
       
      </div>
    );
  }
}

export default Search;
