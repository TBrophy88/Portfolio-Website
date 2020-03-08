import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TCA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TCAPicture: 0,
      TCAPictureSources: [
        'Dashboard.JPG',
        'Customers.JPG',
        'Customer Details.JPG',
        'Vendors.JPG',
        'Vendor Details.JPG',
        'Products.JPG',
        'Product Details.JPG',
        'Bill of Materials.JPG',
        'Price Calculator.JPG',
        'Product Stocks.JPG',
        'Orders.JPG',
        'Order Details.JPG',
        'Quotations.JPG',
        'Quotation Details.JPG',
        'Invoices.JPG',
        'Invoice Details.JPG',
        'Purchase Orders.JPG',
        'Purchase Order Details.JPG',
        'Purchase Order Deliveries and Inspection.JPG',
        'Material Demands.JPG',
        'Material Demand Details.JPG',
        'Production Runs.JPG',
        'Production Run Details.JPG',
        'Warehouse Stocks.JPG',
        'Deliveries.JPG',
        'Shipments.JPG',
        'Reports Dashboard.JPG',
        'Management Dashboard.JPG',
        'Reports Downloads.JPG',
        'Calendar.JPG'
      ]
    };
  }

  handleIncrementTCAPicture() {
    var newIndex = this.state.TCAPicture + 1;
    if (newIndex >= this.state.TCAPictureSources.length) {
      newIndex = 0;
    }
    this.setState({TCAPicture: newIndex});
  }

  handleDecrementTCAPicture() {
    var newIndex = this.state.TCAPicture - 1;
    if (newIndex < 0) {
      newIndex = this.state.TCAPictureSources.length - 1;
    }
    this.setState({TCAPicture: newIndex});
  }

  render() {
    const tcaPage = (
      <div className='tca-page' id='tca'>
        <div className='tca-title'>
          <h1>TCA's ERP System</h1>
        </div>
        <div className='tca-content-container'>
          <div className='previous-button-container'>
            <img
              className='previous-button'
              src="../previous.svg"
              alt="previous"
              onClick = {() => this.handleDecrementTCAPicture()}
            />
          </div>
          <div className='tca-image-container'>
            <img
              className='tca-image'
              src={"../tca/" + this.state.TCAPictureSources[this.state.TCAPicture]}
              alt="tca system screenshot"
            />
          </div>
          <div className='next-button-container'>
            <img
              className='next-button'
              src="../next.svg"
              alt="next"
              onClick = {() => this.handleIncrementTCAPicture()}
            />
          </div>
        </div>
        <div className='tca-image-counter'>
          {(this.state.TCAPicture + 1) + '/' + (this.state.TCAPictureSources.length)}
        </div>
        <div className='tca-controls'>
          <Link exact to='/projects' className='unselectable'>Go Back</Link>
        </div>
      </div>
    )

    return (
      <div id='tca-container'>
        {tcaPage}
      </div>
    );
  }
};

export default TCA;
