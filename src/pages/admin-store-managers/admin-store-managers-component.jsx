import AddStoreManagerForm from '../../components/admin-store-manager-form/admin-store-manager-form.component'
import EditStoreManagerForm
  from '../../components/admin-store-manager-form-edit/admin-store-manager-form-edit.component'
import StoreManagerTable from '../../components/admin-store-managers-table/admin-store-managers-table.component'
import './admin-store-managers-styles.scss'
import React, {useContext} from 'react'
import {Col, Row} from 'react-bootstrap'
import {AppContext} from '../../Context/app-context'

const ManageStoreManager = props => {
  let route
  const app = useContext(AppContext)

  if (app.editStoreManager)
    route = (<EditStoreManagerForm/>)
  else
    route = (<AddStoreManagerForm/>)

  return (
    <div className='storeManagerMain container' style={{maxWidth: "1303px"}}>
      <h1>Manage Store Managers</h1>
      <Row  style={{maxWidth: "1286px"}}>
        <Col sm='4'>
          <div className='storeManagerForm'>
            {route}
          </div>
        </Col>
        <Col sm='8'>
          <div className='storeManagerTable'>
            <StoreManagerTable/>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default React.memo(ManageStoreManager)
