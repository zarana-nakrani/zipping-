import React from 'react';
import Header from './Header';
import {BrowserRouter,Routes ,Route} from 'react-router-dom';
import Home from '../components/home/Home'
import Signup from './Signup';
import Signin from './Signin';
import NotFound from './NotFound';
import Society  from './society/Society'
// import {Units , RegisterOwner , RegisterOccupier} from './Units';
import { UnitsTable } from "./Unit/UnitsTable"
import { RegisterOwner, RegisterOccupier } from "./Unit/Units"
import EditForm from './Unit/EditForm';
import { CommitteeRole, Committees } from './committee/Committee';
import { CommitteeTable } from './committee/CommitteeTable'
import { EditCommForm } from './committee/EditCommForm';
import Invoice from './Invoice/Invoice'
import Payment from '../Payment';

const App = ()=> (
  
    
      <BrowserRouter>
      <Header />
        <Routes>
          <Route exact path='/signup'element = {<Signup/>}/>
          <Route exact path='/signin'element = {<Signin/>}/>
          <Route exact path='/admin/dashboard' element={<Home />}></Route>
          <Route exact path='/society'element = {<Society/>}/>
          <Route exact path='/units' element={<UnitsTable/>} />
          <Route exact path='/edit/:id' element={<EditForm/>}></Route>
          <Route exact path='/units/registerowner' element={<RegisterOwner/>} />
          <Route exact path='/units/registeroccupier' element={<RegisterOccupier/>} />
          <Route exact path="/committee/committeerole" element={<CommitteeRole/>}/>
          <Route exact path='/committee/committees' element={<Committees/>} />
          <Route exact path='/committee' element={<CommitteeTable/>}/>
          <Route exact path='/edit/comm/:rolename/:id' element={<EditCommForm />} />
          <Route exact path='/invoice' element={<Invoice/>} />
          <Route exact path='/payment' element={<Payment/>} />
          <Route element = {<NotFound/>}/>
        </Routes>
      </BrowserRouter>
);
      
    
  


export default App;
