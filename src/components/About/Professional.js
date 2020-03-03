import React, { Component } from 'react';
import Job from './Job';

class Professional extends Component {
  render() {
    return (
      <div id='professional-container'>
        <h3> Employement History </h3>
        <Job
          title='Full Stack Web Application Developer'
          dates='2017-Current'
          company='The Cable Assembler Ltd, T-SWAN Ltd.'
          location='Dongguan, Guangdong, China'
          description='Developed proprietary ERP system.  Responsible for entire development life cycle: analysis with business leaders, requirements gathering and planning with users and managers, designing, building, testing, implementing, training, maintenance and documentation.  Also functioned as a systems administrator and database administrator, helped train users and troubleshoot issues, and worked to ensure the highest level of data quality possible.'
          accomplishments={[
            'Created an automated purchase order creation system which significantly reduced workload',
            'Fixed many bugs in legacy code base and issues in database',
            'Fixed and expanded the ‘Bill of Materials’ system to operate recursively reducing workload of engineers',
            'Automated material consumption record creation in production system reducing workload in production',
            'Made new tools tracking internal product sample creation, reduced workload in production and warehouse',
            'Created system to automatically track incoming deliveries, significantly reduced workload in accounting',
            'Enhanced various systems to improve workflow'
          ]}
        />
        <Job
          title='English Teacher/Consultant'
          dates='2012-2016'
          company='English First, Web International, Private Contracting'
          location='Dongguan, Guangdong, China'
          description='Taught English to students of all ages and levels in various settings.  Selected class materials and developed course outlines and lesson plans.  Helped develop and partake in sales and marketing events as well as demonstration classes.'
          accomplishments={[
            'Regularly received recognition for teaching quality and student appreciation',
            'Received highest percentile scores on standardized international teaching certification exams',
            'Helped design, deploy and maintain digital distribution network for teachers’ lesson plans and other forms at multiple schools including English First'
          ]}
        />
        <Job
          title='Computer Technician, Software Developer, IT Manager'
          dates='2009-2011'
          company='Independent Consulting Solutions'
          location='Rumson, NJ, USA'
          description='Founded and developed a small IT consulting firm focused on personal computer repair as well as local business systems development and IT management.  Business clients included a New Balance store, a Honda Dealership, and several local restaurants.   Worked directly with business leaders to target specific goals, design, build and integrate new software and hardware systems into their existing businesses.  Notable projects a fully integrated POS/inventory management system and an internal, web-based lead management software system.'
          accomplishments={[]}
        />
        <Job
          title='Computer Technician'
          dates='2008-2009'
          company='Best Buy Co., Inc.'
          location='Holmdel, NJ, USA'
          description='Worked as a general computer technician in local Geek Squad department.  Worked with customers; repaired, upgraded, installed and set up computers.  Received recognition for outstanding sales individually, ranked among the top Geek Squad sales nationally, as well as recognition for efficiency and quality of work, having repaired more than three thousand computers.'
          accomplishments={[]}
        />
        <Job
          title='Computer Technician'
          dates='2008'
          company='Staples Inc.'
          location='Shrewsbury, NJ, USA'
          description='Worked as a general computer technician in local Easy Tech department in Staples.  Worked with customers to repair, upgrade, install and set up computers and related equipment.  Also worked as a salesman selling computer hardware and accessories.'
          accomplishments={[]}
        />
        <Job
          title='Ice Cream Shop Server/Cachier'
          dates='2004-2008'
          company='Carvel'
          location='Little Silver, NJ, USA'
          description='Served customers ice cream.  Cleaned store and equipement.  Worked cash register.  Made ice cream cakes and other products.  Ate a lot of ice cream.'
          accomplishments={[]}
        />
        <h3> Education History </h3>
        <div className='education-container'>
          <div className='education-date'>
            2006-2008
          </div>
          <div className='education-content'>
            Rutgers University, New Brunswick, New Jersey
          </div>
          <div className='education-content'>
            60 Credits Majoring in B.S., Computer Science
          </div>
        </div>
        <div className='education-container'>
          <div className='education-date'>
            2002-2006
          </div>
          <div className='education-content'>
            Rumson-Fair Haven Regional High School
          </div>
        </div>
      </div>
    );
  }
};

export default Professional;
