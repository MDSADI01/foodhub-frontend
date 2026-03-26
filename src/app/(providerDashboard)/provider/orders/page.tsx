import { providerService } from '@/app/services/providerService'
import { ProviderOrderTable } from '@/components/ui/updateOrderStatus';
import React from 'react'

const ProviderOrderList = async () => {

 const providerOrders = await providerService.getOrdersByProvider();
 const orders = providerOrders?.data?.data;

  return (
    <div>
      <ProviderOrderTable orders={orders}></ProviderOrderTable>
    </div>
  )
}

export default ProviderOrderList